const express = require("express");
const {
  findAll,
  findDetail,
  create,
  update,
  remove,
  uploadAvatar,
  DetailUserTicker,
  deleteTicker,
  resetSendEmail,
} = require("../controller/user.controller");
const {
  authenticate,
  authorize,
} = require("../middleware/auth/verify-token.middleware");
const { uploadImageSingle } = require("../middleware/upload/upload");
const { checkExit } = require("../middleware/validations/check-exit.midleware");
const { Users, Tickers, TheatersChair, sequelize } = require("../models");

const userRouter = express.Router();
//-----upload avatar-----------------------------------------
userRouter.post(
  "/upload-avatar",
  authenticate,
  uploadImageSingle("avatar"),
  uploadAvatar
);
//-----lay tat ca user--------------------------------------
userRouter.get("/", findAll);
//-----lay thong tin user-----------------------------------
userRouter.get("/findDetail", authenticate, findDetail);
//-----tao moi user-----------------------------------------
userRouter.post("/", create);
//-----cap nhat user----------------------------------------
userRouter.post("/updateUser", authenticate, update);
//-----xoa user---------------------------------------------
userRouter.delete(
  "/:id",
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  checkExit(Users),
  remove
);
//-----thong tin user kem ve xem phim-----------------------
userRouter.get("/userDetailAll", authenticate, DetailUserTicker);
//-----xoa ve da dat----------------------------------------
userRouter.delete("/deleteTicker/:id", authenticate, deleteTicker);
//-----reset password qua email-----------------------------
userRouter.post("/reset-password", resetSendEmail);

module.exports = {
  userRouter,
};
