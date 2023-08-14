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
exports.PropertySchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const settings_1 = require("../constants/settings");
const amenities = [
    "Air Conditioning",
    "Barbeque",
    "Dryer",
    "Gym",
    "Laundry",
    "Lawn",
    "Microwave",
    "Outodoor Shower",
    "Refrigerator",
    "Sauna",
    "Swimming Pool",
    "TV Cable",
    "Washer",
    "Wi-fi",
    "Window Coverings",
];
exports.PropertySchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
        type: String,
        enum: [
            "Apartment",
            "Bungalow",
            "Condo",
            "House",
            "Land",
            "Single Family",
        ],
        required: true,
    },
    status: { type: String, enum: ["sale"], default: "sale", required: true },
    price: { type: Number, required: true },
    location: {
        address: { type: String, required: true },
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: Number, required: true },
    },
    info: {
        area: { type: Number, required: true },
        areaSuffix: { type: String, enum: ["sq.m", "acre"], default: "sq.m" },
        bedrooms: { type: Number, default: 0 },
        bathrooms: { type: Number, default: 0 },
        garages: { type: Number, default: 0 },
        yearBuilt: { type: String, required: true },
    },
    isAvailable: { type: Boolean, default: true },
    amenities: [{ type: String, enum: amenities }],
    images: { type: [{ type: String }], minlength: 1 },
    views: { type: Number, default: 0 },
    // this would be a user id when the property has been bought, else it will be an agent id
    owner: {
        type: mongoose_1.Types.ObjectId,
        // ref: settings.mongo.collections.agent,
        required: true,
    },
    // leave rent for now --- CRON JOB
    rentIsActive: { type: Boolean, default: false },
    rentStartDate: { type: Date },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.PropertySchema.virtual(settings_1.settings.mongo.collections.agent, {
    ref: settings_1.settings.mongo.collections.agent,
    localField: "owner",
    foreignField: "_id",
    justOne: true,
});
exports.PropertySchema.virtual(settings_1.settings.mongo.collections.user, {
    ref: settings_1.settings.mongo.collections.user,
    localField: "owner",
    foreignField: "_id",
    justOne: true,
});
const propertyModel = mongoose_1.default.model(settings_1.settings.mongo.collections.property, exports.PropertySchema);
exports.default = propertyModel;
