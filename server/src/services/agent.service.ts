import { Role } from '../constants/role';
import { BadRequestError, NotFoundError } from '../handlers/responseHandlers';
import {
  BecomeAgentRes,
  UpdateProfileRes,
} from '../interfaces/response/agent.response';
import { IAgent } from '../interfaces/schema/agent';
import Agent from '../models/agent';
import { checkUser, getUserById } from './auth.service';

const getProfile = async (id: string): Promise<IAgent> => {
  const agent = await Agent.findOne({ userId: id });

  return agent as IAgent;
};

const createAgent = async (email: string): Promise<BecomeAgentRes> => {
  const user = await checkUser(email);

  if (!user) {
    throw new NotFoundError('User does not exist');
  }

  if (user.role === Role.agent) {
    throw new BadRequestError('User is already an agent');
  }

  user.role = Role.agent;

  const agent = await Agent.create({
    email: user.email,
    userId: user._id,
    username: user.username,
  });

  console.log(agent);

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
  getProfile,
};

export default agentService;
