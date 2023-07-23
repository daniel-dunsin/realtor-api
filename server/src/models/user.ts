import mongoose, { Schema } from 'mongoose';
import { settings } from '../constants/settings';
import { Role } from '../constants/role';
import { IUserSchema } from '../interfaces/schema/auth';

const UserSchema = new Schema<IUserSchema>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        'Provide a valid email',
      ],
    },

    role: {
      type: String,
      default: Role.client,
      enum: [Role.client, Role.agent, Role.admin],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default mongoose.model(settings.mongo.collections.user, UserSchema);
