import { IArticle } from "../schema/article.schema";

export interface IGetArticlesRes {
  page: number;
  hitsPerPage: number;
  articles: IArticle[];
}
