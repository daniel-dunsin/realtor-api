"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const settings_1 = require("../constants/settings");
const CommentSchema = new mongoose_1.default.Schema({
    text: { type: String, required: true },
    article: {
        type: mongoose_1.default.Types.ObjectId,
        ref: settings_1.settings.mongo.collections.article,
    },
    writer: {
        type: mongoose_1.default.Types.ObjectId,
        ref: settings_1.settings.mongo.collections.user,
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
const CommentModel = mongoose_1.default.model(settings_1.settings.mongo.collections.comment, CommentSchema);
exports.default = CommentModel;
