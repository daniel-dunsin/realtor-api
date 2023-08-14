import mongoose from "mongoose";
import { IAgent } from "./agent.schema";
import { ITransactionStatus, ITransactionType } from "../constant";
import { IProperty } from "./property.schema";
import { IBidding } from "./bidding.schema";

export interface IWallet {
  _id?: string;
  agent: mongoose.Types.ObjectId | string | IAgent;
  available_balance: number;
  currency: "NGN";
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransaction {
  reference: string;
  status: ITransactionStatus;
  currency: "NGN";
  description: string;
  amount: number;
  bidding: IBidding | string | mongoose.Types.ObjectId;
  type: ITransactionType;
  property?: IProperty | mongoose.Types.ObjectId | string;
  payment_gateway: "wallet" | "card";
}
