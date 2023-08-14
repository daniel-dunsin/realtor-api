import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../handlers/responseHandlers";
import payment from "../helpers/payment";
import { IUserSchema } from "../interfaces/schema/auth.schema";
import { IProperty } from "../interfaces/schema/property.schema";
import { IWallet } from "../interfaces/schema/wallet.schema";
import { IInitializeTransactionBody } from "../interfaces/services/wallet.body";
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
  });

  // update the owner of the property
  const response = await Property.findByIdAndUpdate(
    property?._id,
    {
      isAvailable: false,
      owner: buyer,
    },
    { new: true, runValidators: true }
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
) => {
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

  console.log(response);
};

const initializeTransaction = async (data: IInitializeTransactionBody) => {};

const walletService = {
  createWallet,
  getWallet,
  purchasePropertyFromWallet,
  purchasePropertyWithTransfer,
};

export default walletService;
