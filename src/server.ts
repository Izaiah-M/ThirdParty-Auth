import express from "express";
import mongoose from "mongoose";
import { config } from "./Config/config";
import { AuthRoutes } from "./routes/auth.routes";

const app = express();

// Connecting to the database
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected to Mongo");
  })
  .catch((err) => {
    console.log(err);
  });

// Adding middlewares
app.use(express.json());

// Registering routes
AuthRoutes(app);

// Hello world
app.listen(config.server.port, () =>
  console.log(`Server running on port ${config.server.port}`)
);
