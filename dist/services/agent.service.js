"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_1 = require("../constants/role");
const responseHandlers_1 = require("../handlers/responseHandlers");
const agent_model_1 = __importDefault(require("../models/agent.model"));
const auth_service_1 = require("./auth.service");
const getProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const agent = yield agent_model_1.default.findOne({ userId: id });
    if (!agent) {
        throw new responseHandlers_1.NotFoundError("Agent profile not found");
    }
    return agent;
});
const getAgentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const agent = yield agent_model_1.default.findById(id);
    if (!agent) {
        throw new responseHandlers_1.NotFoundError("Agent profile not found");
    }
    return agent;
});
const createAgent = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, auth_service_1.checkUser)(email);
    if (!user) {
        throw new responseHandlers_1.NotFoundError("User does not exist");
    }
    if (user.role === role_1.Role.agent) {
        throw new responseHandlers_1.BadRequestError("User is already an agent");
    }
    user.role = role_1.Role.agent;
    const agent = yield agent_model_1.default.create({
        email: user.email,
        userId: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
    });
    const result = yield user.save();
    return {
        message: "You are now an agent",
        agent: agent,
    };
});
const updateAgent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const agent = yield agent_model_1.default.findOneAndUpdate({ userId: data === null || data === void 0 ? void 0 : data.userId }, data, {
        new: true,
        runValidators: true,
    });
    if (!agent) {
        throw new responseHandlers_1.NotFoundError("Agent does not exist");
    }
    return {
        message: "Profile Updated",
        agent: agent,
    };
});
const agentService = {
    updateAgent,
    createAgent,
    getProfile,
    getAgentById,
};
exports.default = agentService;
