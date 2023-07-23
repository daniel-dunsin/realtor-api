import { Role } from '../constants/role';

export interface IUserSchema {
  username: string;
  email: string;
  role: Role.client | Role.agent | Role.admin;
}

export interface IUserAuthSchema {
  email: string;
  password: string;
}
