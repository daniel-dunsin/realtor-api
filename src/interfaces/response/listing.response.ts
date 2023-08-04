import { IProperty } from "../schema/property.schema";

export interface ICreateListingRes {
  message: "Property listing created successully";
  property: IProperty;
}

export interface IGetListingsRes {
  page: number;
  hitsPerPage: number;
  properties: IProperty[];
}
