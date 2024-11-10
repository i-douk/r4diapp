import express from "express";
require("express-async-errors");
const app = express();
import "express-async-errors";
import config from "./utils/config";
import { connectToDatabase, sequelize } from "./utils/db";
app.use(express.json());
import usersRouter from "./controllers/users/users";
import loginUserRouter from "./controllers/users/loginUser";

import podcastersRouter from "./controllers/podcasters/podcasters";
import loginPodcasterRouter from "./controllers/podcasters/loginPodcaster";
import podcastsRouter from "./controllers/podcasts";
import logoutRouter from "./controllers/logout";
import followingRouter from "./controllers/followings";
import subscriptionsRouter from "./controllers/subscriptions";

import cors from "cors";
app.use(cors());
app.use("/api/users", usersRouter);
app.use("/api/userlogin", loginUserRouter);
app.use("/api/podcasters", podcastersRouter);
app.use("/api/podcasterlogin", loginPodcasterRouter);
app.use("/api/podcasts", podcastsRouter);
app.use("/api/followings", followingRouter);
app.use("/api/subscriptions", subscriptionsRouter);
app.use("/api/logout", logoutRouter);
app.use(express.json());

// Sync Sequelize models with the database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synchronized");
    app.listen(config.PORT, async () => {
      await connectToDatabase();
      console.log(`Server running on port ${config.PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Unable to sync database:", error);
  });
