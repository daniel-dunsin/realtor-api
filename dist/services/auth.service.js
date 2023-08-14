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
exports.getUser = exports.registerUser = exports.loginUser = exports.getUserById = exports.checkUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const user_auth_model_1 = __importDefault(require("../models/user.auth.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const responseHandlers_1 = require("../handlers/responseHandlers");
const role_1 = require("../constants/role");
const agent_model_1 = __importDefault(require("../models/agent.model"));
const checkUser = (credential) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({
        $or: [{ email: credential }, { username: credential }],
    });
    return user;
});
exports.checkUser = checkUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    return user;
});
exports.getUserById = getUserById;
const loginUser = ({ credential, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!credential || !password) {
        throw new responseHandlers_1.BadRequestError("Provide credential and password");
    }
    const userExists = yield (0, exports.checkUser)(credential);
    if (!userExists) {
        throw new responseHandlers_1.NotFoundError("User does not exists");
    }
    const user = yield user_auth_model_1.default.findOne({ email: userExists.email });
    const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordCorrect) {
        throw new responseHandlers_1.BadRequestError("Password is incorrect");
    }
    const token = user === null || user === void 0 ? void 0 : user.createJWT();
    return {
        message: "Log in successful",
        user: userExists,
        token: token,
    };
});
exports.loginUser = loginUser;
const registerUser = ({ username, email, password, isAgent, lastname, firstname, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password || !username) {
        throw new responseHandlers_1.BadRequestError("Provide username,firstname, lastname, email and pasword");
    }
    if (password.length < 8) {
        throw new responseHandlers_1.BadRequestError("Password should not be less than 8 characters");
    }
    const userExists = yield user_model_1.default.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        throw new responseHandlers_1.BadRequestError("A user with this email/username exists");
    }
    // hash user password
    const hashed_password = yield bcryptjs_1.default.hash(password, yield bcryptjs_1.default.genSalt(10));
    const userAuthInstance = yield user_auth_model_1.default.create({
        email,
        password: hashed_password,
    });
    const user = yield user_model_1.default.create({
        email,
        firstname,
        lastname,
        username,
        role: isAgent ? role_1.Role.agent : role_1.Role.client,
    });
    // if isAgent, create an agent profile
    if (isAgent) {
        const agent = yield agent_model_1.default.create({
            email: user.email,
            userId: user._id,
            username: user.username,
        });
    }
    const token = userAuthInstance.createJWT();
    return {
        message: "Account Created Succesfully",
        user,
        token,
    };
});
exports.registerUser = registerUser;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    if (!user)
        throw new responseHandlers_1.NotFoundError("user does not exist");
    return user;
});
exports.getUser = getUser;
