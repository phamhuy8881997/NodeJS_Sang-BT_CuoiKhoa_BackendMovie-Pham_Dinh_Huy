const express = require("express");
const {
  findAllTheaterList,
  createTheaterList,
  deleteTheaterList,
  findAllTheater,
  createTheater,
  deleteTheater,
  findAllTheaterRoom,
  createTheaterRoom,
  deleteTheaterRoom,
  createTimeMovie,
  deleteTimeMovie,
  findAll_AZ,
  findAll_theaterList_AZ,
  findAll_theaterRoom_AZ,
  booking,
  Movie_Time_AZ,
  ShowTime,
  ListChair,
  bookingNow,
  removeTheaterList,
  removeTheater,
} = require("../controller/theater.controller");
const {
  authenticate,
  authorize,
} = require("../middleware/auth/verify-token.middleware");
const { uploadImageSingle } = require("../middleware/upload/upload");
const { checkExit } = require("../middleware/validations/check-exit.midleware");
require("dotenv").config();

const {
  TheatersList,
  Theaters,
  TheatersRoom,
  TheatersTime,
  TheatersChair,
  sequelize,
  Movies,
  Tickers,
} = require("../models");
//TheatersList  -- table CumRap
//Theaters      -- table RapChieu
//TheatersRoom  -- table PhongChieu
//TheatersTime  -- table LichChieu
//TheatersChair -- table GheNgoi

const theaterRouter = express.Router();
//-------lay danh sach HeThongRap------------------------------------
theaterRouter.get("/HeThongRap", findAllTheaterList);
//-------Them HeThongRap---------------------------------------------
theaterRouter.post(
  "/HeThongRap",
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  uploadImageSingle("logo"),
  createTheaterList
);
//-------xoa HeThongRap all -----------------------------------------
theaterRouter.delete(
  "/HeThongRap/:maHeThong",
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  deleteTheaterList
);
//------xoa HeThongRap 1 --------------------------------------------
theaterRouter.delete(
  "/HeThongRapOne/:maHeThong",
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  removeTheaterList
);
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-------lay CumRap theo maHeThong-----------------------------------
theaterRouter.get("/CumRap/:maHeThong", findAllTheater);
//-------them CumRap ------------------------------------------------
theaterRouter.post(
  "/CumRap",
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  uploadImageSingle("hinhAnhRap"),
  createTheater
);
//-------xoa CumRap all ---------------------------------------------
theaterRouter.delete(
  "/CumRap/:maCumRap",
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  deleteTheater
);
//-------xoa CumRap one ---------------------------------------------
theaterRouter.delete(
  "/CumRapOne/:maCumRap",
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  removeTheater
);
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-------lay danh sach phong chieu theo maCumRap---------------------
theaterRouter.get("/PhongChieu/:maCumRap", findAllTheaterRoom);
//-------them PhongChieu --------------------------------------------
theaterRouter.post(
  "/PhongChieu",
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  createTheaterRoom
);
//-------xoa PhongChieu ---------------------------------------------
theaterRouter.delete(
  "/PhongChieu/:maPhongChieu",
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  deleteTheaterRoom
);
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-------them LichChieu----------------------------------------------
theaterRouter.post(
  "/LichChieu",
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  createTimeMovie
);
//-------xoa lich chieu----------------------------------------------
theaterRouter.delete(
  "/LichChieu/:id",
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  checkExit(TheatersTime),
  deleteTimeMovie
);
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-------lay toan bo danh sach---------------------------------------
theaterRouter.get("/DanhSach", findAll_AZ);
//-------lay toan bo danh sach theo maHeThong------------------------
theaterRouter.get("/DanhSach/:maHeThong", findAll_theaterList_AZ);
//-------lay danh sach theo ma cumRap--------------------------------
theaterRouter.get("/DanhSachPhongChieu/:maCumRap", findAll_theaterRoom_AZ);
//-------dat ve xem phim---------------------------------------------
theaterRouter.post("/DatVe", authenticate, booking);
//-------danh sach lich chieu theo maHeThong-------------------------
theaterRouter.get("/showTime-All/:maHeThong", Movie_Time_AZ);
//-------danh sach lich chieu theo maPhim----------------------------
theaterRouter.get("/showTime/:id", checkExit(Movies), ShowTime);
//-------danh sach ghe tu ma lich chieu------------------------------
theaterRouter.get("/listChair/:id", checkExit(TheatersTime), ListChair);
//-------dat ve nhanh------------------------------------------------
theaterRouter.get("/booking-now/:id", checkExit(Movies), bookingNow);

module.exports = {
  theaterRouter,
};
