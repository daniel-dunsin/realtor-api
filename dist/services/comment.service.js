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
const article_model_1 = __importDefault(require("../models/article.model"));
const comment_model_1 = __importDefault(require("../models/comment.model"));
const addComment = (body) => __awaiter(void 0, void 0, void 0, function* () {
    if (!body.text || !body.article) {
        throw new responseHandlers_1.BadRequestError("Provide article and comment");
    }
    const article = yield article_model_1.default.findById(body.article);
    if (!article) {
        throw new responseHandlers_1.NotFoundError("Article does not exist");
    }
    const comment = yield comment_model_1.default.create({
        text: body.text,
        article: body.article,
        writer: body.writer,
    });
    article.comments += 1;
    yield article.save();
    return comment;
});
const getArticleComments = (article_id) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield comment_model_1.default.find({ article: article_id })
        .populate("article")
        .populate("writer");
    if (!comments || comments.length === 0) {
        throw new responseHandlers_1.NotFoundError("This article has no comment");
    }
    return comments;
});
const deleteComment = (id, viewer) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_model_1.default.findOneAndDelete({ _id: id, writer: viewer });
    if (!comment) {
        throw new responseHandlers_1.NotFoundError("This comment does not exist or wasn't created by you");
    }
});
const editComment = (id, viewer, text) => __awaiter(void 0, void 0, void 0, function* () {
    if (!text) {
        throw new responseHandlers_1.BadRequestError("Provide text");
    }
    const comment = yield comment_model_1.default.findOneAndUpdate({ _id: id, writer: viewer }, { text }, { new: true, runValidators: true });
    if (!comment) {
        throw new responseHandlers_1.NotFoundError("This comment does not exist or wasn't created by you");
    }
    return comment;
});
const commentService = {
    addComment,
    getArticleComments,
    deleteComment,
    editComment,
};
exports.default = commentService;
