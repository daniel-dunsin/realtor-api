import mongoose from "mongoose";
import { IProperty } from "./property.schema";
import { IUserSchema } from "./auth.schema";
import { IAgent } from "./agent.schema";
import { IBiddingStatus } from "../constant";

export interface IBidding {
  _id: string;
  property: mongoose.Types.ObjectId | string | IProperty;
  proposedBuyer: mongoose.Types.ObjectId | string | IUserSchema;
  seller: mongoose.Types.ObjectId | string | IAgent;
  status: IBiddingStatus;
  createdAt: Date;
  updatedAt: Date;
}
