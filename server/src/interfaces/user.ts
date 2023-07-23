import { Document } from 'mongoose';
import { Role } from '../constants/role';

export interface IUser extends Document {
  username: string;
  email: string;
  role: Role.admin | Role.client | Role.agent;
  createdAt?: Date;
  updatedAt?: Date;
}
