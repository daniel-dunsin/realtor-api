import { IAmenities, IPropertyType } from './constants.types';

export interface ISearchSlice {
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
