import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { CreateListingBody } from "../interfaces/services/listing.body";
import { BadRequestError } from "../handlers/responseHandlers";
import { uploadToCloud } from "../config/cloudinary.config";
import listingService from "../services/listing.service";
import { IRequest } from "../interfaces/IRequest";
import agentService from "../services/agent.service";
import { IAgent } from "../interfaces/schema/agent.schema";
import reviewService from "../services/review.service";

// ===== AGENT REQUESTS

export const createListing = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const imageFiles: any = req?.files;
    const owner = await agentService.getProfile(req.user?._id as string);

    if (imageFiles?.length === 0) {
      throw new BadRequestError("Provide at least one image");
    }

    const images = await Promise.all(
      imageFiles?.map(async (file: any, index: number) => {
        const url = await uploadToCloud(file.path);
        return url;
      })
    );

    const response = await listingService.createListing({
      ...req.body,
      owner: owner._id,
      images,
    });

    res.status(201).json({
      message: response?.message,
      data: response.property,
    });
  }
);

export const getMyListings = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { hitsPerPage, page } = req.query;

    const owner = await agentService.getProfile(req.user?._id as string);

    const query = { owner: owner._id };

    const listings = await listingService.getListings(
      query,
      page as string,
      hitsPerPage as string
    );

    res.status(200).json({
      message: "Listings fetched successfully",
      data: listings.properties,
      page: listings.page,
      hitsPerPage: listings.hitsPerPage,
    });
  }
);

export const updateListing = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const body = req.body;
    const id = req.params.id;

    const owner = await agentService.getProfile(req.user?._id);

    const images: any = req.files;

    if ((images?.length as number) > 0) {
      body.images = await Promise.all(
        images?.map(async (file: any, index: number) => {
          const url = await uploadToCloud(file.path);
          return url;
        })
      );
    }

    const property = await listingService.updateListing(
      owner._id as string,
      id,
      body
    );

    res.status(200).json({
      message: "Listing updated successfully",
      data: property,
    });
  }
);

export const deleteListing = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const owner = await agentService.getProfile(req.user?._id);
    const _id = req.params.id;

    await listingService.deleteListing(owner._id as string, _id);

    res.status(200).json({ message: "Listing deleted successfully" });
  }
);

// ==== public
export const getAllListings = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let {
      page,
      hitsPerPage,
      keyword,
      type,
      location,
      min_price,
      max_price,
      amenities,
      bathrooms,
      bedrooms,
      year,
      area,
      status,
    } = req.query;

    const minPrice = parseInt(min_price as string) || 0;
    const maxPrice = parseInt(max_price as string);

    const query: any = { isAvailable: true };

    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    if (type) {
      query.type = { $regex: type, $options: "i" };
    }

    if (location) {
      query["location.country"] = { $regex: location, $options: "i" };
    }

    if (minPrice && !maxPrice) {
      query.price = { $gte: minPrice };
    }

    if (maxPrice && !minPrice) {
      query.price = { $lte: maxPrice };
    }

    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    }

    if (bathrooms && typeof parseInt(bathrooms as string) === "number") {
      query["info.bathrooms"] = parseInt(bathrooms as string);
    }

    if (bedrooms && typeof parseInt(bedrooms as string) === "number") {
      query["info.bedrooms"] = parseInt(bedrooms as string);
    }

    if (year) {
      query["info.yearBuilt"] = year;
    }

    if (area && typeof parseInt(area as string) === "number") {
      query["info.area"] = parseInt(area as string);
    }

    if (status && (status === "rent" || status === "sale")) {
      query.status = (status as string).toLowerCase();
    }

    if (amenities) {
      const allAmenities = (amenities as string).split(",");
      query.amenities = { $in: allAmenities };
    }

    const listings = await listingService.getListings(
      query,
      page as string,
      hitsPerPage as string
    );

    res.status(200).json({
      message: "Properties fetched successfully",
      data: listings.properties,
      page: listings.page,
      hitsPerPage: listings.hitsPerPage,
    });
  }
);

export const getSingleListing = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const _id = req.params.id;
    const viewer: string = req.user?._id as string;

    const listing = await listingService.getSingleListing(viewer, _id);

    res
      .status(200)
      .json({ message: "Listing fetched successfully", data: listing });
  }
);

export const compareProperties = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.body;

    const result = await listingService.compareProperties(ids);

    res.status(200).json({ message: "Comparison successful", data: result });
  }
);

// ============ listing reviews
export const addReview = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { stars, text } = req.body;
    const author = req.user?._id as string;
    const listing = req.params.id;

    const response = await reviewService.addReview({
      stars,
      text,
      author,
      listing,
    });

    res
      .status(201)
      .json({ message: "Review Added successfully", data: response });
  }
);

export const getPropertyReviews = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const property = req.params.id;

    const response = await reviewService.getPropertyReviews(property);

    res
      .status(200)
      .json({ message: "Reviews fetched successfully", data: response });
  }
);

export const updatePropertyReview = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { text, stars } = req.body;
    const author = req.user?._id as string;

    const response = await reviewService.updateReview({
      text,
      stars,
      _id: id,
      author,
    });

    res
      .status(200)
      .json({ message: "Review updated successfully", data: response });
  }
);

export const deletePropertyReview = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const author = req.user?._id as string;

    await reviewService.deleteReview(author, id);

    res.status(200).json({ message: "Review deleted successfully" });
  }
);
