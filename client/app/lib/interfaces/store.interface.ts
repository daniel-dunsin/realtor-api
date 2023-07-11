import { IAmenities, IOffer, IPropertyType } from './constants.types';

export interface ISearchSlice {
  offer: IOffer;
  keyword: string;
  propertyType: IPropertyType | '';
  location: string;
  price: number;
  amenities: IAmenities[];
  bathrooms: number;
  bedrooms: number;
  yearBuilt: number;
  area: number;
}

export interface IHandler {
  width: number;
}
