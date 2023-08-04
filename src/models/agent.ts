import mongoose, { Schema, Types } from "mongoose";
import { settings } from "../constants/settings";
import { IAgent } from "../interfaces/schema/agent";

const agentSchema = new Schema<IAgent>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Provide a valid email",
      ],
    },

    firstname: {
      type: String,

      trim: true,
    },
    lastname: {
      type: String,

      trim: true,
    },
    position: {
      type: String,

      trim: true,
    },
    license: {
      type: String,

      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    address: {
      type: String,

      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    taxNumber: {
      type: Number,

      trim: true,
    },
    phone: {
      type: Number,

      trim: true,
    },
    description: {
      type: String,

      trim: true,
      minlength: [50, "Provide at least 50 characters"],
    },
    socialMedia: {
      facebook: String,
      instagram: String,
      googlePlus: String,
      pinterest: String,
      website: String,
      youtube: String,
      linkedin: String,
      twitter: String,
    },

    userId: {
      type: Types.ObjectId,
      ref: settings.mongo.collections.user,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default mongoose.model(settings.mongo.collections.agent, agentSchema);
