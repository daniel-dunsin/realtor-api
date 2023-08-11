import expressAsyncHandler from "express-async-handler";
import { IRequest } from "../interfaces/IRequest";
import { NextFunction, Response } from "express";
import agentService from "../services/agent.service";
import walletService from "../services/wallet.service";

export const getWalletInfo = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const agent = await agentService.getProfile(req.user?._id);

    const wallet = await walletService.getWallet(agent?._id as string);

    res.status(200).json({
      message: "Wallet fetched successfully",
      data: wallet,
    });
  }
);
