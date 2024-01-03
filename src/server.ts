import mongoose from "mongoose";
import { settings } from "./constants/settings";
import app from "./app";
import socketImplementation from "./services/socket.service";

const port: string | number | undefined = settings.port || 3001;

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  mongoose
    .connect(settings.mongo.url as string, { socketTimeoutMS: 100000 })
    .then(() => {
      console.log("db connected");
    })
    .catch((error) => {
      console.log(error);
    });
});

socketImplementation(server);
