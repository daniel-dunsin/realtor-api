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
exports.uploadToCloud = void 0;
const cloudinary_1 = require("cloudinary");
const settings_1 = require("../constants/settings");
const fs_1 = __importDefault(require("fs"));
cloudinary_1.v2.config({
    api_key: settings_1.settings.cloudinary.api_key,
    api_secret: settings_1.settings.cloudinary.api_secret,
    cloud_name: settings_1.settings.cloudinary.cloud_name,
});
const uploadToCloud = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield cloudinary_1.v2.uploader.upload(path, {
        folder: 'realtor',
    });
    yield fs_1.default.unlink(path, () => {
        console.log('File deleted');
    });
    return file === null || file === void 0 ? void 0 : file.url;
});
exports.uploadToCloud = uploadToCloud;
