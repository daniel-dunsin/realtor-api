"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const settings_1 = require("../constants/settings");
const ReviewSchema = new mongoose_1.default.Schema({
    text: { type: String, required: true },
    stars: { type: Number, require: true, min: 0, max: 5 },
    author: {
        type: mongoose_1.default.Types.ObjectId,
        ref: settings_1.settings.mongo.collections.user,
        required: true,
    },
    listing: {
        type: mongoose_1.default.Types.ObjectId,
        ref: settings_1.settings.mongo.collections.property,
        required: true,
    },
});
const ReviewModel = mongoose_1.default.model(settings_1.settings.mongo.collections.review, ReviewSchema);
exports.default = ReviewModel;
