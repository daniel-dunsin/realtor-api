import { BadRequestError, NotFoundError } from "../handlers/responseHandlers";
import { paginate } from "../helpers/paginate";
import { IGetArticlesRes } from "../interfaces/response/article.response";
import { IAgent } from "../interfaces/schema/agent.schema";
import { IArticle } from "../interfaces/schema/article.schema";
import { ICreateArticleBody } from "../interfaces/services/article.body";
import Article from "../models/article.model";

const createArticle = async (body: ICreateArticleBody): Promise<IArticle> => {
  const { title, body: article_body, category, author, tags } = body;

  if (!title || !article_body || !category || !author) {
    throw new BadRequestError(
      "Provide article title, body, category and author"
    );
  }

  const article = await Article.create({
    title: title,
    body: article_body,
    category: category,
    author: author,
    tags: tags,
  });

  return article;
};

const getAllArticles = async (
  page: string,
  hits: string,
  query: Object
): Promise<IGetArticlesRes> => {
  const articles = Article.find(query).populate("author");

  const result = await paginate(page, hits, articles);

  return {
    page: result.page,
    hitsPerPage: result.hitsPerPage,
    articles: result.result,
  };
};

const getMyArticles = async (
  page: string,
  hits: string,
  author: string,
  query: Object
): Promise<IGetArticlesRes> => {
  const articles = Article.find({ ...query, author }).populate("author");

  const result = await paginate(page, hits, articles);

  return {
    page: result.page,
    hitsPerPage: result.hitsPerPage,
    articles: result.result,
  };
};

const getSingleArticle = async (
  viewer: string,
  id: string
): Promise<IArticle> => {
  const article = await Article.findById(id).populate("author");

  if (!article) {
    throw new NotFoundError("Article does not exist");
  }

  if ((article?.author as IAgent)._id !== viewer) {
    article.views += 1;
    await article?.save();
  }

  return article;
};

const deleteArticle = async (author: string, _id: string): Promise<void> => {
  const article = await Article.findOneAndDelete({ author, _id });

  if (!article) {
    throw new NotFoundError("Article does not exist or does not belong to you");
  }
};

const updateArticle = async (
  _id: string,
  author: string,
  body: ICreateArticleBody
): Promise<IArticle> => {
  const { title, body: article_body, category, tags } = body;

  if (!title || !article_body || !category || !tags) {
    throw new BadRequestError(
      "Provide article title, body, category and author"
    );
  }

  const article = await Article.findOneAndUpdate(
    { _id, author },
    { title, body: article_body, category, tags },
    { new: true, runValidators: true }
  );

  if (!article) {
    throw new NotFoundError("Article does not exist or does not belong to you");
  }

  return article;
};

const articleService = {
  createArticle,
  getAllArticles,
  getMyArticles,
  getSingleArticle,
  deleteArticle,
  updateArticle,
};

export default articleService;
