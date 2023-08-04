import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import { isAgent } from "../middleware/isAgent";
import {
  createListing,
  deleteListing,
  getAllListings,
  getMyListings,
  getSingleListing,
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
  .put(isAuth, isAgent, uploader.array("images"), updateListing)
  .delete(isAuth, isAgent, deleteListing);

router.route("/").get(getAllListings);

router.route("/:id").get(getSingleListing);

export default router;
