"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseHandlers_1 = require("../handlers/responseHandlers");
const review_model_1 = __importDefault(require("../models/review.model"));
const listing_service_1 = __importDefault(require("./listing.service"));
const addReview = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, author, stars, listing } = props;
    if (!stars || !text || !author || !listing) {
        throw new responseHandlers_1.BadRequestError("Provide text, stars, author and listing");
    }
    const property = yield listing_service_1.default.getSingleListing(author, listing);
    if (!property) {
        throw new responseHandlers_1.NotFoundError("Property does not exist");
    }
    const review = yield review_model_1.default.create({
        listing,
        author,
        text,
        stars,
    });
    return review;
});
const deleteReview = (author, id) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.default.findOneAndDelete({ _id: id, author });
    if (!review) {
        throw new responseHandlers_1.NotFoundError("Review does not exist or does not belong to you");
    }
});
const updateReview = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, text, author, stars } = props;
    const review = yield review_model_1.default.findOne({ _id, author });
    if (!review) {
        throw new responseHandlers_1.NotFoundError("Review does not exist or does not belong to you");
    }
    review.text = text || review.text;
    if (stars || stars === 0) {
        review.stars = stars;
    }
    const result = yield review.save();
    return result;
});
const getPropertyReviews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_model_1.default.find({ listing: id })
        .populate("listing")
        .populate("author");
    if (!reviews || reviews.length === 0) {
        throw new responseHandlers_1.NotFoundError("This property has no reviews");
    }
    return reviews;
});
const reviewService = {
    getPropertyReviews,
    addReview,
    updateReview,
    deleteReview,
};
exports.default = reviewService;
