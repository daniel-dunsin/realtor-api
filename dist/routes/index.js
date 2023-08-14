"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./auth.routes"));
const agent_routes_1 = __importDefault(require("./agent.routes"));
const listings_routes_1 = __importDefault(require("./listings.routes"));
const article_routes_1 = __importDefault(require("./article.routes"));
const comment_routes_1 = __importDefault(require("./comment.routes"));
const reviews_routes_1 = __importDefault(require("./reviews.routes"));
const chat_routes_1 = __importDefault(require("./chat.routes"));
const message_routes_1 = __importDefault(require("./message.routes"));
const bidding_routes_1 = __importDefault(require("./bidding.routes"));
const wallet_routes_1 = __importDefault(require("./wallet.routes"));
const routes = {
    auth: auth_routes_1.default,
    agent: agent_routes_1.default,
    listings: listings_routes_1.default,
    articles: article_routes_1.default,
    comments: comment_routes_1.default,
    reviews: reviews_routes_1.default,
    chats: chat_routes_1.default,
    messages: message_routes_1.default,
    bidding: bidding_routes_1.default,
    wallet: wallet_routes_1.default,
};
exports.default = routes;
