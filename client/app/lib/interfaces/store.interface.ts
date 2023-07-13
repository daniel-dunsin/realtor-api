import { ReactElement, ReactNode } from 'react';
import { IAmenities, IOffer, IPropertyType } from './constants.types';

export interface IDefaultProps {
  children?: ReactElement | ReactNode | ReactElement[];
}

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

export interface IUserSlice {
  _id: string;
  email: string;
  username: string;
  password: string;
  role: 'client' | 'admin' | 'agent' | '';
}
