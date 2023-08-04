import {
  IAreaSuffix,
  IPropertyAmenity,
  IPropertyStatus,
  IPropertyType,
} from "../constant";

export interface CreateListingBody {
  title: string;
  description: string;
  type: IPropertyType;
  status: IPropertyStatus;
  price: number;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: number;
  area: number;
  areaSuffix: IAreaSuffix;
  bedrooms: number;
  bathrooms: number;
  garages: number;
  yearBuilt: string;
  amenities: IPropertyAmenity[];
  images?: string[];
  owner?: any;
}
