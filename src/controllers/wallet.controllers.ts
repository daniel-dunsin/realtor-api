import expressAsyncHandler from "express-async-handler";
import { IRequest } from "../interfaces/IRequest";
import { NextFunction, Request, Response } from "express";
import agentService from "../services/agent.service";
import walletService from "../services/wallet.service";
import payment from "../helpers/payment";
import { BadRequestError, ForbiddenError } from "../handlers/responseHandlers";
import { IWebhookData } from "../interfaces/response/payment.response";

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

    const response = await walletService.purchasePropertyWithTransfer(
      property,
      buyer
    );

    res.status(200).json({
      message: response.message,
      data: {
        authorization_url: response.data.authorization_url,
        access_code: response.data.access_code,
        reference: response.data.reference,
      },
    });
  }
);

export const handlePaystackWebhook = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const signature = req.headers["x-paystack-signature"];

    const isValid = payment.validateSignature(req.body, signature as string);

    if (!isValid) {
      throw new ForbiddenError("Signature is invalid");
    }

    const event = req.body.event;

    const data: IWebhookData = req.body.data;

    await payment.queryPaystackEvent(event, data);

    res.status(200).json({ message: "✅" });
  }
);

export const getAllBanks = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const response = await payment.fetchBanks();

    res
      .status(200)
      .json({ message: "Banks fetched successfully", data: response.data });
  }
);

export const validateAccountDetails = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { account_number, bank_code } = req.body;

    if (!account_number || !bank_code) {
      throw new BadRequestError("Provide account number and bank code");
    }

    const response = await payment.verifyAccount(account_number, bank_code);

    res.status(200).json({
      message: "Account info fetched successfully",
      data: {
        account_number: response.data.account_number,
        account_name: response.data.account_name,
      },
    });
  }
);

export const initiateWithdrawal = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { account_number, name, bank_code, amount } = req.body;
    const user = req.user?._id as string;

    const response = await walletService.initiateWithdrawal({
      account_number,
      name,
      bank_code,
      user,
      amount,
    });

    res.status(200).json({ message: response.message });
  }
);
