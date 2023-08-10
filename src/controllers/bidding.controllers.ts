import expressAsyncHandler from "express-async-handler";
import { IRequest } from "../interfaces/IRequest";
import { NextFunction, Response } from "express";
import listingService from "../services/listing.service";
import biddingService from "../services/bidding.service";
import agentService from "../services/agent.service";
import { IBiddingStatus } from "../interfaces/constant";

export const createBidding = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const buyer = req.user?._id as string;
    const property = req.params.id;

    const response = await biddingService.createBidding({
      proposedBuyer: buyer,
      property,
    });

    res
      .status(200)
      .json({ message: "Property bidding created", data: response });
  }
);

export const getPropertyBiddings = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const owner = await agentService.getProfile(req.user?._id as string);
    const { page, hitsPerPage } = req.query;
    const property = req.params.id;

    const response = await biddingService.getPropertyBiddings(
      page as string,
      hitsPerPage as string,
      owner?._id as string,
      property
    );

    res.status(200).json({
      message: "Property biddings fetched successfully",
      data: response.biddings,
      page: response.page,
      hitsPerPage: response.hitsPerPage,
    });
  }
);

export const getReceivedBiddings = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { page, hitsPerPage } = req.query;

    const seller = (await agentService.getProfile(req.user?._id as string))._id;

    const response = await biddingService.getSellerBiddings(
      page as string,
      hitsPerPage as string,
      seller as string
    );

    res.status(200).json({
      message: "Seller biddings fetched successfully",
      data: response.biddings,
      page: response.page,
      hitsPerPage: response.hitsPerPage,
    });
  }
);

export const getSentOutBiddings = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { page, hitsPerPage } = req.query;

    const buyer = req.user?._id;
    const response = await biddingService.getBuyerBiddings(
      page as string,
      hitsPerPage as string,
      buyer as string
    );

    res.status(200).json({
      message: "Buyer biddings fetched successfully",
      data: response,
    });
  }
);

export const deleteBidding = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const bidding = req.params.id;

    await biddingService.deleteBidding(bidding);

    res.status(200).json({ message: "Bidding deleted" });
  }
);

export const editBiddingStatus = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const status: IBiddingStatus = req.body.isAccepted
      ? "accepted"
      : "rejected";
    const id = req.params.id;
    const owner = (await agentService.getProfile(req.user?._id as string))
      ?._id as string;

    const response = await biddingService.editBiddingStatus(owner, id, status);

    res
      .status(200)
      .json({ message: "Bidding edited successfully", data: response });
  }
);
