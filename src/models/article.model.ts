import mongoose from "mongoose";
import { IArticle } from "../interfaces/schema/article.schema";
import { settings } from "../constants/settings";

const ArticleSchema = new mongoose.Schema<IArticle>(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: {
        values: ["construction", "business", "apartment", "sales"],
        message: "{VALUE} is not a valid category",
      },
    },
    body: { type: String, minlength: 80, required: true },
    tags: { type: [{ type: String }], default: [] },
    views: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    author: {
      type: mongoose.Types.ObjectId,
      ref: settings.mongo.collections.agent,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const ArticleModel = mongoose.model(
  settings.mongo.collections.article,
  ArticleSchema
);

export default ArticleModel;
