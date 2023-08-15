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
exports.initiateWithdrawal = exports.validateAccountDetails = exports.getAllBanks = exports.handlePaystackWebhook = exports.purchaseWithTransfer = exports.purchaseWithWallet = exports.getPurcahseSession = exports.getWalletInfo = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const agent_service_1 = __importDefault(require("../services/agent.service"));
const wallet_service_1 = __importDefault(require("../services/wallet.service"));
const payment_1 = __importDefault(require("../helpers/payment"));
const responseHandlers_1 = require("../handlers/responseHandlers");
exports.getWalletInfo = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const agent = yield agent_service_1.default.getProfile((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    const wallet = yield wallet_service_1.default.getWallet(agent === null || agent === void 0 ? void 0 : agent._id);
    res.status(200).json({
        message: "Wallet fetched successfully",
        data: wallet,
    });
}));
exports.getPurcahseSession = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
}));
exports.purchaseWithWallet = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const property = (_c = req.params) === null || _c === void 0 ? void 0 : _c.id;
    const buyer = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
    const response = yield wallet_service_1.default.purchasePropertyFromWallet(property, buyer);
    res.status(200).json({ message: "Property now belongs to you", property });
}));
exports.purchaseWithTransfer = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const property = req.params.id;
    const buyer = (_e = req.user) === null || _e === void 0 ? void 0 : _e._id;
    const response = yield wallet_service_1.default.purchasePropertyWithTransfer(property, buyer);
    res.status(200).json({
        message: response.message,
        data: {
            authorization_url: response.data.authorization_url,
            access_code: response.data.access_code,
            reference: response.data.reference,
        },
    });
}));
exports.handlePaystackWebhook = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = req.headers["x-paystack-signature"];
    const isValid = payment_1.default.validateSignature(req.body, signature);
    if (!isValid) {
        throw new responseHandlers_1.ForbiddenError("Signature is invalid");
    }
    const event = req.body.event;
    const data = req.body.data;
    yield payment_1.default.queryPaystackEvent(event, data);
    res.status(200).json({ message: "✅" });
}));
exports.getAllBanks = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield payment_1.default.fetchBanks();
    res
        .status(200)
        .json({ message: "Banks fetched successfully", data: response.data });
}));
exports.validateAccountDetails = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { account_number, bank_code } = req.body;
    if (!account_number || !bank_code) {
        throw new responseHandlers_1.BadRequestError("Provide account number and bank code");
    }
    const response = yield payment_1.default.verifyAccount(account_number, bank_code);
    res.status(200).json({
        message: "Account info fetched successfully",
        data: {
            account_number: response.data.account_number,
            account_name: response.data.account_name,
        },
    });
}));
exports.initiateWithdrawal = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const { account_number, name, bank_code, amount } = req.body;
    const user = (_f = req.user) === null || _f === void 0 ? void 0 : _f._id;
    const response = yield wallet_service_1.default.initiateWithdrawal({
        account_number,
        name,
        bank_code,
        user,
        amount,
    });
    res.status(200).json({ message: response.message });
}));
