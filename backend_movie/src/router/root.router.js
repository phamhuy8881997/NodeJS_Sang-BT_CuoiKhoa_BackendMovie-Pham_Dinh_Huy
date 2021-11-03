const express = require("express");
const { authRouter } = require("./auth.router");
const { carouselRouter } = require("./carousel.router");
const { MovieRouter } = require("./movies.router");
const { newsRouter } = require("./news.router");
const { theaterRouter } = require("./theater.router");
const { userRouter } = require("./users.router");

const rootRouter = express.Router();
//------------------------------------------------
rootRouter.use("/movies", MovieRouter);
rootRouter.use("/theater", theaterRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/carousel", carouselRouter);
rootRouter.use("/news", newsRouter);
//------------------------------------------------
module.exports = {
  rootRouter,
};
