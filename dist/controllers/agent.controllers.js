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
exports.updateAgentProfile = exports.createAgent = exports.getProfile = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cloudinary_config_1 = require("../config/cloudinary.config");
const agent_service_1 = __importDefault(require("../services/agent.service"));
const wallet_service_1 = __importDefault(require("../services/wallet.service"));
exports.getProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response = yield agent_service_1.default.getProfile((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
    res.status(200).json({ agent: response });
}));
exports.createAgent = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const response = yield agent_service_1.default.createAgent((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.email);
    yield wallet_service_1.default.createWallet((_c = response.agent) === null || _c === void 0 ? void 0 : _c._id);
    res.status(201).json(response);
}));
exports.updateAgentProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
    const path = (_e = req === null || req === void 0 ? void 0 : req.file) === null || _e === void 0 ? void 0 : _e.path;
    const imageUrl = path ? yield (0, cloudinary_config_1.uploadToCloud)(path) : "";
    const body = req.body;
    if (imageUrl) {
        body.imageUrl = imageUrl;
    }
    const response = yield agent_service_1.default.updateAgent(Object.assign({ userId }, body));
    res.status(200).json(response);
}));
