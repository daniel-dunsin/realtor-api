import mongoose, { Types } from "mongoose";
import { IReview } from "../interfaces/schema/review.schema";
import { settings } from "../constants/settings";

const ReviewSchema = new mongoose.Schema<IReview>({
  text: { type: String, required: true },
  stars: { type: Number, require: true, min: 0, max: 5 },
  author: {
    type: Types.ObjectId,
    ref: settings.mongo.collections.user,
    required: true,
  },
  property: {
    types: Types.ObjectId,
    ref: settings.mongo.collections.property,
    required: true,
  },
});

const ReviewModel = mongoose.model(
  settings.mongo.collections.review,
  ReviewSchema
);

export default ReviewModel;
