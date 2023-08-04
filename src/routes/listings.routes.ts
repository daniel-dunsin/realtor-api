import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import { isAgent } from "../middleware/isAgent";
import {
  createListing,
  getAllListings,
  getMyListings,
  updateListing,
} from "../controllers/listing.controllers";
import { uploader } from "../config/multer.config";

const router = Router();

router
  .route("/agent")
  .post(isAuth, isAgent, uploader.array("images"), createListing)
  .get(isAuth, isAgent, getMyListings);

router
  .route("/agent/:id")
  .put(isAuth, isAgent, uploader.array("images"), updateListing);

router.route("/").get(getAllListings);

export default router;
