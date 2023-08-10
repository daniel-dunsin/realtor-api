import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import { isAgent } from "../middleware/isAgent";
import {
  createBidding,
  deleteBidding,
  editBiddingStatus,
  getPropertyBiddings,
  getReceivedBiddings,
  getSentOutBiddings,
} from "../controllers/bidding.controllers";

const router = Router();

router
  .route("/property/:id")
  .get(isAuth, isAgent, getPropertyBiddings)
  .post(isAuth, createBidding);

router.get("/received/property/:id", isAuth, isAgent, getReceivedBiddings);

// for any user
router.get("/sent/property/:id", isAuth, getSentOutBiddings);

router
  .route("/:id")
  .delete(isAuth, deleteBidding)
  .patch(isAuth, isAgent, editBiddingStatus);

export default router;
