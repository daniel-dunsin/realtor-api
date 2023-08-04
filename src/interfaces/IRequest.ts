import { Request } from "express";

export interface IRequest extends Request {
  user?: {
    _id: string;
    email: string;
    username?: string;
    isAgent?: boolean;
  };
}
