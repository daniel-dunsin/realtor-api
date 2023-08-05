import expressAsyncHandler from "express-async-handler";
import { IRequest } from "../interfaces/IRequest";
import { NextFunction, Request, Response } from "express";
import agentService from "../services/agent.service";
import articleService from "../services/article.service";
import commentService from "../services/comment.service";

// ==== agent requests
export const createArticle = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { title, body, category, tags } = req.body;
    const author = await agentService.getProfile(req.user?._id);

    const article = await articleService.createArticle({
      title,
      body,
      category,
      tags,
      author: author._id as string,
    });

    res
      .status(201)
      .json({ message: "Article Created Successfully", data: article });
  }
);

export const getMyArticles = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const author = await agentService.getProfile(req?.user?._id as string);
    const { page, hitsPerPage, search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { body: { $regex: search, $options: "i" } },
        ],
      };
    }

    const articles = await articleService.getMyArticles(
      page as string,
      hitsPerPage as string,
      author._id as string,
      query
    );

    res.status(200).json({
      message: "Articles fetched successfully",
      data: articles.articles,
      page: articles.page,
      hitsPerPage: articles.hitsPerPage,
    });
  }
);

export const deleteArticle = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await agentService.getProfile(req?.user?._id as string);

    await articleService.deleteArticle(user._id as string, id);

    res.status(200).json({ message: "Article deleted successfully" });
  }
);

export const updateArticle = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const owner = await agentService.getProfile(req.user?._id as string);
    const { title, body, category, tags } = req.body;

    const article = await articleService.updateArticle(
      id as string,
      owner._id as string,
      { title, body, category, tags }
    );

    res.status(200).json({ message: "Article Updated Successfully", article });
  }
);

// === public
export const getAllArticles = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { search, page, hitsPerPage } = req.query;

    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { body: { $regex: search, $options: "i" } },
        ],
      };
    }

    const articles = await articleService.getAllArticles(
      page as string,
      hitsPerPage as string,
      query
    );

    res.status(200).json({
      message: "Articles fetched successfully",
      data: articles.articles,
      page: articles.page,
      hitsPerPage: articles.hitsPerPage,
    });
  }
);

export const getSingleArticle = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const viewer = req?.user?._id;
    const id = req.params.id;

    const article = await articleService.getSingleArticle(viewer as string, id);

    res
      .status(200)
      .json({ message: "Article fetched successfully", data: article });
  }
);

// ======================== ARTICLE COMMENTS

export const addComment = expressAsyncHandler(
  async (req: IRequest, res: Response) => {
    const { id } = req.params;
    const owner = req.user?._id;
    const text = req.body.text;

    const response = await commentService.addComment({
      text,
      article: id,
      writer: owner as string,
    });

    res
      .status(201)
      .json({ message: "Comment Added successfully", data: response });
  }
);

export const getArticleComments = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await commentService.getArticleComments(id);

    res
      .status(201)
      .json({ message: "Comments fetched successfully", data: response });
  }
);

export const deleteComment = expressAsyncHandler(
  async (req: IRequest, res: Response) => {
    const { id } = req.params;

    const writer = req.user?._id;

    await commentService.deleteComment(id, writer as string);

    res.status(200).json({ message: "Comment Deleted Successfully" });
  }
);

export const editComment = expressAsyncHandler(
  async (req: IRequest, res: Response) => {
    const { id } = req.params;
    const writer = req.user?._id;
    const text = req.body.text;

    const response = await commentService.editComment(
      id,
      writer as string,
      text
    );

    res
      .status(200)
      .json({ message: "Comment editied Successfully", data: response });
  }
);
