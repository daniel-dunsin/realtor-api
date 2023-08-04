import { IUserSchema } from '../schema/auth';

export interface LoginResponse {
  user: IUserSchema;
  token: string;
  message: string;
}

export interface SignupResponse {
  user: IUserSchema;
  token: string;
  message: string;
}
