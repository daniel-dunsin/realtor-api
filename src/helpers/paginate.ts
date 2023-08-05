import { Models, Query } from "mongoose";
import { IPaginatRes } from "../interfaces/IPaginate";

export const paginate = async (
  page: number | string,
  hits: string | number,
  model: Query<any, any, any>
): Promise<IPaginatRes> => {
  page = parseInt(page as string) || 1;
  hits = parseInt(hits as string) || 10;

  const result = await model.limit(hits).skip((page - 1) * hits);

  return { page, hitsPerPage: hits, result };
};
