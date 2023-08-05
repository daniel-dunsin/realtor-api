import expressAsyncHandler from "express-async-handler";
import { IRequest } from "../interfaces/IRequest";
import { NextFunction, Response } from "express";
import chatService from "../services/message.service";

export const createChat = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { user } = req.body;

    const initiator = req.user?._id;

    const chat = await chatService.createConversation([initiator, user]);

    res.status(201).json({ message: "Chat created successfully", data: chat });
  }
);

export const getMyChats = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const user = req.user?._id as string;

    const chats = await chatService.getAllChats(user);

    res
      .status(200)
      .json({ message: "Chats fetched successfully", data: chats });
  }
);

export const getSingleChat = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const chat = await chatService.getChatById(req.params.id);

    res.status(200).json({ message: "Chat found successfully", data: chat });
  }
);

export const sendMessage = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { text } = req.body;
    const sender = req.user?._id as string;
    const chat = req.params.id;

    const response = await chatService.sendMessage({ sender, chat, text });

    res
      .status(201)
      .json({ message: "Message sent successfully", data: response });
  }
);

export const getChatMessages = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const chat = req.params.id;

    const response = await chatService.getChatMessages(chat);

    res
      .status(200)
      .json({ message: "Messages fetched successfully", data: response });
  }
);

export const editMessage = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = req.user?._id as string;
    const text = req.body.text;

    const response = await chatService.editMessage(user, text, id);

    res
      .status(200)
      .json({ message: "Messages edited successfully", data: response });
  }
);

export const deleteMessage = expressAsyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const user = req.user?._id as string;
    const id = req.params.id;

    await chatService.deleteMessage(user, id);

    res.status(200).json({ message: "Messages deleted successfully" });
  }
);
