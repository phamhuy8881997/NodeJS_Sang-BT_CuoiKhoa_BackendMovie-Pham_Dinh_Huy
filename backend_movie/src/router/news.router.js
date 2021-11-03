const express = require("express");
const {
  uploadImageSingle,
  uploadImageMultiNews,
} = require("../middleware/upload/upload");
const newsRouter = express.Router();
require("dotenv").config();
var fs = require("fs");

const { News } = require("../models");
const { checkExit } = require("../middleware/validations/check-exit.midleware");
const {
  authenticate,
  authorize,
} = require("../middleware/auth/verify-token.middleware");
const {
  getAll,
  createNews,
  deleteNews,
} = require("../controller/news.controller");
//-----------------------------------------------------------------------
newsRouter.get("/", getAll);
//------------------------------------------------------------------------
newsRouter.post(
  "/",
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  uploadImageMultiNews("imageNews", "imageList"),
  createNews
);
//-----------------------------------------------------------------------------
newsRouter.delete(
  "/:id",
  checkExit(News),
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  deleteNews
);
module.exports = {
  newsRouter,
};
