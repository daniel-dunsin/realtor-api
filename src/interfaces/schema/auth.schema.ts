import { Document } from "mongoose";
import { Role } from "../../constants/role";

export interface IUserSchema extends Document {
  _id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: Role.client | Role.agent | Role.admin;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserAuthSchema {
  email: string;
  password: string;
}
