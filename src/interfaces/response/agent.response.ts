import { IAgent } from "../schema/agent.schema";

export interface BecomeAgentRes {
  message: "You are now an agent";
  agent: IAgent;
}

export interface UpdateProfileRes {
  message: "Profile Updated";
  agent: IAgent;
}
