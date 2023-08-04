import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import {
  addComment,
  deleteComment,
  editComment,
  getArticleComments,
} from "../controllers/comments.controllers";

const router = Router();

router.route("/article/:id").post(isAuth, addComment).get(getArticleComments);

router.route("/:id").delete(isAuth, deleteComment).patch(isAuth, editComment);

export default router;
