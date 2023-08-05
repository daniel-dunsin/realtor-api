import mongoose, { Schema, Types } from "mongoose";
import { IChat } from "../interfaces/schema/message.schema";
import { settings } from "../constants/settings";

const ChatSchema = new mongoose.Schema<IChat>(
  {
    users: {
      type: [{ type: Types.ObjectId, ref: settings.mongo.collections.user }],
      required: true,
    },

    latestMessage: {
      type: Types.ObjectId,
      ref: settings.mongo.collections.message,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const ChatModel = mongoose.model(settings.mongo.collections.chat, ChatSchema);

export default ChatModel;
