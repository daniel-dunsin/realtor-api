import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import { isAgent } from "../middleware/isAgent";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getMyArticles,
  getSingleArticle,
  updateArticle,
} from "../controllers/article.controllers";

const router = Router();

router.route("/").get(getAllArticles);
router.route("/single/:id").get(getSingleArticle);

router
  .route("/agent")
  .get(isAuth, isAgent, getMyArticles)
  .post(isAuth, isAgent, createArticle);

router
  .route("/agent/:id")
  .delete(isAuth, isAgent, deleteArticle)
  .put(isAuth, isAgent, updateArticle);

export default router;
