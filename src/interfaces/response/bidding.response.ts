import { IBidding } from "../schema/bidding.schema";

export interface IBiddingRes {
  page: number;
  hitsPerPage: number;
  biddings: IBidding[];
}
