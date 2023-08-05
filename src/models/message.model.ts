import mongoose, { Types } from "mongoose";
import { IMessage } from "../interfaces/schema/message.schema";
import { settings } from "../constants/settings";

const MessageSchema = new mongoose.Schema<IMessage>(
  {
    text: { type: String, required: true },
    image: { type: String, default: "" },
    chat: {
      type: Types.ObjectId,
      ref: settings.mongo.collections.chat,
      required: true,
    },
    sender: {
      type: Types.ObjectId,
      ref: settings.mongo.collections.user,
      required: true,
    },
    receiver: {
      type: Types.ObjectId,
      ref: settings.mongo.collections.user,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const MessageModel = mongoose.model(
  settings.mongo.collections.message,
  MessageSchema
);

export default MessageModel;
