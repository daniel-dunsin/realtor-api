"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCache = void 0;
const setCache = (req, res, next) => {
    if (req.method === "GET") {
        res.set("Cache-Control", "public, max-age=60000");
        // .set("content-type", "application/json");
    }
    else {
        res.set("Cache-Control", "no-store");
    }
    next();
};
exports.setCache = setCache;
