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
exports.deletePropertyReview = exports.updatePropertyReview = exports.getPropertyReviews = exports.addReview = exports.getMyProperties = exports.compareProperties = exports.getSingleListing = exports.getAllListings = exports.sellMyProperty = exports.deleteListing = exports.updateListing = exports.getMyListings = exports.createListing = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const responseHandlers_1 = require("../handlers/responseHandlers");
const cloudinary_config_1 = require("../config/cloudinary.config");
const listing_service_1 = __importDefault(require("../services/listing.service"));
const agent_service_1 = __importDefault(require("../services/agent.service"));
const review_service_1 = __importDefault(require("../services/review.service"));
// ===== AGENT REQUESTS
exports.createListing = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const imageFiles = req === null || req === void 0 ? void 0 : req.files;
    const owner = yield agent_service_1.default.getProfile((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    if ((imageFiles === null || imageFiles === void 0 ? void 0 : imageFiles.length) === 0) {
        throw new responseHandlers_1.BadRequestError("Provide at least one image");
    }
    const images = yield Promise.all(imageFiles === null || imageFiles === void 0 ? void 0 : imageFiles.map((file, index) => __awaiter(void 0, void 0, void 0, function* () {
        const url = yield (0, cloudinary_config_1.uploadToCloud)(file.path);
        return url;
    })));
    const response = yield listing_service_1.default.createListing(Object.assign(Object.assign({}, req.body), { owner: owner._id, images }));
    res.status(201).json({
        message: response === null || response === void 0 ? void 0 : response.message,
        data: response.property,
    });
}));
exports.getMyListings = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { hitsPerPage, page } = req.query;
    const owner = yield agent_service_1.default.getProfile((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
    const query = { owner: owner._id };
    const listings = yield listing_service_1.default.getListings(query, page, hitsPerPage);
    res.status(200).json({
        message: "Listings fetched successfully",
        data: listings.properties,
        page: listings.page,
        hitsPerPage: listings.hitsPerPage,
    });
}));
exports.updateListing = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const body = req.body;
    const id = req.params.id;
    const owner = yield agent_service_1.default.getProfile((_c = req.user) === null || _c === void 0 ? void 0 : _c._id);
    const images = req.files;
    if ((images === null || images === void 0 ? void 0 : images.length) > 0) {
        body.images = yield Promise.all(images === null || images === void 0 ? void 0 : images.map((file, index) => __awaiter(void 0, void 0, void 0, function* () {
            const url = yield (0, cloudinary_config_1.uploadToCloud)(file.path);
            return url;
        })));
    }
    const property = yield listing_service_1.default.updateListing(owner._id, id, body);
    res.status(200).json({
        message: "Listing updated successfully",
        data: property,
    });
}));
exports.deleteListing = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const owner = yield agent_service_1.default.getProfile((_d = req.user) === null || _d === void 0 ? void 0 : _d._id);
    const _id = req.params.id;
    yield listing_service_1.default.deleteListing(owner._id, _id);
    res.status(200).json({ message: "Listing deleted successfully" });
}));
exports.sellMyProperty = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const owner = (_e = req.user) === null || _e === void 0 ? void 0 : _e._id;
    const property = req.params.id;
    const response = yield listing_service_1.default.sellMyProperty(property, owner);
    res
        .status(200)
        .json({ message: "Property is now available for sale", data: response });
}));
// ==== public
exports.getAllListings = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { page, hitsPerPage, keyword, type, location, min_price, max_price, amenities, bathrooms, bedrooms, year, area, status, } = req.query;
    const minPrice = parseInt(min_price) || 0;
    const maxPrice = parseInt(max_price);
    const query = { isAvailable: true };
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
    if (bathrooms && typeof parseInt(bathrooms) === "number") {
        query["info.bathrooms"] = parseInt(bathrooms);
    }
    if (bedrooms && typeof parseInt(bedrooms) === "number") {
        query["info.bedrooms"] = parseInt(bedrooms);
    }
    if (year) {
        query["info.yearBuilt"] = year;
    }
    if (area && typeof parseInt(area) === "number") {
        query["info.area"] = parseInt(area);
    }
    if (amenities) {
        const allAmenities = amenities.split(",");
        query.amenities = { $in: allAmenities };
    }
    const listings = yield listing_service_1.default.getListings(query, page, hitsPerPage);
    res.status(200).json({
        message: "Properties fetched successfully",
        data: listings.properties,
        page: listings.page,
        hitsPerPage: listings.hitsPerPage,
    });
}));
exports.getSingleListing = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const _id = req.params.id;
    const viewer = (_f = req.user) === null || _f === void 0 ? void 0 : _f._id;
    const listing = yield listing_service_1.default.getSingleListing(viewer, _id);
    res
        .status(200)
        .json({ message: "Listing fetched successfully", data: listing });
}));
exports.compareProperties = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    const result = yield listing_service_1.default.compareProperties(ids);
    res.status(200).json({ message: "Comparison successful", data: result });
}));
exports.getMyProperties = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const owner = (_g = req.user) === null || _g === void 0 ? void 0 : _g._id;
    const response = yield listing_service_1.default.getMyProperties(owner);
    res
        .status(200)
        .json({ message: "Properties fecthed successfully", data: response });
}));
// ============ listing reviews
exports.addReview = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    const { stars, text } = req.body;
    const author = (_h = req.user) === null || _h === void 0 ? void 0 : _h._id;
    const listing = req.params.id;
    const response = yield review_service_1.default.addReview({
        stars,
        text,
        author,
        listing,
    });
    res
        .status(201)
        .json({ message: "Review Added successfully", data: response });
}));
exports.getPropertyReviews = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const property = req.params.id;
    const response = yield review_service_1.default.getPropertyReviews(property);
    res
        .status(200)
        .json({ message: "Reviews fetched successfully", data: response });
}));
exports.updatePropertyReview = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    const id = req.params.id;
    const { text, stars } = req.body;
    const author = (_j = req.user) === null || _j === void 0 ? void 0 : _j._id;
    const response = yield review_service_1.default.updateReview({
        text,
        stars,
        _id: id,
        author,
    });
    res
        .status(200)
        .json({ message: "Review updated successfully", data: response });
}));
exports.deletePropertyReview = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    const id = req.params.id;
    const author = (_k = req.user) === null || _k === void 0 ? void 0 : _k._id;
    yield review_service_1.default.deleteReview(author, id);
    res.status(200).json({ message: "Review deleted successfully" });
}));
