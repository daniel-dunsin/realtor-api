import { Router } from "express";
import { uploader } from "../config/multer.config";
import {
  createAgent,
  updateAgentProfile,
  getProfile,
} from "../controllers/agent.controllers";
import { isAgent } from "../middleware/isAgent";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router
  .route("/")
  .get(isAuth, isAgent, getProfile)
  .post(isAuth, createAgent)
  .patch(isAuth, isAgent, uploader.single("image"), updateAgentProfile);

export default router;
