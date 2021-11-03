const multer = require("multer");
const mkdirp = require("mkdirp");

const { Movies } = require("../../models");

const uploadImageSingle = (type) => {
  const made = mkdirp.sync(`./public/images/${type}`);
  //setup path luu file va ten file
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/images/${type}`);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_api_${file.originalname}`);
    },
  });
  const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      const extentionList = ["png", "jpg", "jpeg"];
      const word = file.originalname.split(".");
      const extention = word[word.length - 1].toLowerCase();
      if (extentionList.includes(extention)) {
        cb(null, true);
      } else {
        cb(new Error("hinh anh khong dung dinh dang"));
      }
    },
  });
  return upload.single(type);
};
//================================================================
const uploadImageMulti = (type1A, type2A, type3A) => {
  mkdirp.sync(`./public/images/${type1A}`);
  mkdirp.sync(`./public/images/${type2A}`);
  mkdirp.sync(`./public/images/${type3A}`);
  //setup path luu file va ten file
  var storage = multer.diskStorage({
    destination: function (req, file, callBack) {
      //console.log(file.fieldname);
      if (file.fieldname === type1A) {
        callBack(null, `./public/images/${type1A}`);
      } else if (file.fieldname === type2A) {
        callBack(null, `./public/images/${type2A}`);
      } else if (file.fieldname === type3A) {
        callBack(null, `./public/images/${type3A}`);
      }
    },
    filename: function (req, file, callBack) {
      callBack(null, `${Date.now()}_api_${file.originalname}`);
    },
  });

  const upload = multer({
    storage,
    fileFilter: async function (req, file, callBack) {
      const { name } = req.body;
      const filtername = await Movies.findOne({
        where: {
          name,
        },
      });
      if (filtername) {
        //console.log("ten phim da bi trung");
        callBack(null, false);
      } else {
        //console.log("cho phep up");
        const extentionList = ["png", "jpg", "jpeg", "web", "gif"];
        const word = file.originalname.split(".");
        const extention = word[word.length - 1].toLowerCase();
        if (extentionList.includes(extention)) {
          callBack(null, true);
        } else {
          callBack(new Error("Hình Ảnh Không Đúng Định Dạng"));
        }
      }
    },
  });
  return upload.fields([
    { name: type1A, maxCount: 1 },
    { name: type2A, maxCount: 3 },
    { name: type3A, maxCount: 3 },
  ]);
};
//================================================================
const uploadImageMultiNews = (type1A, type2A) => {
  mkdirp.sync(`./public/images/${type1A}`);
  mkdirp.sync(`./public/images/${type2A}`);
  //setup path luu file va ten file
  var storage = multer.diskStorage({
    destination: function (req, file, callBack) {
      //console.log(file.fieldname);
      if (file.fieldname === type1A) {
        callBack(null, `./public/images/${type1A}`);
      } else if (file.fieldname === type2A) {
        callBack(null, `./public/images/${type2A}`);
      }
    },
    filename: function (req, file, callBack) {
      callBack(null, `${Date.now()}_${file.originalname}`);
    },
  });

  const upload = multer({
    storage,
    fileFilter: async function (req, file, callBack) {
      //console.log("cho phep up");
      const extentionList = ["png", "jpg", "jpeg", "mp4", "web", "gif"];
      const word = file.originalname.split(".");
      const extention = word[word.length - 1].toLowerCase();
      if (extentionList.includes(extention)) {
        callBack(null, true);
      } else {
        callBack(new Error("Hình Ảnh Không Đúng Định Dạng"));
      }
    },
  });

  return upload.fields([
    { name: type1A, maxCount: 1 },
    { name: type2A, maxCount: 6 },
  ]);
};

module.exports = {
  uploadImageSingle,
  uploadImageMulti,
  uploadImageMultiNews,
};
