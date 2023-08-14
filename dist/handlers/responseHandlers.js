"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.ForbiddenError = exports.UnAuthorizedError = exports.BadRequestError = void 0;
const errorHandlers_1 = require("./errorHandlers");
class BadRequestError extends errorHandlers_1.CustomError {
    constructor(message) {
        super(message, 400);
        this.name = "BadRequestError";
    }
}
exports.BadRequestError = BadRequestError;
class UnAuthorizedError extends errorHandlers_1.CustomError {
    constructor(message) {
        super(message, 401);
        this.name = "UnAuthorizedError";
    }
}
exports.UnAuthorizedError = UnAuthorizedError;
class ForbiddenError extends errorHandlers_1.CustomError {
    constructor(message) {
        super(message, 403);
        this.name = "ForbiddenError";
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends errorHandlers_1.CustomError {
    constructor(message) {
        super(message, 404);
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
