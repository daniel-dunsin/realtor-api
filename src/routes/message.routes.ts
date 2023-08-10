import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import {
  deleteMessage,
  editMessage,
  getChatMessages,
  sendMessage,
} from "../controllers/message.controller";
import { uploader } from "../config/multer.config";

const router = Router();

router
  .route("/chat/:id")
  .post(isAuth, uploader.array("images"), sendMessage)
  .get(isAuth, getChatMessages);

router.route("/:id").patch(isAuth, editMessage).delete(isAuth, deleteMessage);

export default router;
