const express = require("express");
require("dotenv").config();
//-----controller-------------------------
const {
  findAllMovie,
  findMovieDetail,
  findMovieTag,
  findMovieWatch,
  addNewMovie,
  updateMovie,
  deleteMovie,
} = require("../controller/movie.controller");
const {
  authenticate,
  authorize,
} = require("../middleware/auth/verify-token.middleware");
//-------middleware-----------------------
const {
  uploadImageSingle,
  uploadImageMulti,
} = require("../middleware/upload/upload");
const { checkExit } = require("../middleware/validations/check-exit.midleware");
//--------modal---------------------------
const { Movies, sequelize } = require("../models");
//--------express-------------------------
const MovieRouter = express.Router();

//-----------------------lay tat ca movies---------------------------------------
MovieRouter.get("/findAllMovie", findAllMovie);
//-----------------------lay movie theo id---------------------------------------
MovieRouter.get("/findMovieDetail/:id", checkExit(Movies), findMovieDetail);
//-----------------------lay movie theo the loai----------------------------------
MovieRouter.get("/findMovieTag/:tag", findMovieTag);
//----------------------lay movie co luot xem nhieu-------------------------------
MovieRouter.get("/luot-xem/:luotXem", findMovieWatch);
//----------------------them movie moi--------------------------------------------
MovieRouter.post(
  "/addMovie",
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  uploadImageMulti("image", "poster"),
  addNewMovie
);
//-------------------------cap nhat movie-----------------------------------------
MovieRouter.post(
  "/updateMovieID/:id",
  checkExit(Movies),
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  uploadImageMulti("image", "poster"),
  updateMovie
);
//-------------------------xoa movie----------------------------------------------
MovieRouter.delete(
  "/delete/:id",
  checkExit(Movies),
  authenticate,
  authorize(["admin", "SUPER_ADMIN"]),
  deleteMovie
);
//-----------------------khoi phuc du lieu da xoa---------------------------------
MovieRouter.get("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getDataRestore = await Movies.findByPk(id);
    if (getDataRestore) {
      res.status(200).send({ mesage: "id chua bi xoa, khong can restore" });
    } else {
      await Movies.restore({ where: { id } });
      res.status(200).send({ mesage: "khoi phuc du lieu thanh cong" });
    }
  } catch (error) {
    res.status(500).send({ mesage: "loi server 500", error });
  }
});
//-------------------------------------------------------------------------------
module.exports = {
  MovieRouter,
};

//   (req, res) => {
//     const hinhAnh = req.files["image"][0];
//     //const posterUp = req.files["poster"][0];
//     const posterArr = [];
//     const posterUp = req.files["poster"];
//     for (let i = 0; i < posterUp.length; i++) {
//       posterArr.push(`http://localhost:5577/${req.files["poster"][i].path}`);
//     }
//     try {
//       res.send({
//         image: `http://localhost:5577/${hinhAnh.path}`,
//         poster: posterArr,
//       });
//     } catch (error) {
//       res.send(error);
//     }
//   }
