import { IUser } from './user';

export interface LoginResponse {
  user: IUser;
  token: string;
  message: string;
}

export interface SignupResponse {
  user: IUser;
  token: string;
  message: string;
}
