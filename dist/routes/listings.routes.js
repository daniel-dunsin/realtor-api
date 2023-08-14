"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = require("../middleware/isAuth");
const isAgent_1 = require("../middleware/isAgent");
const listing_controllers_1 = require("../controllers/listing.controllers");
const multer_config_1 = require("../config/multer.config");
const wallet_controllers_1 = require("../controllers/wallet.controllers");
const router = (0, express_1.Router)();
router
    .route("/agent")
    .post(isAuth_1.isAuth, isAgent_1.isAgent, multer_config_1.uploader.array("images"), listing_controllers_1.createListing)
    .get(isAuth_1.isAuth, isAgent_1.isAgent, listing_controllers_1.getMyListings);
router.route("/sell/:id").patch(isAuth_1.isAuth, isAgent_1.isAgent, listing_controllers_1.sellMyProperty);
router
    .route("/agent/:id")
    .put(isAuth_1.isAuth, isAgent_1.isAgent, multer_config_1.uploader.array("images"), listing_controllers_1.updateListing)
    .delete(isAuth_1.isAuth, isAgent_1.isAgent, listing_controllers_1.deleteListing);
router.route("/").get(listing_controllers_1.getAllListings);
router.route("/properties").get(isAuth_1.isAuth, listing_controllers_1.getMyProperties);
router.route("/:id").get(listing_controllers_1.getSingleListing);
router.route("/compare").post(listing_controllers_1.compareProperties);
// payment
router.post("/buy/wallet/property/:id", isAuth_1.isAuth, isAgent_1.isAgent, wallet_controllers_1.purchaseWithWallet);
router.post("/buy/transfer/property/:id", isAuth_1.isAuth, isAgent_1.isAgent, wallet_controllers_1.purchaseWithTransfer);
exports.default = router;
