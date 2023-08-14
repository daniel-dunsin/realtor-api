"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = require("../middleware/isAuth");
const message_controller_1 = require("../controllers/message.controller");
const multer_config_1 = require("../config/multer.config");
const router = (0, express_1.Router)();
router
    .route("/chat/:id")
    .post(isAuth_1.isAuth, multer_config_1.uploader.array("images"), message_controller_1.sendMessage)
    .get(isAuth_1.isAuth, message_controller_1.getChatMessages);
router.route("/:id").patch(isAuth_1.isAuth, message_controller_1.editMessage).delete(isAuth_1.isAuth, message_controller_1.deleteMessage);
exports.default = router;
