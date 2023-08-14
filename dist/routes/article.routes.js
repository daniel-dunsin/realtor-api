"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = require("../middleware/isAuth");
const isAgent_1 = require("../middleware/isAgent");
const article_controllers_1 = require("../controllers/article.controllers");
const router = (0, express_1.Router)();
router.route("/").get(article_controllers_1.getAllArticles);
router.route("/single/:id").get(article_controllers_1.getSingleArticle);
router
    .route("/agent")
    .get(isAuth_1.isAuth, isAgent_1.isAgent, article_controllers_1.getMyArticles)
    .post(isAuth_1.isAuth, isAgent_1.isAgent, article_controllers_1.createArticle);
router
    .route("/agent/:id")
    .delete(isAuth_1.isAuth, isAgent_1.isAgent, article_controllers_1.deleteArticle)
    .put(isAuth_1.isAuth, isAgent_1.isAgent, article_controllers_1.updateArticle);
exports.default = router;
