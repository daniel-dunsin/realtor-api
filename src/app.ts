import express, { NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { errorHandler, notFound } from "./handlers/errorHandlers";
import { settings } from "./constants/settings";
import routes from "./routes";
import { setCache } from "./helpers/cache";
import socketImplementation from "./services/socket.service";
import yaml from "yamljs";
import swagger from "swagger-ui-express";
import path from "path";

const api_doc = require("./config/api.config.json");

const app: express.Application = express();

/**
 * Middlewares
 */
// Max of 20 requests per minute
app.use(
  rateLimiter({
    windowMs: 60000,
    max: 200,
  })
);
app.use(express.static(path.join(__dirname, "./public")));
// Helps to secure requests by setting headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Routes
 */
app.get("/", (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "./public/index.html"));
});
app.use("/api", swagger.serve, swagger.setup(api_doc));
app.use("/auth", routes.auth);
app.use("/agent", routes.agent);
app.use("/listing", routes.listings);
app.use("/article", routes.articles);
app.use("/comment", routes.comments);
app.use("/review", routes.reviews);
app.use("/chat", routes.chats);
app.use("/message", routes.messages);
app.use("/bidding", routes.bidding);
app.use("/wallet", routes.wallet);

/**
 * Error Handlers
 */
app.use(errorHandler);
app.all("*", notFound);

export default app;
