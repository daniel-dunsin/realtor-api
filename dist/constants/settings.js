"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
const dotenv_1 = require("dotenv");
const collections_1 = require("./collections");
(0, dotenv_1.config)();
exports.settings = {
    port: process.env.PORT,
    mongo: {
        url: process.env.MONGO_URL,
        collections: {
            user: collections_1.collections.user,
            auth: collections_1.collections.auth,
            agent: collections_1.collections.agent,
            property: collections_1.collections.property,
            article: collections_1.collections.article,
            comment: collections_1.collections.comment,
            review: collections_1.collections.review,
            chat: collections_1.collections.chat,
            message: collections_1.collections.message,
            bidding: collections_1.collections.bidding,
            transaction: collections_1.collections.transaction,
            wallet: collections_1.collections.wallet,
        },
    },
    jwt: {
        secret: process.env.SECRET,
    },
    cloudinary: {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    },
    paystack: {
        test: process.env.PAYSTACK_TEST,
    },
};
