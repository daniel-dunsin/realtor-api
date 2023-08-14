"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = require("../middleware/isAuth");
const isAgent_1 = require("../middleware/isAgent");
const wallet_controllers_1 = require("../controllers/wallet.controllers");
const router = (0, express_1.Router)();
router.get("/", isAuth_1.isAuth, isAgent_1.isAgent, wallet_controllers_1.getWalletInfo);
exports.default = router;
