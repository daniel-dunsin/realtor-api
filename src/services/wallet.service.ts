import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../handlers/responseHandlers";
import payment from "../helpers/payment";
import {
  IInitiatePaymentRes,
  IWithdrawRes,
} from "../interfaces/response/payment.response";
import { IUserSchema } from "../interfaces/schema/auth.schema";
import { IProperty } from "../interfaces/schema/property.schema";
import { IWallet } from "../interfaces/schema/wallet.schema";
import {
  IInitializeTransactionBody,
  IInitiateWithdrawalBody,
} from "../interfaces/services/wallet.body";
import Property from "../models/property.model";
import Wallet from "../models/wallet.model";
import agentService from "./agent.service";
import biddingService from "./bidding.service";
import listingService from "./listing.service";
import transactionService from "./transaction.service";

const createWallet = async (agent: string) => {
  const walletInDb = await Wallet.findOne({ agent });

  if (walletInDb) {
    throw new ForbiddenError("Wallet already exist");
  }

  await Wallet.create({ agent });
};

const getWallet = async (agent: string): Promise<IWallet> => {
  const wallet = await Wallet.findOne({ agent });

  if (!wallet) {
    throw new NotFoundError("Agent Wallet does not exist");
  }

  return wallet;
};

const updateWalletBalance = async (
  id: string,
  available_balance: number
): Promise<IWallet> => {
  const wallet = await Wallet.findOne({ _id: id });

  if (!wallet) {
    throw new NotFoundError("Wallet does not exist");
  }

  wallet.available_balance = available_balance;

  const result = await wallet.save();

  return result;
};

const purchasePropertyFromWallet = async (
  propertyId: string,
  buyer: string
): Promise<IProperty> => {
  const property = await listingService.getSingleListing(buyer, propertyId);

  if (!property) {
    throw new BadRequestError(
      "The property you are trying to purchase does not exist"
    );
  }

  // check if the bidding exists and has been approved
  const bidding = await biddingService.getBiddingByBuyer(
    buyer,
    property?._id as string
  );

  if (bidding.status === "rejected") {
    throw new ForbiddenError("Your bidding for this property was rejected");
  }

  if (bidding.status === "pending") {
    throw new ForbiddenError(
      "Your bidding for this property has not been accepted"
    );
  }

  const agent = await agentService.getProfile(buyer);

  const wallet = await getWallet(agent?._id as string);

  const sellerWallet = await getWallet(property.agent?._id as string);

  if (wallet.available_balance < property.price) {
    throw new ForbiddenError(
      "You can not purchase this property due to insufficient balance in your wallet"
    );
  }

  // create a successful transaction model

  await transactionService.createTransaction({
    reference: "",
    status: "success",
    description: `Payment for ${property?.title}`,
    amount: property.price,
    type: "payment",
    payment_gateway: "wallet",
    property: property?._id as string,
    bidding: bidding._id,
    initiator: bidding.proposedBuyer as string,
  });

  // update the owner of the property
  const response = await listingService.updatePropertyOwner(
    property._id as string,
    buyer
  );

  await updateWalletBalance(
    wallet?._id as string,
    wallet.available_balance - property.price
  );

  await updateWalletBalance(
    sellerWallet?._id as string,
    sellerWallet.available_balance + property.price
  );

  await biddingService.deleteBidding(bidding._id);

  return response as IProperty;
};

const purchasePropertyWithTransfer = async (
  propertyId: string,
  buyer: string
): Promise<IInitiatePaymentRes> => {
  const property = await listingService.getSingleListing(buyer, propertyId);

  if (!property) {
    throw new BadRequestError(
      "The property you are trying to purchase does not exist"
    );
  }

  // check if the bidding exists and has been approved
  const bidding = await biddingService.getBiddingByBuyer(buyer, propertyId);

  if (bidding.status === "rejected") {
    throw new ForbiddenError("Your bidding for this property was rejected");
  }

  if (bidding.status === "pending") {
    throw new ForbiddenError(
      "Your bidding for this property has not been accepted"
    );
  }

  const response = await payment.initiatePayment(
    (bidding.proposedBuyer as IUserSchema).email,
    property.price
  );

  await transactionService.createTransaction({
    reference: response.data.reference,
    amount: property.price,
    description: `Payment for ${property.title}`,
    status: "pending",
    type: "payment",
    payment_gateway: "card",
    property: property._id as string,
    bidding: bidding._id,
    initiator: bidding.proposedBuyer as string,
  });

  return response;
};

const initiateWithdrawal = async ({
  account_number,
  name,
  bank_code,
  user,
  amount,
}: IInitiateWithdrawalBody): Promise<IWithdrawRes> => {
  if (!account_number || !name || !bank_code || !user || !amount) {
    throw new BadRequestError(
      "Provide account number, name, bank code, user and amount"
    );
  }

  const agent = await agentService.getProfile(user);

  const wallet = await walletService.getWallet(agent?._id as string);

  if (wallet.available_balance < amount) {
    throw new BadRequestError(
      "This transaction can not be completed due to insufficient balance"
    );
  }

  const reference = payment.generateTransferReference();

  const response = await payment.createTransferRecepient({
    name,
    account_number,
    bank_code,
  });

  if (!response.status) {
    throw new ForbiddenError("Unable to create transfer recepient");
  }

  const recipient = response.data.recipient_code;

  await transactionService.createTransaction({
    reference,
    status: "pending",
    description: "Money to flenjo!",
    amount,
    type: "withdrawal",
    payment_gateway: "wallet",
    initiator: user,
  });

  const withdrawRes = await payment.withdraw(amount, recipient, reference);

  return withdrawRes;
};

const walletService = {
  createWallet,
  getWallet,
  purchasePropertyFromWallet,
  purchasePropertyWithTransfer,
  updateWalletBalance,
  initiateWithdrawal,
};

export default walletService;
