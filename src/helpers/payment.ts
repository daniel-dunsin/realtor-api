import http from "../config/axios.config";
import { settings } from "../constants/settings";
import { CustomError } from "../handlers/errorHandlers";
import { IPaystackEvents } from "../interfaces/constant";
import {
  IInitiatePaymentRes,
  IWebhookData,
} from "../interfaces/response/payment.response";
import crypto from "crypto";
import transactionService from "../services/transaction.service";
import { ForbiddenError, NotFoundError } from "../handlers/responseHandlers";
import walletService from "../services/wallet.service";
import { getUser } from "../services/auth.service";
import { IBidding } from "../interfaces/schema/bidding.schema";
import { IProperty } from "../interfaces/schema/property.schema";
import listingService from "../services/listing.service";

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

    default:
      throw new ForbiddenError("Invalid event");
  }
};

const payment = {
  initiatePayment,
  validateSignature,
  queryPaystackEvent,
};

export default payment;
