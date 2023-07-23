import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { IRequest } from '../interfaces/IRequest';
import { IAgent } from '../interfaces/schema/agent';
import agentService from '../services/agent.service';

export const createAgent = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const response = await agentService.createAgent(req?.user?._id as string);

    res.status(201).json(response);
  }
);

export const updateAgentProfile = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.user?._id as string;

    const {
      firstname,
      lastname,
      position,
      license,
      companyName,
      address,
      taxNumber,
      phone,
      description,
      socialMedia,
    } = req.body as IAgent;

    const response = await agentService.updateAgent({
      userId,
      firstname,
      lastname,
      position,
      license,
      companyName,
      address,
      taxNumber,
      phone,
      description,
      socialMedia,
    });

    res.status(200).json(response);
  }
);
