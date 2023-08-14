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
const socket_io_1 = require("socket.io");
const message_service_1 = __importDefault(require("./message.service"));
const socketImplementation = (server) => {
    const io = new socket_io_1.Server(server);
    io.on("connection", (socket) => {
        console.log("Socket connected ✨");
        // create a personal room for the user
        socket.on("auth user", (userId) => {
            socket.join(userId);
            console.log(`User ${userId} authenticated`);
        });
        socket.on("join chat", (chatId) => {
            socket.join(chatId);
            console.log(`User joined ${chatId} chat`);
        });
        socket.on("send message", (messageId) => __awaiter(void 0, void 0, void 0, function* () {
            const message = yield message_service_1.default.getMessageById(messageId);
            const chat = yield message_service_1.default.getChatById(message === null || message === void 0 ? void 0 : message.chat);
            chat.users.forEach((user) => {
                if (user._id.toString() !== message.sender.toString()) {
                    socket.in(user._id.toString()).emit("new message", message);
                }
            });
        }));
    });
};
exports.default = socketImplementation;
