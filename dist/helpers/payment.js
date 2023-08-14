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
const axios_config_1 = __importDefault(require("../config/axios.config"));
const settings_1 = require("../constants/settings");
const errorHandlers_1 = require("../handlers/errorHandlers");
const crypto_1 = __importDefault(require("crypto"));
const transaction_service_1 = __importDefault(require("../services/transaction.service"));
const responseHandlers_1 = require("../handlers/responseHandlers");
const wallet_service_1 = __importDefault(require("../services/wallet.service"));
const listing_service_1 = __importDefault(require("../services/listing.service"));
const paystack_secret = settings_1.settings.paystack.test;
const initiatePayment = (email, amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_config_1.default.post("/transaction/initialize", {
            email,
            amount: amount * 100,
        });
        return response === null || response === void 0 ? void 0 : response.data;
    }
    catch (error) {
        throw new errorHandlers_1.CustomError(error.message, 500);
    }
});
const validateSignature = (body, signature) => {
    const hash = crypto_1.default
        .createHmac("sha512", paystack_secret)
        .update(JSON.stringify(body))
        .digest("hex");
    return hash === signature;
};
const queryPaystackEvent = (event, data) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_service_1.default.findByReference(data.reference);
    if (!transaction)
        throw new responseHandlers_1.NotFoundError("Transaction does not exist");
    switch (event) {
        case "charge.success":
            yield transaction_service_1.default.updateTransactionStatus(transaction._id, true);
            const property = transaction.property;
            const buyer = transaction.bidding.proposedBuyer;
            const agent_wallet = yield wallet_service_1.default.getWallet(property === null || property === void 0 ? void 0 : property.owner);
            yield wallet_service_1.default.updateWalletBalance(agent_wallet._id, agent_wallet.available_balance + property.price);
            yield listing_service_1.default.updatePropertyOwner(property._id, buyer);
            break;
        case "charge.failed":
            yield transaction_service_1.default.updateTransactionStatus(transaction._id, false);
            break;
        default:
            throw new responseHandlers_1.ForbiddenError("Invalid event");
    }
});
const payment = {
    initiatePayment,
    validateSignature,
    queryPaystackEvent,
};
exports.default = payment;
