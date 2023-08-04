import expressAsyncHandler from "express-async-handler";
import { IRequest } from "../interfaces/IRequest";
import { Request, Response } from "express";
import commentService from "../services/comment.service";

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
