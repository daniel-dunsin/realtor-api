import { Request, Response, NextFunction } from 'express';
import { UnAuthorizedError } from '../handlers/responseHandlers';
import Jwt from 'jsonwebtoken';
import { settings } from '../constants/settings';
import { IRequest } from '../interfaces/IRequest';
import { IUserSchema } from '../interfaces/schema/auth';

export const isAuth = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnAuthorizedError('Invalid token format. Use `Bearer {token}`');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    throw new UnAuthorizedError('Unauthorized request');
  }

  const user: IUserSchema = Jwt.verify(
    token,
    settings.jwt.secret as string
  ) as IUserSchema;

  if (!user) {
    throw new UnAuthorizedError('Token has expired');
  }

  req.user = {
    _id: user._id,
    email: user.email,
  };

  next();
};
