import { LoginResponse, SignupResponse } from '../interfaces/response';
import { LoginBody, SingupBody } from '../interfaces/services';
import { IUser } from '../interfaces/user';
import User from '../models/user';
import UserAuth from '../models/user.auth';
import bcrypt from 'bcryptjs';
import { BadRequestError, NotFoundError } from '../handlers/responseHandlers';
import { Role } from '../constants/role';

export const checkUser = async (credential: string): Promise<IUser | null> => {
  const user = await User.findOne({
    $or: [{ email: credential }, { username: credential }],
  });

  return user;
};

export const loginUser = async ({
  credential,
  password,
}: LoginBody): Promise<LoginResponse | undefined> => {
  const userExists = await checkUser(credential);

  if (!userExists) {
    throw new NotFoundError('User does not exists');
    return;
  }

  const user = await UserAuth.findOne({ email: userExists.email });

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user?.password as string
  );

  if (!isPasswordCorrect) {
    throw new BadRequestError('Password is incorrect');
  }

  const token = user?.createJWT();

  return {
    message: 'Log in successful',
    user: userExists,
    token: token as string,
  };
};

export const registerUser = async ({
  username,
  email,
  password,
  isAgent,
}: SingupBody): Promise<SignupResponse> => {
  if (!email || !password || !username) {
    throw new BadRequestError('Provide username, email and pasword');
  }

  if (password.length < 8) {
    throw new BadRequestError('Password should not be less than 8 characters');
  }

  const userExists = await User.findOne({ $or: [{ email }, { username }] });

  if (userExists) {
    throw new BadRequestError('A user with this email/username exists');
  }

  // hash user password
  const hashed_password = await bcrypt.hash(password, await bcrypt.genSalt(10));

  const userAuthInstance = await UserAuth.create({
    email,
    password: hashed_password,
  });

  const user = await User.create({
    email,
    username,
    role: isAgent ? Role.agent : Role.client,
  });

  const token = userAuthInstance.createJWT();

  return {
    message: 'Account Created Succesfully',
    user,
    token,
  };
};
