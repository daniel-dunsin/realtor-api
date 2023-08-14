import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import { isAgent } from "../middleware/isAgent";
import {
  compareProperties,
  createListing,
  deleteListing,
  getAllListings,
  getMyListings,
  getMyProperties,
  getSingleListing,
  sellMyProperty,
  updateListing,
} from "../controllers/listing.controllers";
import { uploader } from "../config/multer.config";
import { purchaseWithWallet } from "../controllers/wallet.controllers";

const router = Router();

router
  .route("/agent")
  .post(isAuth, isAgent, uploader.array("images"), createListing)
  .get(isAuth, isAgent, getMyListings);

router.route("/sell/:id").patch(isAuth, isAgent, sellMyProperty);

router
  .route("/agent/:id")
  .put(isAuth, isAgent, uploader.array("images"), updateListing)
  .delete(isAuth, isAgent, deleteListing);

router.route("/").get(getAllListings);

router.route("/properties").get(isAuth, getMyProperties);

router.route("/:id").get(getSingleListing);

router.route("/compare").post(compareProperties);

// payment
router.post("/buy/wallet/property/:id", isAuth, isAgent, purchaseWithWallet);

export default router;
