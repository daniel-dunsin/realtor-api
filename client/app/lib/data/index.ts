import {
  IAmenities,
  IPropertyType,
  IOffer,
  ISizeSuffix,
} from '../interfaces/constants.types';

export const propertyTypes: IPropertyType[] = [
  'Apartment',
  'Bungalow',
  'Condo',
  'House',
  'Land',
  'Single Family',
];

export const amenitiesList: IAmenities[] = [
  'Air Conditioning',
  'Barbeque',
  'Dryer',
  'Gym',
  'Laundry',
  'Lawn',
  'Microwave',
  'Outodoor Shower',
  'Refrigerator',
  'Sauna',
  'Swimming Pool',
  'TV Cable',
  'Washer',
  'Wi-fi',
  'Window Coverings',
];

export const propertyStatus: IOffer[] = ['Sale', 'Rent'];

export const sizeSuffix: ISizeSuffix[] = ['sq. m', 'acre'];
