import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import {
  createChat,
  getMyChats,
  getSingleChat,
} from "../controllers/message.controller";

const router = Router();

router.route("/").post(isAuth, createChat).get(isAuth, getMyChats);

router.route("/:id").get(isAuth, getSingleChat);

export default router;
