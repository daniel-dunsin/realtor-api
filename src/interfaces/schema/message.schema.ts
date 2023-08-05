import mongoose, { Types } from "mongoose";
import { IUserSchema } from "./auth.schema";

export interface IChat {
  _id?: string;
  users: Array<mongoose.Types.ObjectId | IUserSchema>;
  latestMessage: IMessage | mongoose.Types.ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  chat: mongoose.Types.ObjectId | IChat;
  _id?: string;
  text: string;
  image?: string;
  sender: mongoose.Types.ObjectId | IUserSchema;
  receiver: mongoose.Types.ObjectId | IUserSchema;
  createdAt: Date;
  updatedAt: Date;
}
