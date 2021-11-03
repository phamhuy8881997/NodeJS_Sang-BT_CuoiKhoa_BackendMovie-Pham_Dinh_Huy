require("dotenv").config();
var fs = require("fs");
const { Carousel } = require("../models");

//---- danh sach carousel --------------
const getAllCarousel = async (req, res) => {
  try {
    const getAll = await Carousel.findAll();
    res.status(200).send(getAll);
  } catch (error) {
    res.status(500).send({ mesage: "loi server 500", error });
  }
};
//---- them moi carousel ---------------
const createCarousel = async (req, res) => {
  try {
    const { name, imageCarousel, toLink } = req.body;
    const { file } = req;
    const urlImage = `${process.env.URL_DEPLOY}/${file.path}`;
    const createCarousel = await Carousel.create({
      name,
      imageCarousel: urlImage,
      toLink,
    });
    res.status(200).send(createCarousel);
  } catch (error) {
    res.status(500).send({ mesage: "loi server 500", error });
  }
};
//---- cap nhat carousel ---------------------
const updateCarousel = async (req, res) => {
  try {
    const { id } = req.params;
    //------delete image old --------------
    const getCarousel = await Carousel.findByPk(id);
    const imageCarousel = getCarousel.imageCarousel.split("/");
    const imageCarouselRemove = imageCarousel[imageCarousel.length - 1];
    fs.unlink(imageCarouselRemove, function (err) {
      if (err) throw err;
      console.log("File deleted!");
    });
    //------delete image old --------------
    const { name, toLink } = req.body;
    const { file } = req;
    const urlImage = `${process.env.URL_DEPLOY}/${file.path}`;
    const dataUpdate = { name, imageCarousel: urlImage, toLink };
    await Carousel.update(dataUpdate, {
      where: { id },
    });
    const getCarouselNew = await Carousel.findByPk(id);
    res.status(200).send(getCarouselNew);
  } catch (error) {
    res.status(500).send({ mesage: "loi server 500", error });
  }
};
//---- xoa carousel ------------------
const deleteCarousel = async (req, res) => {
  try {
    const { id } = req.params;
    //------delete image old --------------
    const getCarousel = await Carousel.findByPk(id);
    const imageCarousel = getCarousel.imageCarousel.split("/");
    const imageCarouselRemove = imageCarousel[imageCarousel.length - 1];
    fs.unlink(imageCarouselRemove, function (err) {
      if (err) throw err;
      console.log("File deleted!");
    });
    await Carousel.destroy({
      where: { id },
    });
    res.status(200).send(getCarousel);
    //------delete image old --------------
  } catch (error) {
    res.status(500).send({ mesage: "loi server 500", error });
  }
};

module.exports = {
  getAllCarousel,
  createCarousel,
  updateCarousel,
  deleteCarousel,
};
