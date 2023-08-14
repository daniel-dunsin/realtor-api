"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editComment = exports.deleteComment = exports.getArticleComments = exports.addComment = exports.getSingleArticle = exports.getAllArticles = exports.updateArticle = exports.deleteArticle = exports.getMyArticles = exports.createArticle = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const agent_service_1 = __importDefault(require("../services/agent.service"));
const article_service_1 = __importDefault(require("../services/article.service"));
const comment_service_1 = __importDefault(require("../services/comment.service"));
// ==== agent requests
exports.createArticle = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, body, category, tags } = req.body;
    const author = yield agent_service_1.default.getProfile((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    const article = yield article_service_1.default.createArticle({
        title,
        body,
        category,
        tags,
        author: author._id,
    });
    res
        .status(201)
        .json({ message: "Article Created Successfully", data: article });
}));
exports.getMyArticles = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const author = yield agent_service_1.default.getProfile((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id);
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
    const articles = yield article_service_1.default.getMyArticles(page, hitsPerPage, author._id, query);
    res.status(200).json({
        message: "Articles fetched successfully",
        data: articles.articles,
        page: articles.page,
        hitsPerPage: articles.hitsPerPage,
    });
}));
exports.deleteArticle = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = req.params.id;
    const user = yield agent_service_1.default.getProfile((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id);
    yield article_service_1.default.deleteArticle(user._id, id);
    res.status(200).json({ message: "Article deleted successfully" });
}));
exports.updateArticle = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const id = req.params.id;
    const owner = yield agent_service_1.default.getProfile((_d = req.user) === null || _d === void 0 ? void 0 : _d._id);
    const { title, body, category, tags } = req.body;
    const article = yield article_service_1.default.updateArticle(id, owner._id, { title, body, category, tags });
    res.status(200).json({ message: "Article Updated Successfully", article });
}));
// === public
exports.getAllArticles = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    const articles = yield article_service_1.default.getAllArticles(page, hitsPerPage, query);
    res.status(200).json({
        message: "Articles fetched successfully",
        data: articles.articles,
        page: articles.page,
        hitsPerPage: articles.hitsPerPage,
    });
}));
exports.getSingleArticle = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const viewer = (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e._id;
    const id = req.params.id;
    const article = yield article_service_1.default.getSingleArticle(viewer, id);
    res
        .status(200)
        .json({ message: "Article fetched successfully", data: article });
}));
// ======================== ARTICLE COMMENTS
exports.addComment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const { id } = req.params;
    const owner = (_f = req.user) === null || _f === void 0 ? void 0 : _f._id;
    const text = req.body.text;
    const response = yield comment_service_1.default.addComment({
        text,
        article: id,
        writer: owner,
    });
    res
        .status(201)
        .json({ message: "Comment Added successfully", data: response });
}));
exports.getArticleComments = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield comment_service_1.default.getArticleComments(id);
    res
        .status(201)
        .json({ message: "Comments fetched successfully", data: response });
}));
exports.deleteComment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const { id } = req.params;
    const writer = (_g = req.user) === null || _g === void 0 ? void 0 : _g._id;
    yield comment_service_1.default.deleteComment(id, writer);
    res.status(200).json({ message: "Comment Deleted Successfully" });
}));
exports.editComment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    const { id } = req.params;
    const writer = (_h = req.user) === null || _h === void 0 ? void 0 : _h._id;
    const text = req.body.text;
    const response = yield comment_service_1.default.editComment(id, writer, text);
    res
        .status(200)
        .json({ message: "Comment editied Successfully", data: response });
}));
