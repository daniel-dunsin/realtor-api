"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = require("../middleware/isAuth");
const isAgent_1 = require("../middleware/isAgent");
const bidding_controllers_1 = require("../controllers/bidding.controllers");
const router = (0, express_1.Router)();
router
    .route("/property/:id")
    .get(isAuth_1.isAuth, isAgent_1.isAgent, bidding_controllers_1.getPropertyBiddings)
    .post(isAuth_1.isAuth, bidding_controllers_1.createBidding);
router.get("/received", isAuth_1.isAuth, isAgent_1.isAgent, bidding_controllers_1.getReceivedBiddings);
// for any user
router.get("/sent", isAuth_1.isAuth, bidding_controllers_1.getSentOutBiddings);
router
    .route("/:id")
    .delete(isAuth_1.isAuth, bidding_controllers_1.deleteBidding)
    .patch(isAuth_1.isAuth, isAgent_1.isAgent, bidding_controllers_1.editBiddingStatus);
exports.default = router;
