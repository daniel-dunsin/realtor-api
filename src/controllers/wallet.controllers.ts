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

export const getPurcahseSession = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.user?._id as string;
  }
);

export const purchaseWithWallet = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const property = req.params?.id as string;
    const buyer = req.user?._id as string;

    const response = await walletService.purchasePropertyFromWallet(
      property,
      buyer
    );

    res.status(200).json({ message: "Property now belongs to you", property });
  }
);

export const purchaseWithTransfer = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const property = req.params.id as string;
    const buyer = req.user?._id as string;

    await walletService.purchasePropertyWithTransfer(property, buyer);

    res.status(200).json({
      message: "Yoooo",
    });
  }
);
