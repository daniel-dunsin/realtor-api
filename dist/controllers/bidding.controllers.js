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
exports.editBiddingStatus = exports.deleteBidding = exports.getSentOutBiddings = exports.getReceivedBiddings = exports.getPropertyBiddings = exports.createBidding = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bidding_service_1 = __importDefault(require("../services/bidding.service"));
const agent_service_1 = __importDefault(require("../services/agent.service"));
exports.createBidding = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const buyer = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const property = req.params.id;
    const response = yield bidding_service_1.default.createBidding({
        proposedBuyer: buyer,
        property,
    });
    res
        .status(201)
        .json({ message: "Property bidding created", data: response });
}));
exports.getPropertyBiddings = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const owner = yield agent_service_1.default.getProfile((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
    const { page, hitsPerPage } = req.query;
    const property = req.params.id;
    const response = yield bidding_service_1.default.getPropertyBiddings(page, hitsPerPage, owner === null || owner === void 0 ? void 0 : owner._id, property);
    res.status(200).json({
        message: "Property biddings fetched successfully",
        data: response.biddings,
        page: response.page,
        hitsPerPage: response.hitsPerPage,
    });
}));
exports.getReceivedBiddings = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { page, hitsPerPage } = req.query;
    const seller = (yield agent_service_1.default.getProfile((_c = req.user) === null || _c === void 0 ? void 0 : _c._id))._id;
    const response = yield bidding_service_1.default.getSellerBiddings(page, hitsPerPage, seller);
    res.status(200).json({
        message: "Seller biddings fetched successfully",
        data: response.biddings,
        page: response.page,
        hitsPerPage: response.hitsPerPage,
    });
}));
exports.getSentOutBiddings = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { page, hitsPerPage } = req.query;
    const buyer = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
    const response = yield bidding_service_1.default.getBuyerBiddings(page, hitsPerPage, buyer);
    res.status(200).json({
        message: "Buyer biddings fetched successfully",
        data: response.biddings,
        page: response.page,
        hitsPerPage: response.hitsPerPage,
    });
}));
exports.deleteBidding = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bidding = req.params.id;
    yield bidding_service_1.default.deleteBidding(bidding);
    res.status(200).json({ message: "Bidding deleted" });
}));
exports.editBiddingStatus = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const status = req.body.isAccepted === true
        ? "accepted"
        : req.body.isAccepted === false
            ? "rejected"
            : "";
    const id = req.params.id;
    const owner = (_f = (yield agent_service_1.default.getProfile((_e = req.user) === null || _e === void 0 ? void 0 : _e._id))) === null || _f === void 0 ? void 0 : _f._id;
    const response = yield bidding_service_1.default.editBiddingStatus(owner, id, status);
    res
        .status(200)
        .json({ message: "Bidding edited successfully", data: response });
}));
