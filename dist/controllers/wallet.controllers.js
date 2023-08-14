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
exports.purchaseWithTransfer = exports.purchaseWithWallet = exports.getPurcahseSession = exports.getWalletInfo = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const agent_service_1 = __importDefault(require("../services/agent.service"));
const wallet_service_1 = __importDefault(require("../services/wallet.service"));
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
    yield wallet_service_1.default.purchasePropertyWithTransfer(property, buyer);
    res.status(200).json({
        message: "Yoooo",
    });
}));
