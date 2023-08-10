import mongoose, { Types } from "mongoose";
import { IBidding } from "../interfaces/schema/bidding.schema";
import { settings } from "../constants/settings";

const BiddingSchema = new mongoose.Schema<IBidding>(
  {
    proposedBuyer: {
      type: Types.ObjectId,
      ref: settings.mongo.collections.user,
      required: true,
    },
    seller: {
      type: Types.ObjectId,
      ref: settings.mongo.collections.agent,
      required: true,
    },
    property: {
      type: Types.ObjectId,
      ref: settings.mongo.collections.property,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const BiddingModel = mongoose.model(
  settings.mongo.collections.bidding,
  BiddingSchema
);

export default BiddingModel;
