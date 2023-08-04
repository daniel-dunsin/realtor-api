import mongoose from "mongoose";
import { IArticleCategory } from "../constant";
import { IAgent } from "./agent.schema";

export interface IArticle {
  _id?: string;
  title: string;
  category: IArticleCategory;
  body: string;
  author: mongoose.Types.ObjectId | String | IAgent;
  createdAt: Date;
  views: number;
  comments: number;
  tags: string[];
}
