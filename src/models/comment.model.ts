import mongoose from "mongoose";
import { IArticleComment } from "../interfaces/schema/comment.schema";
import { settings } from "../constants/settings";

const CommentSchema = new mongoose.Schema<IArticleComment>(
  {
    text: { type: String, required: true },
    article: {
      type: mongoose.Types.ObjectId,
      ref: settings.mongo.collections.article,
    },
    writer: {
      type: mongoose.Types.ObjectId,
      ref: settings.mongo.collections.user,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const CommentModel = mongoose.model(
  settings.mongo.collections.comment,
  CommentSchema
);

export default CommentModel;
