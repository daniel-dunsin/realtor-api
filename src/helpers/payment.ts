import http from "../config/axios.config";
import { settings } from "../constants/settings";
import { CustomError } from "../handlers/errorHandlers";
import { IPaystackEvents } from "../interfaces/constant";
import {
  ICreateRecipientRes,
  IFetchBanksRes,
  IInitiatePaymentRes,
  IVerifyAccountRes,
  IWebhookData,
  IWithdrawRes,
} from "../interfaces/response/payment.response";
import crypto from "crypto";
import transactionService from "../services/transaction.service";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../handlers/responseHandlers";
import walletService from "../services/wallet.service";
import { getUser } from "../services/auth.service";
import { IBidding } from "../interfaces/schema/bidding.schema";
import { IProperty } from "../interfaces/schema/property.schema";
import listingService from "../services/listing.service";
import { ICreateTransferRecepientBody } from "../interfaces/services/wallet.body";
import { v4 } from "uuid";
import agentService from "../services/agent.service";

const paystack_secret = settings.paystack.test;

const initiatePayment = async (
  email: string,
  amount: number
): Promise<IInitiatePaymentRes> => {
  try {
    const response = await http.post("/transaction/initialize", {
      email,
      amount: amount * 100,
    });

    return response?.data;
  } catch (error: any) {
    throw new CustomError(error.message, 500);
  }
};

const validateSignature = (body: Object, signature: string): boolean => {
  const hash = crypto
    .createHmac("sha512", paystack_secret as string)
    .update(JSON.stringify(body))
    .digest("hex");

  return hash === signature;
};

const queryPaystackEvent = async (
  event: IPaystackEvents,
  data: IWebhookData
): Promise<void> => {
  const transaction = await transactionService.findByReference(data.reference);

  if (!transaction) throw new NotFoundError("Transaction does not exist");

  if (transaction.status !== "pending")
    throw new ForbiddenError("Transaction is not pending");

  switch (event) {
    case "charge.success":
      await transactionService.updateTransactionStatus(transaction._id, true);
      const property = transaction.property as IProperty;
      const buyer = (transaction.bidding as IBidding).proposedBuyer;

      const agent_wallet = await walletService.getWallet(
        property?.owner as string
      );

      await walletService.updateWalletBalance(
        agent_wallet._id as string,
        agent_wallet.available_balance + property.price
      );

      await listingService.updatePropertyOwner(
        property._id as string,
        buyer as string
      );
      break;

    case "charge.failed":
      await transactionService.updateTransactionStatus(transaction._id, false);
      break;

    case "transfer.success":
      const walletOwner = await agentService.getProfile(
        transaction.initiator as string
      );

      const wallet = await walletService.getWallet(walletOwner?._id as string);

      await transactionService.updateTransactionStatus(transaction._id, true);
      await walletService.updateWalletBalance(
        wallet._id as string,
        wallet.available_balance - transaction.amount
      );
      break;

    case "transfer.failed":
      await transactionService.updateTransactionStatus(transaction._id, false);
      break;
    default:
      throw new ForbiddenError("Invalid event");
  }
};

// for withdrawal
const fetchBanks = async (): Promise<IFetchBanksRes> => {
  try {
    const response = await http.get("/bank?currency=NGN");

    return response.data;
  } catch (error) {
    throw new ForbiddenError("Unable to fetch banks");
  }
};

const verifyAccount = async (
  account_number: string,
  bank_code: string
): Promise<IVerifyAccountRes> => {
  try {
    const response = await http.get(
      `/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`
    );

    return response?.data;
  } catch (error) {
    throw new ForbiddenError("Unable to validate account");
  }
};

const createTransferRecepient = async (
  body: ICreateTransferRecepientBody
): Promise<ICreateRecipientRes> => {
  try {
    const response = await http.post("/transferrecipient", {
      type: "nuban",
      name: body.name,
      account_number: body.account_number,
      bank_code: body.bank_code,
      currency: "NGN",
    });

    return response.data;
  } catch (error) {
    throw new ForbiddenError("Unable to create transfer recepient");
  }
};

const generateTransferReference = (): string => v4();

const withdraw = async (
  amount: number,
  recipient: string,
  reference: string
): Promise<IWithdrawRes> => {
  try {
    const response = await http.post("/transfer", {
      source: "balance",
      amount,
      reference,
      recipient,
      reason: "Mo fe lo jaye!",
    });

    return response?.data;
  } catch (error) {
    // console.log(error);
    throw new ForbiddenError("Unable to withdraw money from wallet");
  }
};

const payment = {
  initiatePayment,
  validateSignature,
  queryPaystackEvent,
  fetchBanks,
  verifyAccount,
  createTransferRecepient,
  generateTransferReference,
  withdraw,
};

export default payment;
