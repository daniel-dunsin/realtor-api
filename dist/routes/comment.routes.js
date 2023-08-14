"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = require("../middleware/isAuth");
const article_controllers_1 = require("../controllers/article.controllers");
const router = (0, express_1.Router)();
router.route("/article/:id").post(isAuth_1.isAuth, article_controllers_1.addComment).get(article_controllers_1.getArticleComments);
router.route("/:id").delete(isAuth_1.isAuth, article_controllers_1.deleteComment).patch(isAuth_1.isAuth, article_controllers_1.editComment);
exports.default = router;
