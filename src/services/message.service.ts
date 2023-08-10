/**
 * @logic - When they send the on message event, emit it into each user room
 *
 */

import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../handlers/responseHandlers";
import { IChat, IMessage } from "../interfaces/schema/message.schema";
import { ISendMessageBody } from "../interfaces/services/message.body";
import Chat from "../models/chat.model";
import Message from "../models/message.model";
import User from "../models/user.model";
import { getUser } from "./auth.service";

const getChatById = async (id: string): Promise<IChat> => {
  const chat = await Chat.findById(id)
    .populate("users")
    .populate("latestMessage");

  if (!chat) {
    throw new NotFoundError("Chat does not exist");
  }

  return chat;
};

const createConversation = async (users: string[]): Promise<IChat> => {
  if (users.length !== 2 || !users[0] || !users[1]) {
    throw new ForbiddenError("Provide only 2 users");
  }

  if (users[0].toString() === users[1].toString()) {
    throw new ForbiddenError("You can not create a chat with yourself");
  }

  const user1 = await getUser(users[0]);

  if (!user1) throw new ForbiddenError(`${users[0]} is not a user`);

  const user2 = await getUser(users[1]);

  if (!user2) throw new ForbiddenError(`${users[1]} is not a user`);

  const xchat = await Chat.findOne({ users });

  if (xchat) {
    throw new BadRequestError("A chat between this users already exists");
  }

  const chat = await Chat.create({ users });

  return chat;
};

const getAllChats = async (user: string): Promise<IChat[]> => {
  const chats = await Chat.find({ users: user })
    .populate("users")
    .populate("latestMessage")
    .sort("-updatedAt");

  if (!chats || chats.length === 0) {
    throw new NotFoundError("You do not belong to any chat room");
  }

  return chats;
};

//messages
const sendMessage = async (props: ISendMessageBody): Promise<IMessage> => {
  const { text, images, chat, sender } = props;

  if (!text || !chat || !sender)
    throw new BadRequestError("Provide text, chat, sender, receiver");

  const xsender = await getUser(sender);

  if (!xsender) throw new NotFoundError("sender info not founder");

  const xchat = await Chat.findById(chat).populate("users");

  if (!xchat) throw new NotFoundError("chat does not exist");

  const receiver = xchat.users.find(
    (user) => user._id.toString() !== xsender._id.toString()
  );

  let message = await Message.create({
    text,
    chat,
    sender: xsender._id,
    receiver,
    images,
    xhat: xchat._id,
  });

  message = await message
    .populate("sender")
    .then((message) => message.populate("receiver"))
    .then((message) => message.populate("chat"));

  xchat.latestMessage = message._id;

  await xchat.save();

  return message;
};

const deleteMessage = async (user: string, id: string): Promise<void> => {
  const message = await Message.findOneAndDelete({ sender: user, _id: id });

  if (!message)
    throw new NotFoundError("Message does not exist or was not sent by you");
  const chat = await Chat.findById(message.chat);

  if (!chat) {
    throw new NotFoundError("Chat does not exist");
  }

  const allMessages = await getChatMessages(message.chat.toString());

  chat.latestMessage = allMessages[allMessages.length - 1];

  await chat.save();
};

const getChatMessages = async (id: string) => {
  const chat = await getChatById(id);

  if (!chat) throw new NotFoundError("Chat does not exist");

  const messages = await Message.find({ chat: id })
    .sort("createdAt")
    .populate("sender")
    .populate("receiver")
    .populate("chat");

  if (!messages || messages.length === 0) {
    throw new NotFoundError("This chat has no message");
  }

  return messages;
};

const getMessageById = async (id: string): Promise<IMessage> => {
  const message = await Message.findById(id);

  if (!message) {
    throw new NotFoundError("Message not found");
  }

  return message;
};

const editMessage = async (
  user: string,
  text: string,
  id: string
): Promise<IMessage> => {
  if (!text) {
    throw new BadRequestError("Provide Text");
  }

  const message = await Message.findOneAndUpdate(
    { _id: id, sender: user },
    { text: text },
    { new: true, runValidators: true }
  );

  if (!message) {
    throw new NotFoundError("Message does not exist or was not sent by you");
  }

  return message;
};

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

export default chatService;
