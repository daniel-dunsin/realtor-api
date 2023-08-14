import mongoose from "mongoose";
import { ITransaction } from "../interfaces/schema/wallet.schema";
import { settings } from "../constants/settings";

const TransactionSchema = new mongoose.Schema<ITransaction>({
  reference: { type: String },
  status: {
    type: String,
    enum: ["success", "failed", "pending"],
    default: "pending",
  },
  currency: {
    type: String,
    enum: ["NGN"],
    default: "NGN",
  },
  description: { type: String },
  amount: { type: Number, default: 0 },
  type: { type: String, required: true, enum: ["payment", "withdrawal"] },
  payment_gateway: { type: String, enum: ["card", "wallet"] },
  bidding: {
    type: mongoose.Types.ObjectId,
    ref: settings.mongo.collections.bidding,
  },
  property: {
    type: mongoose.Types.ObjectId,
    ref: settings.mongo.collections.property,
  },
});

const TransactionModel = mongoose.model(
  settings.mongo.collections.transaction,
  TransactionSchema
);

export default TransactionModel;
