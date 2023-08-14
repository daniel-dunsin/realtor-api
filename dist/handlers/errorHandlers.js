"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.code = statusCode;
    }
}
exports.CustomError = CustomError;
const errorHandler = (error, req, res, next) => {
    if (error instanceof CustomError) {
        return res.status(error.code).json({ error: error.message });
    }
    return res.status(500).json({ error: `${error.toString()}` });
};
exports.errorHandler = errorHandler;
const notFound = (req, res, next) => {
    res.status(404).json({ error: "Route does not exist" });
};
exports.notFound = notFound;
