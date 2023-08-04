import mongoose, { Document } from "mongoose";
import {
  IAreaSuffix,
  IPropertyAmenity,
  IPropertyStatus,
  IPropertyType,
} from "../constant";

export interface IProperty {
  title: string;
  description: string;
  type: IPropertyType;
  status: IPropertyStatus;
  price: number;
  location: {
    address: string;
    country: string;
    state: string;
    city: string;
    zipCode: number;
  };
  info: {
    area: number;
    areaSuffix: IAreaSuffix;
    bedrooms: number;
    bathrooms: number;
    garages: number;
    yearBuilt: string;
  };
  amenities: IPropertyAmenity[];
  images: string[];
  owner: any;
  views: 0;
  createdAt?: Date;
  updatedAt?: Date;
}
