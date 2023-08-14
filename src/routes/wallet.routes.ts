import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import { isAgent } from "../middleware/isAgent";
import {
  getWalletInfo,
  handlePaystackWebhook,
} from "../controllers/wallet.controllers";

const router = Router();

router.get("/", isAuth, isAgent, getWalletInfo);

router.post("/webhook", handlePaystackWebhook);

export default router;
