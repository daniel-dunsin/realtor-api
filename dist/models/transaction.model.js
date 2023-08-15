"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const settings_1 = require("../constants/settings");
const TransactionSchema = new mongoose_1.default.Schema({
    reference: { type: String },
    status: {
        type: String,
        enum: ["success", "failed", "pending"],
        default: "pending",
    },
    currency: {
        type: String,
        enum: ["NGN"],
        default: "NGN",
    },
    description: { type: String },
    amount: { type: Number, default: 0 },
    type: { type: String, required: true, enum: ["payment", "withdrawal"] },
    payment_gateway: { type: String, enum: ["card", "wallet"] },
    bidding: {
        type: mongoose_1.default.Types.ObjectId,
        ref: settings_1.settings.mongo.collections.bidding,
    },
    property: {
        type: mongoose_1.default.Types.ObjectId,
        ref: settings_1.settings.mongo.collections.property,
    },
    initiator: {
        type: mongoose_1.default.Types.ObjectId,
        ref: settings_1.settings.mongo.collections.user,
        required: true,
    },
});
const TransactionModel = mongoose_1.default.model(settings_1.settings.mongo.collections.transaction, TransactionSchema);
exports.default = TransactionModel;
