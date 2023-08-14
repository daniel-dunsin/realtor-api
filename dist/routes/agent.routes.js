"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_config_1 = require("../config/multer.config");
const agent_controllers_1 = require("../controllers/agent.controllers");
const isAgent_1 = require("../middleware/isAgent");
const isAuth_1 = require("../middleware/isAuth");
const router = (0, express_1.Router)();
router
    .route("/")
    .get(isAuth_1.isAuth, isAgent_1.isAgent, agent_controllers_1.getProfile)
    .post(isAuth_1.isAuth, agent_controllers_1.createAgent)
    .patch(isAuth_1.isAuth, isAgent_1.isAgent, multer_config_1.uploader.single("image"), agent_controllers_1.updateAgentProfile);
exports.default = router;
