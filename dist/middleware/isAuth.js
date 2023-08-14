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
exports.isAuth = void 0;
const responseHandlers_1 = require("../handlers/responseHandlers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = require("../constants/settings");
const user_model_1 = __importDefault(require("../models/user.model"));
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new responseHandlers_1.UnAuthorizedError("Invalid token format. Use `Bearer {token}`"));
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return next(new responseHandlers_1.UnAuthorizedError("Unauthorized request"));
    }
    const user = jsonwebtoken_1.default.verify(token, settings_1.settings.jwt.secret);
    if (!user) {
        return next(new responseHandlers_1.UnAuthorizedError("Token has expired"));
    }
    const mainUserInfo = (yield user_model_1.default.findOne({
        email: user.email,
    }));
    req.user = {
        _id: mainUserInfo === null || mainUserInfo === void 0 ? void 0 : mainUserInfo._id,
        email: user.email,
    };
    next();
});
exports.isAuth = isAuth;
