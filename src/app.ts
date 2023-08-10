import express from "express";
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

const app: express.Application = express();

/**
 * Middlewares
 */
// Max of 20 requests per minute
app.use(
  rateLimiter({
    windowMs: 60000,
    max: 20,
  })
);
// Helps to secure requests by setting headers
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(setCache);

/**
 * Routes
 */
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Welcome to realtor API" });
});

app.use("/auth", routes.auth);
app.use("/agent", routes.agent);
app.use("/listing", routes.listings);
app.use("/article", routes.articles);
app.use("/comment", routes.comments);
app.use("/review", routes.reviews);
app.use("/chat", routes.chats);
app.use("/message", routes.messages);
app.use("/bidding", routes.bidding);

/**
 * Error Handlers
 */
app.use(errorHandler);
app.all("*", notFound);

/**
 * Connection
 */

const port: string | number | undefined = settings.port || 3001;

mongoose
  .connect(settings.mongo.url as string, { socketTimeoutMS: 100000 })
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });

    socketImplementation(server);
  })
  .catch((error) => {
    console.log(error);
  });
