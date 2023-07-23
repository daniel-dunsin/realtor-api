import { Role } from '../constants/role';
import { BadRequestError, NotFoundError } from '../handlers/responseHandlers';
import {
  BecomeAgentRes,
  UpdateProfileRes,
} from '../interfaces/response/agent.response';
import { IAgent } from '../interfaces/schema/agent';
import Agent from '../models/agent';
import { checkUser } from './auth.service';

export const becomeAgent = async (id: string): Promise<BecomeAgentRes> => {
  const user = await checkUser(id);

  if (!user) {
    throw new NotFoundError('User does not exists');
  }

  if (user.role === Role.agent) {
    throw new BadRequestError('User is already an agent');
  }

  user.role = Role.agent;

  const result = await user.save();

  return {
    message: 'You are now an agent',
  };
};

export const updateAgent = async (data: IAgent): Promise<UpdateProfileRes> => {
  const agent = await Agent.findOne({ userId: data?.userId });

  let result;

  if (!agent) {
    result = await Agent.create({ ...data, email: data.email });
  } else {
    result = await Agent.findByIdAndUpdate(agent?._id, data, {
      new: true,
      runValidators: true,
    });
  }

  return {
    message: 'Profile Updated',
    agent: result as IAgent,
  };
};
