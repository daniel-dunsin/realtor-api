"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const settings_1 = require("../constants/settings");
const ArticleSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    category: {
        type: String,
        enum: {
            values: ["construction", "business", "apartment", "sales"],
            message: "{VALUE} is not a valid category",
        },
    },
    body: { type: String, minlength: 80, required: true },
    tags: { type: [{ type: String }], default: [] },
    views: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    author: {
        type: mongoose_1.default.Types.ObjectId,
        ref: settings_1.settings.mongo.collections.agent,
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
const ArticleModel = mongoose_1.default.model(settings_1.settings.mongo.collections.article, ArticleSchema);
exports.default = ArticleModel;
