import { BadRequestError, NotFoundError } from "../handlers/responseHandlers";
import { IReview } from "../interfaces/schema/review.schema";
import {
  ICreateReviewBody,
  IEditReviewBody,
} from "../interfaces/services/review.body";
import Review from "../models/review.model";
import listingService from "./listing.service";

const addReview = async (props: ICreateReviewBody): Promise<IReview> => {
  const { text, author, stars, listing } = props;

  if (!stars || !text || !author || !listing) {
    throw new BadRequestError("Provide text, stars, author and listing");
  }

  const property = await listingService.getSingleListing(author, listing);

  if (!property) {
    throw new NotFoundError("Property does not exist");
  }

  const review = await Review.create({
    listing,
    author,
    text,
    stars,
  });

  return review;
};

const deleteReview = async (author: string, id: string): Promise<void> => {
  const review = await Review.findOneAndDelete({ _id: id, author });

  if (!review) {
    throw new NotFoundError("Review does not exist or does not belong to you");
  }
};

const updateReview = async (props: IEditReviewBody) => {
  const { _id, text, author, stars } = props;

  const review = await Review.findOne({ _id, author });

  if (!review) {
    throw new NotFoundError("Review does not exist or does not belong to you");
  }

  review.text = text || review.text;
  if (stars || stars === 0) {
    review.stars = stars;
  }

  const result = await review.save();

  return result;
};

const getPropertyReviews = async (id: string): Promise<IReview[]> => {
  const reviews = await Review.find({ listing: id })
    .populate("listing")
    .populate("author");

  if (!reviews || reviews.length === 0) {
    throw new NotFoundError("This property has no reviews");
  }

  return reviews;
};

const reviewService = {
  getPropertyReviews,
  addReview,
  updateReview,
  deleteReview,
};

export default reviewService;
