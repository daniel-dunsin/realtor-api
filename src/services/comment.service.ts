import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../handlers/responseHandlers";
import { IArticleComment } from "../interfaces/schema/comment.schema";
import { ICreateArticleCommentBody } from "../interfaces/services/article.body";
import Agent from "../models/agent.model";
import Article from "../models/article.model";
import Comment from "../models/comment.model";

const addComment = async (
  body: ICreateArticleCommentBody
): Promise<IArticleComment> => {
  if (!body.text || !body.article) {
    throw new BadRequestError("Provide article and comment");
  }

  const article = await Article.findById(body.article);

  if (!article) {
    throw new NotFoundError("Article does not exist");
  }

  const comment = await Comment.create({
    text: body.text,
    article: body.article,
    writer: body.writer,
  });

  article.comments += 1;

  await article.save();

  return comment;
};
const getArticleComments = async (
  article_id: string
): Promise<IArticleComment[]> => {
  const comments = await Comment.find({ article: article_id })
    .populate("article")
    .populate("writer");

  if (!comments || comments.length === 0) {
    throw new NotFoundError("This article has no comment");
  }

  return comments;
};

const deleteComment = async (id: string, viewer: string): Promise<void> => {
  const comment = await Comment.findOneAndDelete({ _id: id, writer: viewer });

  if (!comment) {
    throw new NotFoundError(
      "This comment does not exist or wasn't created by you"
    );
  }
};
const editComment = async (
  id: string,
  viewer: string,
  text: string
): Promise<IArticleComment> => {
  if (!text) {
    throw new BadRequestError("Provide text");
  }

  const comment = await Comment.findOneAndUpdate(
    { _id: id, writer: viewer },
    { text },
    { new: true, runValidators: true }
  );

  if (!comment) {
    throw new NotFoundError(
      "This comment does not exist or wasn't created by you"
    );
  }

  return comment;
};

const commentService = {
  addComment,
  getArticleComments,
  deleteComment,
  editComment,
};

export default commentService;
