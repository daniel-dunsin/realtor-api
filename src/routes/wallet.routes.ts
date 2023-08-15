import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import { isAgent } from "../middleware/isAgent";
import {
  getAllBanks,
  getWalletInfo,
  handlePaystackWebhook,
  initiateWithdrawal,
  validateAccountDetails,
} from "../controllers/wallet.controllers";

const router = Router();

router.get("/", isAuth, isAgent, getWalletInfo);

router.post("/webhook", handlePaystackWebhook);

router.get("/bank", isAuth, isAgent, getAllBanks);

router.post("/account/validate", isAuth, isAgent, validateAccountDetails);

router.post("/withdraw", isAuth, isAgent, initiateWithdrawal);

export default router;
