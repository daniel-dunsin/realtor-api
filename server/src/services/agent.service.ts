import { Role } from '../constants/role';
import { BadRequestError, NotFoundError } from '../handlers/responseHandlers';
import {
  BecomeAgentRes,
  UpdateProfileRes,
} from '../interfaces/response/agent.response';
import { IAgent } from '../interfaces/schema/agent';
import Agent from '../models/agent';
import { checkUser } from './auth.service';

const createAgent = async (id: string): Promise<BecomeAgentRes> => {
  const user = await checkUser(id);

  if (!user) {
    throw new NotFoundError('User does not exists');
  }

  if (user.role === Role.agent) {
    throw new BadRequestError('User is already an agent');
  }

  user.role = Role.agent;

  await Agent.create({ email: user.email, userId: user._id });

  const result = await user.save();

  return {
    message: 'You are now an agent',
  };
};

const updateAgent = async (data: IAgent): Promise<UpdateProfileRes> => {
  const agent = await Agent.findOneAndUpdate({ userId: data?.userId }, data, {
    new: true,
    runValidators: true,
  });

  if (!agent) {
    throw new NotFoundError('Agent does not exist');
  }

  return {
    message: 'Profile Updated',
    agent: agent,
  };
};

const agentService = {
  updateAgent,
  createAgent,
};

export default agentService;
