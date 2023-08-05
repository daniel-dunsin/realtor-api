import mongoose, { Model, Schema } from "mongoose";
import { settings } from "../constants/settings";
import { IUserAuthSchema } from "../interfaces/schema/auth.schema";
import jwt from "jsonwebtoken";

interface IUserAuth extends Document, IUserAuthSchema {
  createJWT(): string;
}

const userAuthSchema = new Schema<IUserAuth>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Provide a valid email",
      ],
    },

    password: {
      type: String,
      required: true,
    },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true }
);

userAuthSchema.methods.createJWT = function () {
  const token = jwt.sign(
    { email: this.email, _id: this._id },
    settings.jwt.secret as string,
    { expiresIn: "24h" }
  );

  return token;
};

export default mongoose.model(settings.mongo.collections.auth, userAuthSchema);
