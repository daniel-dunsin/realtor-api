"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const configs = {
    storage: multer_1.default.diskStorage({
        destination(req, fill, callback) {
            callback(null, path_1.default.join(__dirname, "../images"));
        },
        filename(req, file, callback) {
            callback(null, `${file.originalname}${new Date().getTime()}`);
        },
    }),
    fileFilter(req, file, callback) {
        if (file.mimetype.includes("image")) {
            callback(null, true);
        }
        else {
            callback(null, false);
        }
    },
};
exports.uploader = (0, multer_1.default)(configs);
