import mongoose, { Types } from "mongoose";
import { IProperty } from "../interfaces/schema/property.schema";
import { IPropertyAmenity } from "../interfaces/constant";
import { settings } from "../constants/settings";

const amenities: IPropertyAmenity[] = [
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

export const PropertySchema = new mongoose.Schema<IProperty>(
  {
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
    status: { type: String, enum: ["sale", "rent"], required: true },
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
    owner: {
      type: Types.ObjectId,
      ref: settings.mongo.collections.agent,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const propertyModel = mongoose.model(
  settings.mongo.collections.property,
  PropertySchema
);

export default propertyModel;
