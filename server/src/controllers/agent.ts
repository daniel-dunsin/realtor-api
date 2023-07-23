import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { IRequest } from '../interfaces/IRequest';
import { IAgent } from '../interfaces/schema/agent';
import { becomeAgent, updateAgent } from '../services/agent.service';

export const becomeAnAgent = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const response = await becomeAgent(id);

    res.status(200).json(response);
  }
);

export const updateAgentProfile = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.user?._id as string;
    const email = req.user?.email as string;

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

    const response = await updateAgent({
      userId,
      email,
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
