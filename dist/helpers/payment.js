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
const errorHandlers_1 = require("../handlers/errorHandlers");
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
const payment = {
    initiatePayment,
};
exports.default = payment;
