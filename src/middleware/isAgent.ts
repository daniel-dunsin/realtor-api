import { NextFunction, Request, Response } from "express";
import { Role } from "../constants/role";
import { UnAuthorizedError } from "../handlers/responseHandlers";
import { IRequest } from "../interfaces/IRequest";
import { checkUser } from "../services/auth.service";

export const isAgent = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const user = await checkUser(req?.user?.email as string);

  if (user?.role !== Role.agent) {
    return next(new UnAuthorizedError("Only agent can access this route"));
  }

  (req as any).user.isAgent = true;

  next();
};
