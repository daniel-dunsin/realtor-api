import { IUserSchema } from "../schema/auth.schema";

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
