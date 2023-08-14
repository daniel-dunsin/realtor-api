"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandlers_1 = require("./handlers/errorHandlers");
const settings_1 = require("./constants/settings");
const routes_1 = __importDefault(require("./routes"));
const cache_1 = require("./helpers/cache");
const socket_service_1 = __importDefault(require("./services/socket.service"));
const app = (0, express_1.default)();
/**
 * Middlewares
 */
// Max of 20 requests per minute
app.use((0, express_rate_limit_1.default)({
    windowMs: 60000,
    max: 20,
}));
// Helps to secure requests by setting headers
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cache_1.setCache);
/**
 * Routes
 */
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to realtor API" });
});
app.use("/auth", routes_1.default.auth);
app.use("/agent", routes_1.default.agent);
app.use("/listing", routes_1.default.listings);
app.use("/article", routes_1.default.articles);
app.use("/comment", routes_1.default.comments);
app.use("/review", routes_1.default.reviews);
app.use("/chat", routes_1.default.chats);
app.use("/message", routes_1.default.messages);
app.use("/bidding", routes_1.default.bidding);
app.use("/wallet", routes_1.default.wallet);
/**
 * Error Handlers
 */
app.use(errorHandlers_1.errorHandler);
app.all("*", errorHandlers_1.notFound);
/**
 * Connection
 */
const port = settings_1.settings.port || 3001;
mongoose_1.default
    .connect(settings_1.settings.mongo.url, { socketTimeoutMS: 100000 })
    .then(() => {
    const server = app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
    (0, socket_service_1.default)(server);
})
    .catch((error) => {
    console.log(error);
});
