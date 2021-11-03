const express = require("express");
const { uploadImageSingle } = require("../middleware/upload/upload");
const carouselRouter = express.Router();
require("dotenv").config();
var fs = require("fs");

const { Carousel } = require("../models");
const { checkExit } = require("../middleware/validations/check-exit.midleware");
const {
  authenticate,
  authorize,
} = require("../middleware/auth/verify-token.middleware");
const {
  getAllCarousel,
  createCarousel,
  updateCarousel,
  deleteCarousel,
} = require("../controller/carousel.controller");
//------------------- lay danh sach carousel --------------------------------
carouselRouter.get("/", getAllCarousel);
//------------------- them moi carousel ------------------------------------
carouselRouter.post(
  "/",
  uploadImageSingle("imageCarousel"),
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  createCarousel
);
//------------------ cap nhat carousel ------------------------------
carouselRouter.post(
  "/:id",
  checkExit(Carousel),
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  uploadImageSingle("imageCarousel"),
  updateCarousel
);
//---------------- xoa carousel ------------------------------------
carouselRouter.delete(
  "/:id",
  checkExit(Carousel),
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  deleteCarousel
);

module.exports = {
  carouselRouter,
};
