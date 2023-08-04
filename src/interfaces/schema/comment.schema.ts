import mongoose, { Document } from "mongoose";

export interface IArticleComment {
  text: string;
  article: mongoose.Types.ObjectId | string | any;
  writer: mongoose.Types.ObjectId | string | any;
}
