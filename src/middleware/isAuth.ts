import { Request, Response, NextFunction } from 'express';
import { UnAuthorizedError } from '../handlers/responseHandlers';
import Jwt from 'jsonwebtoken';
import { settings } from '../constants/settings';
import { IRequest } from '../interfaces/IRequest';
import { IUserSchema } from '../interfaces/schema/auth';
import User from '../models/user';

export const isAuth = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(
      new UnAuthorizedError('Invalid token format. Use `Bearer {token}`')
    );
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(new UnAuthorizedError('Unauthorized request'));
  }

  const user: IUserSchema = Jwt.verify(
    token,
    settings.jwt.secret as string
  ) as IUserSchema;

  if (!user) {
    return next(new UnAuthorizedError('Token has expired'));
  }

  const mainUserInfo: IUserSchema = (await User.findOne({
    email: user.email,
  })) as IUserSchema;

  req.user = {
    _id: mainUserInfo?._id as string,
    email: user.email,
  };

  next();
};
