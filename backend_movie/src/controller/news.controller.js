require("dotenv").config();
var fs = require("fs");

const { News } = require("../models");

//--------------- lay danh sach tin tuc --------------------
const getAll = async (req, res) => {
  try {
    const getAllNews = await News.findAll();
    res.status(200).send(getAllNews);
  } catch (error) {
    res.status(500).send({ message: "loi server 500" });
  }
};
//--------------- them moi tin tuc --------------------------
const createNews = async (req, res) => {
  try {
    const { name, imageNews, textOne, imageList, textList, status } = req.body;
    const hinhAnh = `${process.env.URL_DEPLOY}/${req.files["imageNews"][0].path}`;
    let hinhAnhString = "";
    const posterUp = req.files["imageList"];
    for (let i = 0; i < posterUp.length; i++) {
      hinhAnhString += `${process.env.URL_DEPLOY}/${req.files["imageList"][i].path}`;
      if (i < posterUp.length - 1) {
        hinhAnhString += "####";
      }
    }
    const createNewsData = await News.create({
      name,
      imageNews: hinhAnh,
      textOne,
      imageList: hinhAnhString,
      textList,
      status,
    });
    res.status(200).send(createNewsData);
  } catch (error) {
    res.status(500).send({ message: "loi server 500" });
  }
};
//--------------- xoa tin tuc -------------------------------
const deleteNews = async (req, res) => {
  try {
    //----------------------------------
    const { id } = req.params;
    const getNews = await News.findByPk(id);
    let arrImg = [];
    const imgNews = getNews.imageNews.split("/");
    const imgNews1 = imgNews[imgNews.length - 1];
    const imgListNews = getNews.imageList.split("####");
    imgListNews.forEach((el) => {
      const a1 = el.split("/");
      const a2 = a1[a1.length - 1];
      arrImg.push(a2);
    });
    arrImg.push(imgNews1);
    //----------------------------------
    arrImg.forEach((elm) => {
      fs.unlink(elm, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
    });
    //----------------------------------
    await News.destroy({
      where: { id },
    });
    //----------------------------------
    res.status(200).send(getNews);
  } catch (error) {
    res.status(200).send(arrImg);
  }
};
module.exports = {
  getAll,
  createNews,
  deleteNews,
};
