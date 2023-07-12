import mongoose from 'mongoose';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/errorHandlers';
import bcrypt from 'bcryptjs';

export const register = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, username, isAgent } = req.body;

    if (!email || !password || !username) {
      return next(new CustomError('Provide email, username and password', 400));
    }

    // Check if user exists
    const userInDB = await User.findOne({ $or: [{ username }, { email }] });

    if (userInDB) {
      return next(
        new CustomError('User with this email/username already exists', 400)
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10)
    );

    const user = new User({
      email,
      username,
      hashedPassword,
      role: isAgent ? 'agent' : 'client',
    });

    const result = await user.save();

    const { password: pass, ...rest } = result.toObject();

    const token = await result.createJWT();

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: rest,
    });
  }
);
