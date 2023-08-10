import { Server as HTTPServer } from "http";
import Socketio, { Server, Socket } from "socket.io";
import chatService from "./message.service";

const socketImplementation = (server: HTTPServer) => {
  const io = new Server(server);

  io.on("connection", (socket: Socket) => {
    console.log("Socket connected ✨");

    // create a personal room for the user
    socket.on("auth user", (userId: string) => {
      socket.join(userId);
      console.log(`User ${userId} authenticated`);
    });

    socket.on("join chat", (chatId: string) => {
      socket.join(chatId);
      console.log(`User joined ${chatId} chat`);
    });

    socket.on("send message", async (messageId: string) => {
      const message = await chatService.getMessageById(messageId);

      const chat = await chatService.getChatById(message?.chat as string);

      chat.users.forEach((user) => {
        if (user._id.toString() !== message.sender.toString()) {
          socket.in(user._id.toString()).emit("new message", message);
        }
      });
    });
  });
};

export default socketImplementation;
