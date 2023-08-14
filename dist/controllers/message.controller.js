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
exports.deleteMessage = exports.editMessage = exports.getChatMessages = exports.sendMessage = exports.getSingleChat = exports.getMyChats = exports.createChat = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const message_service_1 = __importDefault(require("../services/message.service"));
const cloudinary_config_1 = require("../config/cloudinary.config");
exports.createChat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { user } = req.body;
    const initiator = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const chat = yield message_service_1.default.createConversation([initiator, user]);
    res.status(201).json({ message: "Chat created successfully", data: chat });
}));
exports.getMyChats = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const chats = yield message_service_1.default.getAllChats(user);
    res
        .status(200)
        .json({ message: "Chats fetched successfully", data: chats });
}));
exports.getSingleChat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const chat = yield message_service_1.default.getChatById(req.params.id);
    res.status(200).json({ message: "Chat found successfully", data: chat });
}));
exports.sendMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { text } = req.body;
    const sender = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
    const chat = req.params.id;
    const imagesFile = req.files;
    let images = [];
    if ((imagesFile === null || imagesFile === void 0 ? void 0 : imagesFile.length) > 0) {
        images = yield Promise.all(imagesFile === null || imagesFile === void 0 ? void 0 : imagesFile.map((file, index) => __awaiter(void 0, void 0, void 0, function* () {
            const url = yield (0, cloudinary_config_1.uploadToCloud)(file.path);
            return url;
        })));
    }
    const response = yield message_service_1.default.sendMessage({
        sender,
        chat,
        text,
        images,
    });
    res
        .status(201)
        .json({ message: "Message sent successfully", data: response });
}));
exports.getChatMessages = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const chat = req.params.id;
    const response = yield message_service_1.default.getChatMessages(chat);
    res
        .status(200)
        .json({ message: "Messages fetched successfully", data: response });
}));
exports.editMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const id = req.params.id;
    const user = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
    const text = req.body.text;
    const response = yield message_service_1.default.editMessage(user, text, id);
    res
        .status(200)
        .json({ message: "Messages edited successfully", data: response });
}));
exports.deleteMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const user = (_e = req.user) === null || _e === void 0 ? void 0 : _e._id;
    const id = req.params.id;
    yield message_service_1.default.deleteMessage(user, id);
    res.status(200).json({ message: "Messages deleted successfully" });
}));
