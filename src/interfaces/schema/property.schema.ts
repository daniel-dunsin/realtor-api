import mongoose, { Document } from "mongoose";
import {
  IAreaSuffix,
  IPropertyAmenity,
  IPropertyStatus,
  IPropertyType,
} from "../constant";
import { IAgent } from "./agent.schema";
import { IUserSchema } from "./auth.schema";

export interface IProperty {
  _id?: string;
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
  isAvailable: boolean;
  owner: any;
  views: 0;
  createdAt?: Date;
  updatedAt?: Date;
  rentStartDate?: Date;
  rentIsActive?: boolean;
  agent?: IAgent;
  user?: IUserSchema;
}
