import { Document } from 'mongoose';
import { Role } from '../../constants/role';

export interface IUserSchema extends Document {
  username: string;
  email: string;
  role: Role.client | Role.agent | Role.admin;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserAuthSchema {
  email: string;
  password: string;
}
