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
exports.getBiddingByBuyer = void 0;
const responseHandlers_1 = require("../handlers/responseHandlers");
const paginate_1 = require("../helpers/paginate");
const bidding_model_1 = __importDefault(require("../models/bidding.model"));
const auth_service_1 = require("./auth.service");
const listing_service_1 = __importDefault(require("./listing.service"));
const getPropertyBiddings = (page, hitsPerPage, owner, propertyId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const property = yield listing_service_1.default.getSingleListing(owner, propertyId);
    if (!property || ((_b = (_a = property === null || property === void 0 ? void 0 : property.agent) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString()) !== (owner === null || owner === void 0 ? void 0 : owner.toString())) {
        throw new responseHandlers_1.ForbiddenError("Property does not belong to you");
    }
    const query = bidding_model_1.default.find({ property });
    const bidding = yield (0, paginate_1.paginate)(page, hitsPerPage, query);
    if (!bidding.result || bidding.result.length === 0) {
        throw new responseHandlers_1.NotFoundError("Property has no bidding");
    }
    return {
        page: bidding.page,
        hitsPerPage: bidding.hitsPerPage,
        biddings: bidding.result,
    };
});
const getSellerBiddings = (page, hitsPerPage, seller) => __awaiter(void 0, void 0, void 0, function* () {
    const query = bidding_model_1.default.find({ seller, status: "pending" })
        .populate("seller")
        .populate("proposedBuyer")
        .populate("property");
    const bidding = yield (0, paginate_1.paginate)(page, hitsPerPage, query);
    if (!bidding.result || bidding.result.length === 0) {
        throw new responseHandlers_1.NotFoundError("User has no bidding");
    }
    return {
        page: bidding.page,
        hitsPerPage: bidding.hitsPerPage,
        biddings: bidding.result,
    };
});
const getBuyerBiddings = (page, hitsPerPage, proposedBuyer) => __awaiter(void 0, void 0, void 0, function* () {
    const query = bidding_model_1.default.find({ proposedBuyer, status: "pending" })
        .populate("seller")
        .populate("proposedBuyer")
        .populate("property");
    const bidding = yield (0, paginate_1.paginate)(page, hitsPerPage, query);
    if (!bidding.result || bidding.result.length === 0) {
        throw new responseHandlers_1.NotFoundError("User has no bidding");
    }
    return {
        page: bidding.page,
        hitsPerPage: bidding.hitsPerPage,
        biddings: bidding.result,
    };
});
const createBidding = (body) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f;
    if (!body.property || !body.proposedBuyer) {
        throw new responseHandlers_1.BadRequestError("Provide seller, buyer and property id");
    }
    const property = yield listing_service_1.default.getSingleListing(body.proposedBuyer, body.property);
    if (!property.isAvailable) {
        throw new responseHandlers_1.ForbiddenError("Property is not available");
    }
    //   we need to get the user id of the agent to ensure it isn't the owner that's trying to buy the property
    const sellerUserId = yield (0, auth_service_1.getUser)(((_c = property === null || property === void 0 ? void 0 : property.agent) === null || _c === void 0 ? void 0 : _c.userId) || ((_d = property === null || property === void 0 ? void 0 : property.user) === null || _d === void 0 ? void 0 : _d._id));
    if (body.proposedBuyer.toString() === sellerUserId._id.toString()) {
        throw new responseHandlers_1.ForbiddenError("You can not buy your property");
    }
    //   check if the bidding doesn't already exist
    const biddingInDb = yield bidding_model_1.default.findOne({
        property: body.property,
        proposedBuyer: body.proposedBuyer,
        seller: (_e = property === null || property === void 0 ? void 0 : property.agent) === null || _e === void 0 ? void 0 : _e._id,
        $or: [{ status: "pending" }, { status: "accepted" }],
    });
    if (biddingInDb) {
        throw new responseHandlers_1.BadRequestError("Bidding already exist");
    }
    const bidding = yield bidding_model_1.default.create(Object.assign(Object.assign({}, body), { seller: (_f = property === null || property === void 0 ? void 0 : property.agent) === null || _f === void 0 ? void 0 : _f._id }));
    return bidding;
});
const deleteBidding = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const bidding = yield bidding_model_1.default.findByIdAndDelete(_id);
    if (!bidding) {
        throw new responseHandlers_1.NotFoundError("Bidding not found");
    }
});
const editBiddingStatus = (owner, id, status) => __awaiter(void 0, void 0, void 0, function* () {
    if (status !== "accepted" && status !== "rejected") {
        throw new responseHandlers_1.NotFoundError("Status is unacceptable");
    }
    if (!owner) {
        throw new responseHandlers_1.BadRequestError("Provide owner");
    }
    const bidding = yield bidding_model_1.default.findOne({ _id: id, seller: owner })
        .populate("seller")
        .populate("proposedBuyer")
        .populate("property");
    if (!bidding) {
        throw new responseHandlers_1.NotFoundError("Bidding does not exist or you're not enlisted as a seller in this bidding");
    }
    if (bidding.status !== "pending") {
        throw new responseHandlers_1.BadRequestError("You can not update a bidding that is not pending");
    }
    bidding.status = status;
    const res = yield bidding.save();
    // If it is accepted, set others to rejected
    if (status === "accepted") {
        yield bidding_model_1.default.updateMany({
            $or: [{ status: "pending" }, { status: "rejected" }],
            property: bidding.property,
        }, { status: "rejected" });
    }
    return res;
});
const getBiddingByBuyer = (buyer, property) => __awaiter(void 0, void 0, void 0, function* () {
    const bidding = yield bidding_model_1.default.findOne({
        proposedBuyer: buyer,
        property,
        $or: [{ status: "pending" }, { status: "accepted" }],
    })
        .populate("proposedBuyer")
        .populate("seller");
    if (!bidding) {
        throw new responseHandlers_1.NotFoundError("Bidding with you enlisted as buyer does not exist");
    }
    return bidding;
});
exports.getBiddingByBuyer = getBiddingByBuyer;
const biddingService = {
    getPropertyBiddings,
    getSellerBiddings,
    getBuyerBiddings,
    deleteBidding,
    createBidding,
    editBiddingStatus,
    getBiddingByBuyer: exports.getBiddingByBuyer,
};
exports.default = biddingService;
