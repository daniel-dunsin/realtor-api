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
const payment_1 = __importDefault(require("../helpers/payment"));
const property_model_1 = __importDefault(require("../models/property.model"));
const wallet_model_1 = __importDefault(require("../models/wallet.model"));
const agent_service_1 = __importDefault(require("./agent.service"));
const bidding_service_1 = __importDefault(require("./bidding.service"));
const listing_service_1 = __importDefault(require("./listing.service"));
const transaction_service_1 = __importDefault(require("./transaction.service"));
const createWallet = (agent) => __awaiter(void 0, void 0, void 0, function* () {
    const walletInDb = yield wallet_model_1.default.findOne({ agent });
    if (walletInDb) {
        throw new responseHandlers_1.ForbiddenError("Wallet already exist");
    }
    yield wallet_model_1.default.create({ agent });
});
const getWallet = (agent) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.default.findOne({ agent });
    if (!wallet) {
        throw new responseHandlers_1.NotFoundError("Agent Wallet does not exist");
    }
    return wallet;
});
const updateWalletBalance = (id, available_balance) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.default.findOne({ _id: id });
    if (!wallet) {
        throw new responseHandlers_1.NotFoundError("Wallet does not exist");
    }
    wallet.available_balance = available_balance;
    const result = yield wallet.save();
    return result;
});
const purchasePropertyFromWallet = (propertyId, buyer) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const property = yield listing_service_1.default.getSingleListing(buyer, propertyId);
    if (!property) {
        throw new responseHandlers_1.BadRequestError("The property you are trying to purchase does not exist");
    }
    // check if the bidding exists and has been approved
    const bidding = yield bidding_service_1.default.getBiddingByBuyer(buyer, property === null || property === void 0 ? void 0 : property._id);
    if (bidding.status === "rejected") {
        throw new responseHandlers_1.ForbiddenError("Your bidding for this property was rejected");
    }
    if (bidding.status === "pending") {
        throw new responseHandlers_1.ForbiddenError("Your bidding for this property has not been accepted");
    }
    const agent = yield agent_service_1.default.getProfile(buyer);
    const wallet = yield getWallet(agent === null || agent === void 0 ? void 0 : agent._id);
    const sellerWallet = yield getWallet((_a = property.agent) === null || _a === void 0 ? void 0 : _a._id);
    if (wallet.available_balance < property.price) {
        throw new responseHandlers_1.ForbiddenError("You can not purchase this property due to insufficient balance in your wallet");
    }
    // create a successful transaction model
    yield transaction_service_1.default.createTransaction({
        reference: "",
        status: "success",
        description: `Payment for ${property === null || property === void 0 ? void 0 : property.title}`,
        amount: property.price,
        type: "payment",
        payment_gateway: "wallet",
        property: property === null || property === void 0 ? void 0 : property._id,
        bidding: bidding._id,
    });
    // update the owner of the property
    const response = yield property_model_1.default.findByIdAndUpdate(property === null || property === void 0 ? void 0 : property._id, {
        isAvailable: false,
        owner: buyer,
    }, { new: true, runValidators: true });
    yield updateWalletBalance(wallet === null || wallet === void 0 ? void 0 : wallet._id, wallet.available_balance - property.price);
    yield updateWalletBalance(sellerWallet === null || sellerWallet === void 0 ? void 0 : sellerWallet._id, sellerWallet.available_balance + property.price);
    yield bidding_service_1.default.deleteBidding(bidding._id);
    return response;
});
const purchasePropertyWithTransfer = (propertyId, buyer) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield listing_service_1.default.getSingleListing(buyer, propertyId);
    if (!property) {
        throw new responseHandlers_1.BadRequestError("The property you are trying to purchase does not exist");
    }
    // check if the bidding exists and has been approved
    const bidding = yield bidding_service_1.default.getBiddingByBuyer(buyer, propertyId);
    if (bidding.status === "rejected") {
        throw new responseHandlers_1.ForbiddenError("Your bidding for this property was rejected");
    }
    if (bidding.status === "pending") {
        throw new responseHandlers_1.ForbiddenError("Your bidding for this property has not been accepted");
    }
    const response = yield payment_1.default.initiatePayment(bidding.proposedBuyer.email, property.price);
    console.log(response);
});
const initializeTransaction = (data) => __awaiter(void 0, void 0, void 0, function* () { });
const walletService = {
    createWallet,
    getWallet,
    purchasePropertyFromWallet,
    purchasePropertyWithTransfer,
};
exports.default = walletService;
