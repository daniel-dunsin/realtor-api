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
const responseHandlers_1 = require("../handlers/responseHandlers");
const paginate_1 = require("../helpers/paginate");
const article_model_1 = __importDefault(require("../models/article.model"));
const createArticle = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body: article_body, category, author, tags } = body;
    if (!title || !article_body || !category || !author) {
        throw new responseHandlers_1.BadRequestError("Provide article title, body, category and author");
    }
    const article = yield article_model_1.default.create({
        title: title,
        body: article_body,
        category: category,
        author: author,
        tags: tags,
    });
    return article;
});
const getAllArticles = (page, hits, query) => __awaiter(void 0, void 0, void 0, function* () {
    const articles = article_model_1.default.find(query).populate("author");
    const result = yield (0, paginate_1.paginate)(page, hits, articles);
    return {
        page: result.page,
        hitsPerPage: result.hitsPerPage,
        articles: result.result,
    };
});
const getMyArticles = (page, hits, author, query) => __awaiter(void 0, void 0, void 0, function* () {
    const articles = article_model_1.default.find(Object.assign(Object.assign({}, query), { author })).populate("author");
    const result = yield (0, paginate_1.paginate)(page, hits, articles);
    return {
        page: result.page,
        hitsPerPage: result.hitsPerPage,
        articles: result.result,
    };
});
const getSingleArticle = (viewer, id) => __awaiter(void 0, void 0, void 0, function* () {
    const article = yield article_model_1.default.findById(id).populate("author");
    if (!article) {
        throw new responseHandlers_1.NotFoundError("Article does not exist");
    }
    if ((article === null || article === void 0 ? void 0 : article.author)._id !== viewer) {
        article.views += 1;
        yield (article === null || article === void 0 ? void 0 : article.save());
    }
    return article;
});
const deleteArticle = (author, _id) => __awaiter(void 0, void 0, void 0, function* () {
    const article = yield article_model_1.default.findOneAndDelete({ author, _id });
    if (!article) {
        throw new responseHandlers_1.NotFoundError("Article does not exist or does not belong to you");
    }
});
const updateArticle = (_id, author, body) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body: article_body, category, tags } = body;
    if (!title || !article_body || !category || !tags) {
        throw new responseHandlers_1.BadRequestError("Provide article title, body, category and author");
    }
    const article = yield article_model_1.default.findOneAndUpdate({ _id, author }, { title, body: article_body, category, tags }, { new: true, runValidators: true });
    if (!article) {
        throw new responseHandlers_1.NotFoundError("Article does not exist or does not belong to you");
    }
    return article;
});
const articleService = {
    createArticle,
    getAllArticles,
    getMyArticles,
    getSingleArticle,
    deleteArticle,
    updateArticle,
};
exports.default = articleService;
