import { IArticleCategory } from "../constant";

export interface ICreateArticleBody {
  title: string;
  category: IArticleCategory;
  body: string;
  author?: string;
  tags: string[];
}
