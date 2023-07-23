import mongoose, { Schema, Types } from 'mongoose';
import { settings } from '../constants/settings';
import { IAgent } from '../interfaces/schema/agent';

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
      mathch: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        'Provide a valid email',
      ],
    },

    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    license: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    taxNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [50, 'Provide at least 50 characters'],
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
