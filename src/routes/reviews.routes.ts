import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import {
  addReview,
  deletePropertyReview,
  getPropertyReviews,
  updatePropertyReview,
} from "../controllers/listing.controllers";

const router = Router();

router.route("/property/:id").post(isAuth, addReview).get(getPropertyReviews);

router
  .route("/:id")
  .put(isAuth, updatePropertyReview)
  .delete(isAuth, deletePropertyReview);

export default router;
