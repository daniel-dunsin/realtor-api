import { IAgent } from '../schema/agent';

export interface BecomeAgentRes {
  message: 'You are now an agent';
}

export interface UpdateProfileRes {
  message: 'Profile Updated';
  agent: IAgent;
}
