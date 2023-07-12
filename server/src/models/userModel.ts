import mongoose, { Model } from 'mongoose';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();

interface User {
  email: string;
  username: string;
  password: string;
  role: 'client' | 'admin' | 'agent';
}

interface UserMethods {
  createJWT: () => Promise<string>;
}

type userModel = Model<User, {}, UserMethods>;

const UserSchema = new mongoose.Schema<User, userModel, UserMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'agent', 'client'],
        message: `{VAULE} is not a valid user role`,
      },
      default: 'client',
    },
  },
  { timestamps: true }
);

UserSchema.methods.createJWT = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET as string, {
    expiresIn: '24hr',
  });

  return token;
};

const userModel = mongoose.model('User', UserSchema);

export default userModel;
