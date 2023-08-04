import { Document } from "mongoose";

export interface IPaginatRes {
  page: number;
  hitsPerPage: number;
  result: any[];
}
