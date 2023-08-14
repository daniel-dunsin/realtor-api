"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = require("../middleware/isAuth");
const listing_controllers_1 = require("../controllers/listing.controllers");
const router = (0, express_1.Router)();
router.route("/property/:id").post(isAuth_1.isAuth, listing_controllers_1.addReview).get(listing_controllers_1.getPropertyReviews);
router
    .route("/:id")
    .put(isAuth_1.isAuth, listing_controllers_1.updatePropertyReview)
    .delete(isAuth_1.isAuth, listing_controllers_1.deletePropertyReview);
exports.default = router;
