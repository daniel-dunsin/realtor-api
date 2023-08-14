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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAgent = void 0;
const role_1 = require("../constants/role");
const responseHandlers_1 = require("../handlers/responseHandlers");
const auth_service_1 = require("../services/auth.service");
const isAgent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield (0, auth_service_1.checkUser)((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email);
    if ((user === null || user === void 0 ? void 0 : user.role) !== role_1.Role.agent) {
        return next(new responseHandlers_1.UnAuthorizedError("Only agent can access this route"));
    }
    req.user.isAgent = true;
    next();
});
exports.isAgent = isAgent;
