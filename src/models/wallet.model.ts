import mongoose, { Types } from "mongoose";
import { IWallet } from "../interfaces/schema/wallet.schema";
import { settings } from "../constants/settings";

const WalletSchema = new mongoose.Schema<IWallet>(
  {
    agent: {
      type: Types.ObjectId,
      ref: settings.mongo.collections.agent,
      required: true,
      unique: true,
    },

    currency: { type: String, default: "NGN", enum: ["NGN"] },

    available_balance: { type: Number, default: 0 },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const WalletModel = mongoose.model(
  settings.mongo.collections.wallet,
  WalletSchema
);

export default WalletModel;
