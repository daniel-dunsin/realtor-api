import mongoose from "mongoose";

export interface IAgent extends Document {
  _id?: string;
  username?: string;
  firstname: string;
  lastname: string;
  email?: string;
  position: string;
  license: string;
  taxNumber: number;
  phone: number;
  companyName: string;
  imageUrl: string;
  address: string;
  description: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    googlePlus: string;
    pinterest: string;
    website: string;
    instagram: string;
    youtube: string;
    linkedin: string;
  };
  userId?: mongoose.Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}
