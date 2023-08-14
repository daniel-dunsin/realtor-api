"use strict";
/**
 * @logic - When they send the on message event, emit it into each user room
 *
 */
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
const chat_model_1 = __importDefault(require("../models/chat.model"));
const message_model_1 = __importDefault(require("../models/message.model"));
const auth_service_1 = require("./auth.service");
const getChatById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const chat = yield chat_model_1.default.findById(id)
        .populate("users")
        .populate("latestMessage");
    if (!chat) {
        throw new responseHandlers_1.NotFoundError("Chat does not exist");
    }
    return chat;
});
const createConversation = (users) => __awaiter(void 0, void 0, void 0, function* () {
    if (users.length !== 2 || !users[0] || !users[1]) {
        throw new responseHandlers_1.ForbiddenError("Provide only 2 users");
    }
    if (users[0].toString() === users[1].toString()) {
        throw new responseHandlers_1.ForbiddenError("You can not create a chat with yourself");
    }
    const user1 = yield (0, auth_service_1.getUser)(users[0]);
    if (!user1)
        throw new responseHandlers_1.ForbiddenError(`${users[0]} is not a user`);
    const user2 = yield (0, auth_service_1.getUser)(users[1]);
    if (!user2)
        throw new responseHandlers_1.ForbiddenError(`${users[1]} is not a user`);
    const xchat = yield chat_model_1.default.findOne({ users });
    if (xchat) {
        throw new responseHandlers_1.BadRequestError("A chat between this users already exists");
    }
    const chat = yield chat_model_1.default.create({ users });
    return chat;
});
const getAllChats = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield chat_model_1.default.find({ users: user })
        .populate("users")
        .populate("latestMessage")
        .sort("-updatedAt");
    if (!chats || chats.length === 0) {
        throw new responseHandlers_1.NotFoundError("You do not belong to any chat room");
    }
    return chats;
});
//messages
const sendMessage = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, images, chat, sender } = props;
    if (!text || !chat || !sender)
        throw new responseHandlers_1.BadRequestError("Provide text, chat, sender, receiver");
    const xsender = yield (0, auth_service_1.getUser)(sender);
    if (!xsender)
        throw new responseHandlers_1.NotFoundError("sender info not founder");
    const xchat = yield chat_model_1.default.findById(chat).populate("users");
    if (!xchat)
        throw new responseHandlers_1.NotFoundError("chat does not exist");
    const receiver = xchat.users.find((user) => user._id.toString() !== xsender._id.toString());
    let message = yield message_model_1.default.create({
        text,
        chat,
        sender: xsender._id,
        receiver,
        images,
        xhat: xchat._id,
    });
    message = yield message
        .populate("sender")
        .then((message) => message.populate("receiver"))
        .then((message) => message.populate("chat"));
    xchat.latestMessage = message._id;
    yield xchat.save();
    return message;
});
const deleteMessage = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield message_model_1.default.findOneAndDelete({ sender: user, _id: id });
    if (!message)
        throw new responseHandlers_1.NotFoundError("Message does not exist or was not sent by you");
    const chat = yield chat_model_1.default.findById(message.chat);
    if (!chat) {
        throw new responseHandlers_1.NotFoundError("Chat does not exist");
    }
    const allMessages = yield getChatMessages(message.chat.toString());
    chat.latestMessage = allMessages[allMessages.length - 1];
    yield chat.save();
});
const getChatMessages = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const chat = yield getChatById(id);
    if (!chat)
        throw new responseHandlers_1.NotFoundError("Chat does not exist");
    const messages = yield message_model_1.default.find({ chat: id })
        .sort("createdAt")
        .populate("sender")
        .populate("receiver")
        .populate("chat");
    if (!messages || messages.length === 0) {
        throw new responseHandlers_1.NotFoundError("This chat has no message");
    }
    return messages;
});
const getMessageById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield message_model_1.default.findById(id);
    if (!message) {
        throw new responseHandlers_1.NotFoundError("Message not found");
    }
    return message;
});
const editMessage = (user, text, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!text) {
        throw new responseHandlers_1.BadRequestError("Provide Text");
    }
    const message = yield message_model_1.default.findOneAndUpdate({ _id: id, sender: user }, { text: text }, { new: true, runValidators: true });
    if (!message) {
        throw new responseHandlers_1.NotFoundError("Message does not exist or was not sent by you");
    }
    return message;
});
const chatService = {
    createConversation,
    getChatById,
    getAllChats,
    sendMessage,
    deleteMessage,
    getMessageById,
    getChatMessages,
    editMessage,
};
exports.default = chatService;
