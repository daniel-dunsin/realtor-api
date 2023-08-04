import {
  LoginResponse,
  SignupResponse,
} from "../interfaces/response/auth.response";
import { LoginBody, SingupBody } from "../interfaces/services/auth.body";
import User from "../models/user.model";
import UserAuth from "../models/user.auth.model";
import bcrypt from "bcryptjs";
import { BadRequestError, NotFoundError } from "../handlers/responseHandlers";
import { Role } from "../constants/role";
import { IUserSchema } from "../interfaces/schema/auth.schema";
import agentService from "./agent.service";
import Agent from "../models/agent.model";

export const checkUser = async (
  credential: string
): Promise<IUserSchema | null> => {
  const user = await User.findOne({
    $or: [{ email: credential }, { username: credential }],
  });

  return user;
};

export const getUserById = async (id: string): Promise<IUserSchema | null> => {
  const user = await User.findById(id);

  return user;
};

export const loginUser = async ({
  credential,
  password,
}: LoginBody): Promise<LoginResponse | undefined> => {
  if (!credential || !password) {
    throw new BadRequestError("Provide credential and password");
  }

  const userExists = await checkUser(credential);

  if (!userExists) {
    throw new NotFoundError("User does not exists");
  }

  const user = await UserAuth.findOne({ email: userExists.email });

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user?.password as string
  );

  if (!isPasswordCorrect) {
    throw new BadRequestError("Password is incorrect");
  }

  const token = user?.createJWT();

  return {
    message: "Log in successful",
    user: userExists,
    token: token as string,
  };
};

export const registerUser = async ({
  username,
  email,
  password,
  isAgent,
  lastname,
  firstname,
}: SingupBody): Promise<SignupResponse> => {
  if (!email || !password || !username) {
    throw new BadRequestError(
      "Provide username,firstname, lastname, email and pasword"
    );
  }

  if (password.length < 8) {
    throw new BadRequestError("Password should not be less than 8 characters");
  }

  const userExists = await User.findOne({ $or: [{ email }, { username }] });

  if (userExists) {
    throw new BadRequestError("A user with this email/username exists");
  }

  // hash user password
  const hashed_password = await bcrypt.hash(password, await bcrypt.genSalt(10));

  const userAuthInstance = await UserAuth.create({
    email,
    password: hashed_password,
  });

  const user = await User.create({
    email,
    firstname,
    lastname,
    username,
    role: isAgent ? Role.agent : Role.client,
  });

  // if isAgent, create an agent profile

  if (isAgent) {
    const agent = await Agent.create({
      email: user.email,
      userId: user._id,
      username: user.username,
    });
  }

  const token = userAuthInstance.createJWT();

  return {
    message: "Account Created Succesfully",
    user,
    token,
  };
};
