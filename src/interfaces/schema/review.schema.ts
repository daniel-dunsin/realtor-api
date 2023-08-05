import { ObjectId } from "mongoose";
import { IUserSchema } from "./auth.schema";
import { IProperty } from "./property.schema";

export interface IReview {
  stars: number;
  author: ObjectId | IUserSchema;
  listing: ObjectId | IProperty;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
