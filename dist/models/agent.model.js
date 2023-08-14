"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const settings_1 = require("../constants/settings");
const agentSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            "Provide a valid email",
        ],
    },
    firstname: {
        type: String,
        trim: true,
    },
    lastname: {
        type: String,
        trim: true,
    },
    position: {
        type: String,
        trim: true,
    },
    license: {
        type: String,
        trim: true,
    },
    companyName: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    imageUrl: {
        type: String,
        trim: true,
    },
    taxNumber: {
        type: Number,
        trim: true,
    },
    phone: {
        type: Number,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        minlength: [50, "Provide at least 50 characters"],
    },
    socialMedia: {
        facebook: String,
        instagram: String,
        googlePlus: String,
        pinterest: String,
        website: String,
        youtube: String,
        linkedin: String,
        twitter: String,
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: settings_1.settings.mongo.collections.user,
        required: true,
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.default = mongoose_1.default.model(settings_1.settings.mongo.collections.agent, agentSchema);
