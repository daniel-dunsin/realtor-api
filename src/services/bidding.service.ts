import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../handlers/responseHandlers";
import { paginate } from "../helpers/paginate";
import { IBiddingStatus } from "../interfaces/constant";
import { IBiddingRes } from "../interfaces/response/bidding.response";
import { IBidding } from "../interfaces/schema/bidding.schema";
import { ICreateBiddingBody } from "../interfaces/services/bidding.body";
import Bidding from "../models/bidding.model";
import agentService from "./agent.service";
import { getUser } from "./auth.service";
import listingService from "./listing.service";

const getPropertyBiddings = async (
  page: string,
  hitsPerPage: string,
  owner: string,
  propertyId: string
): Promise<IBiddingRes> => {
  const property = await listingService.getSingleListing(owner, propertyId);

  if (!property || property?.owner?._id?.toString() !== owner.toString()) {
    throw new ForbiddenError("Property does not belong to you");
  }

  const query = Bidding.find({ property });

  const bidding = await paginate(page, hitsPerPage, query);

  if (!bidding.result || bidding.result.length === 0) {
    throw new NotFoundError("Property has no bidding");
  }

  return {
    page: bidding.page,
    hitsPerPage: bidding.hitsPerPage,
    biddings: bidding.result,
  };
};

const getSellerBiddings = async (
  page: string,
  hitsPerPage: string,
  seller: string
): Promise<IBiddingRes> => {
  const query = Bidding.find({ seller, status: "pending" })
    .populate("seller")
    .populate("proposedBuyer")
    .populate("property");

  const bidding = await paginate(page, hitsPerPage, query);

  if (!bidding.result || bidding.result.length === 0) {
    throw new NotFoundError("User has no bidding");
  }

  return {
    page: bidding.page,
    hitsPerPage: bidding.hitsPerPage,
    biddings: bidding.result,
  };
};

const getBuyerBiddings = async (
  page: string,
  hitsPerPage: string,
  proposedBuyer: string
): Promise<IBiddingRes> => {
  const query = Bidding.find({ proposedBuyer })
    .populate("seller")
    .populate("proposedBuyer")
    .populate("property");

  const bidding = await paginate(page, hitsPerPage, query);

  if (!bidding.result || bidding.result.length === 0) {
    throw new NotFoundError("User has no bidding");
  }

  return {
    page: bidding.page,
    hitsPerPage: bidding.hitsPerPage,
    biddings: bidding.result,
  };
};

const createBidding = async (body: ICreateBiddingBody): Promise<IBidding> => {
  if (!body.property || !body.proposedBuyer) {
    throw new BadRequestError("Provide seller, buyer and property id");
  }

  const property = await listingService.getSingleListing(
    body.proposedBuyer,
    body.property
  );

  if (!property.isAvailable) {
    throw new ForbiddenError("Property is not available");
  }

  //   we need to get the user id of the agent to ensure it isn't the owner that's trying to buy the property
  const sellerUserId = await getUser(property.owner.userId);

  if (body.proposedBuyer.toString() === sellerUserId._id.toString()) {
    throw new ForbiddenError("You can not buy your property");
  }

  //   check if the bidding doesn't already exist
  const biddingInDb = await Bidding.findOne({
    property: body.property,
    proposedBuyer: body.proposedBuyer,
    seller: property.owner._id,
  });

  if (biddingInDb) {
    throw new BadRequestError("Bidding already exist");
  }

  const bidding = await Bidding.create({ ...body, seller: property.owner._id });

  return bidding;
};

const deleteBidding = async (_id: string) => {
  const bidding = await Bidding.findByIdAndDelete(_id);

  if (!bidding) {
    throw new NotFoundError("Bidding not found");
  }
};

const editBiddingStatus = async (
  owner: string,
  id: string,
  status: IBiddingStatus
): Promise<IBidding> => {
  if (status !== "accepted" && status !== "rejected") {
    throw new NotFoundError("Status is unacceptable");
  }

  if (!owner) {
    throw new BadRequestError("Provide owner");
  }

  const bidding = await Bidding.findOne({ _id: id, seller: owner })
    .populate("seller")
    .populate("proposedBuyer")
    .populate("property");

  if (!bidding) {
    throw new NotFoundError(
      "Bidding does not exist or you're not enlisted as a seller in this bidding"
    );
  }

  if (bidding.status !== "pending") {
    throw new BadRequestError(
      "You can not update a bidding that is not pending"
    );
  }

  bidding.status = status;

  const res = await bidding.save();

  // If it is accepted, set others to rejected
  if (status === "accepted") {
    await Bidding.updateMany(
      {
        $or: [{ status: "pending" }, { status: "rejected" }],
        property: bidding.property,
      },
      { status: "rejected" }
    );
  }

  return res;
};

export const getBiddingByBuyer = async (
  buyer: string,
  property: string
): Promise<IBidding> => {
  const bidding = await Bidding.findOne({ proposedBuyer: buyer, property });

  if (!bidding) {
    throw new NotFoundError(
      "Bidding with you anlisted as buyer does not exist"
    );
  }

  return bidding;
};

const biddingService = {
  getPropertyBiddings,
  getSellerBiddings,
  getBuyerBiddings,
  deleteBidding,
  createBidding,
  editBiddingStatus,
};

export default biddingService;
