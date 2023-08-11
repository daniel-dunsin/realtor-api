import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../handlers/errorHandlers";
import bcrypt from "bcryptjs";
import { checkUser, loginUser, registerUser } from "../services/auth.service";

export const register = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password, isAgent, firstname, lastname } =
      req.body;

    const response = await registerUser({
      email,
      username,
      password,
      isAgent,
      firstname,
      lastname,
    });

    res.status(201).json(response);
  }
);

export const login = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { credential, password } = req.body;

    const response = await loginUser({ credential, password });
    res.status(200).json(response);
  }
);
