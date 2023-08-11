import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import { isAgent } from "../middleware/isAgent";
import { getWalletInfo } from "../controllers/wallet.controllers";

const router = Router();

router.get("/", isAuth, isAgent, getWalletInfo);

export default router;
