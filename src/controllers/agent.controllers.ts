import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { uploadToCloud } from "../config/cloudinary.config";
import { IRequest } from "../interfaces/IRequest";
import { IAgent } from "../interfaces/schema/agent.schema";
import agentService from "../services/agent.service";
import walletService from "../services/wallet.service";

export const getProfile = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const response = await agentService.getProfile(req?.user?._id as string);

    res.status(200).json({ agent: response });
  }
);

export const createAgent = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const response = await agentService.createAgent(req?.user?.email as string);

    await walletService.createWallet(response.agent?._id as string);

    res.status(201).json(response);
  }
);

export const updateAgentProfile = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.user?._id as string;

    const path = (req as any)?.file?.path;

    const imageUrl = path ? await uploadToCloud(path) : "";

    const body = req.body as IAgent;

    if (imageUrl) {
      body.imageUrl = imageUrl;
    }

    const response = await agentService.updateAgent({
      userId,
      ...body,
    });

    res.status(200).json(response);
  }
);
