const { Movies, sequelize } = require("../models");
var fs = require("fs");

//----------------lay tat ca movie ------------------------------
const findAllMovie = async (req, res) => {
  try {
    const MovieList = await Movies.findAll();
    res.status(200).send(MovieList);
  } catch (error) {
    res.status(500).send({
      message: "server not woking",
      error,
    });
  }
};
//---------------lay movie theo id-------------------------------
const findMovieDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const MovieDetail = await Movies.findByPk(id);
    res.status(200).send(MovieDetail);
  } catch (error) {
    res.status(500).send({
      message: "not search id on database",
      error,
    });
  }
};
//---------------lay movie theo the loai-------------------------
const findMovieTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const MovieTag = await Movies.findAll({
      where: {
        theLoai: tag,
      },
    });
    if (MovieTag.length > 0) {
      res.status(200).send(MovieTag);
    } else {
      res.status(200).send({
        message: "khong co the loai tim kiem",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "not working",
      error,
    });
  }
};
//--------------lay movie co luot xem nhieu----------------------
const findMovieWatch = async (req, res) => {
  try {
    const { luotXem } = req.params;
    const luotXem1 = parseInt(luotXem);
    const queryString = `
      select * from movies
      where movies.luotXem > ${luotXem1};
      `;
    const [resules] = await sequelize.query(queryString);
    res.status(200).send(resules);
  } catch (error) {
    res.status(500).send({
      message: "loi server khong the tim",
      error,
    });
  }
};
//--------------them phim moi -----------------------------------
const addNewMovie = async (req, res) => {
  try {
    const hinhAnh = req.files["image"][0];
    const posterUp = req.files["poster"][0];
    //   const posterArr = [];
    //   const posterUp = req.files["poster"];
    //   for (let i = 0; i < posterUp.length; i++) {
    //     posterArr.push(`http://localhost:5577/${req.files["poster"][i].path}`);
    //   }
    const data = req.body;
    const newMovie = await Movies.create({
      name: data.name,
      image: `${process.env.URL_DEPLOY}/${hinhAnh.path}`,
      poster: `${process.env.URL_DEPLOY}/${posterUp.path}`,
      thongTin: data.thongTin,
      imdb: data.imdb,
      theLoai: data.theLoai,
      quocGia: data.quocGia,
      status: data.status,
      trailer: data.trailer,
      ngayKhoiChieu: data.ngayKhoiChieu,
      danhGia: data.danhGia,
      luotXem: data.luotXem,
      movieSearch: data.movieSearch,
    });
    res.status(200).send(newMovie);
  } catch (error) {
    res.send({
      message: "Tên Phim Đã Tồn Tại. Vui Lòng Dùng Tên Khác",
      error,
      statusError: "lỗi server 500",
    });
  }
};
//--------------cap nhat phim -----------------------------------
const updateMovie = async (req, res) => {
  try {
    const { DetailsInfo } = req;
    const { id } = req.params;

    const MovieImage = await Movies.findOne({ where: { id } });
    const imageMovie = MovieImage.image.split("/");
    const imagePoster = MovieImage.poster.split("/");
    const imageMovieRemove = imageMovie[imageMovie.length - 1];
    const imagePosterRemove = imagePoster[imagePoster.length - 1];
    let arrText = [];
    arrText.push(imageMovieRemove);
    arrText.push(imagePosterRemove);

    arrText.forEach((rmfile) => {
      fs.stat(rmfile, (error, stats) => {
        if (error) {
          console.log(error);
        } else {
          fs.unlink(rmfile, function (err) {
            if (err) throw err;
            //console.log("File deleted!");
          });
        }
      });
    });

    const hinhAnh = req.files["image"][0];
    const posterUp = req.files["poster"][0];
    const hinhAnhUrl = `${process.env.URL_DEPLOY}/${hinhAnh.path}`;
    const posterUrl = `${process.env.URL_DEPLOY}/${posterUp.path}`;
    //---
    const data = req.body;
    const movieUpdate = {
      name: data.name,
      image: hinhAnhUrl,
      poster: posterUrl,
      thongTin: data.thongTin,
      imdb: data.imdb,
      theLoai: data.theLoai,
      quocGia: data.quocGia,
      status: data.status,
      trailer: data.trailer,
      ngayKhoiChieu: data.ngayKhoiChieu,
      danhGia: data.danhGia,
      luotXem: data.luotXem,
      movieSearch: data.movieSearch,
    };

    await Movies.update(movieUpdate, {
      where: {
        id: DetailsInfo.id,
      },
    });
    res.status(200).send(movieUpdate);
  } catch (error) {
    res.send({
      message: "server loi khong the update",
      error,
    });
  }
};
//--------------xoa phim-----------------------------------------
const deleteMovie = async (req, res) => {
  try {
    const { DetailsInfo } = req;
    const { id } = req.params;

    const MovieImage = await Movies.findOne({ where: { id } });
    const imageMovie = MovieImage.image.split("/");
    const imagePoster = MovieImage.poster.split("/");
    const imageMovieRemove = imageMovie[imageMovie.length - 1];
    const imagePosterRemove = imagePoster[imagePoster.length - 1];
    let arrText = [];
    arrText.push(imageMovieRemove);
    arrText.push(imagePosterRemove);

    arrText.forEach((rmfile) => {
      fs.stat(rmfile, (error, stats) => {
        if (error) {
          console.log(error);
        } else {
          fs.unlink(rmfile, function (err) {
            if (err) throw err;
            //console.log("File deleted!");
          });
        }
      });
    });

    const MovieDelete = await Movies.destroy({
      where: {
        id,
      },
      //force: true,
    });
    //force: true, tinh nang xoa vinh vien
    res.status(200).send(DetailsInfo);
  } catch (error) {
    res.status(500).send({
      message: "loi server khong the xoa",
      error,
    });
  }
};
//---------------------------------------------------------------
module.exports = {
  findAllMovie,
  findMovieDetail,
  findMovieTag,
  findMovieWatch,
  addNewMovie,
  updateMovie,
  deleteMovie,
};
