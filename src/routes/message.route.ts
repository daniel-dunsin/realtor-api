import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import {
  deleteMessage,
  editMessage,
  getChatMessages,
  sendMessage,
} from "../controllers/message.controller";

const router = Router();

router
  .route("/chat/:id")
  .post(isAuth, sendMessage)
  .get(isAuth, getChatMessages);

router.route("/:id").patch(isAuth, editMessage).delete(isAuth, deleteMessage);

export default router;
