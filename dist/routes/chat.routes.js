"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = require("../middleware/isAuth");
const message_controller_1 = require("../controllers/message.controller");
const router = (0, express_1.Router)();
router.route("/").post(isAuth_1.isAuth, message_controller_1.createChat).get(isAuth_1.isAuth, message_controller_1.getMyChats);
router.route("/:id").get(isAuth_1.isAuth, message_controller_1.getSingleChat);
exports.default = router;
