const { Users, Tickers, TheatersChair, sequelize } = require("../models");
const bcryptjs = require("bcryptjs");
require("dotenv").config();
var fs = require("fs");
var nodemailer = require("nodemailer");
//-------lay toan bo user-----------------------------------
const findAll = async (req, res) => {
  try {
    const userList = await Users.findAll();
    res.status(200).send(userList);
  } catch (error) {
    res.status(500).send({
      message: "Lỗi Server",
      error,
    });
  }
};
//-------lay thong tin tai khoan----------------------------
const findDetail = async (req, res) => {
  try {
    const { user } = req;
    //const { id } = req.params;
    const userDetail = await Users.findByPk(user.id);
    res.send(userDetail);
  } catch (error) {
    res.status(500).send({
      message: "Lỗi Server 500",
      error,
    });
  }
};
//------Tao tai khoan---------------------------------------
const create = async (req, res) => {
  try {
    const { name, taiKhoan, matKhau, SDT, email, avatar, phanLoai } = req.body;
    const query1 = `select * from users`;
    const [res1] = await sequelize.query(query1);
    let testkey1 = [];
    let testkey2 = [];
    for (let i = 0; i < res1.length; i++) {
      if (res1[i].taiKhoan === taiKhoan) {
        testkey1.push(res1[i]);
      } else {
        if (res1[i].email === email) {
          testkey2.push(res1[i]);
        }
      }
    }
    //-----------------
    if (testkey1.length > 0) {
      res.status(200).send({
        message: "tài khoản đã tồn tại. Vui lòng dùng tài khoản khác !!",
      });
    } else if (testkey2.length > 0) {
      res.status(200).send({
        message: "Email đã tồn tại. Vui lòng dùng Email khác !!",
      });
    } else {
      const salt = bcryptjs.genSaltSync(10);
      const hashPassword = bcryptjs.hashSync(matKhau, salt);
      const newUser = await Users.create({
        name,
        taiKhoan,
        matKhau: hashPassword,
        SDT,
        email,
        avatar: `${process.env.URL_DEPLOY}/public\\images\\imageLocal\\avatarLocal.jpg`,
        phanLoai,
      });
      res.status(200).send(newUser);
    }
  } catch (error) {
    res.status(500).send({
      message: "loi server 500",
      error,
    });
  }
};
//------Cap nhat tai khoan----------------------------------
const update = async (req, res) => {
  try {
    //return authentication
    const { user } = req;
    //const { id } = req.params;
    //get user old to user return by user.id
    const GetUser = await Users.findOne({
      where: {
        id: user.id,
      },
    });
    //data post by client
    const data = req.body;
    //hashPassword
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(data.matKhau, salt);
    //data new update on database
    const dataUpdate = {
      name: data.name,
      taiKhoan: GetUser.taiKhoan,
      matKhau: hashPassword,
      SDT: data.SDT,
      email: data.email,
      avatar: GetUser.avatar,
      phanLoai: data.phanLoai.toLowerCase(),
    };
    const checkEmailExact = await Users.findOne({
      where: {
        email: data.email,
      },
    });
    // kiem tra email trùng
    if (checkEmailExact) {
      const query = `SELECT * FROM users where id = ${user.id}`;
      const [resule] = await sequelize.query(query);
      // kiem tra xem co trung với mail user khác
      if (resule[0].email === data.email) {
        const userUpdate = await Users.update(dataUpdate, {
          where: {
            id: user.id,
          },
        });
        res.status(200).send(dataUpdate);
      } else {
        res
          .status(200)
          .send({ message: "Email đã tồn tại. Vui lòng dùng Email khác !!" });
      }
    } else {
      const userUpdate = await Users.update(dataUpdate, {
        where: {
          id: user.id,
        },
      });
      res.status(200).send(dataUpdate);
    }
    //---------------------------
  } catch (error) {
    res.status(500).send({
      message: "Lỗi Server",
      error,
    });
  }
};
//------Xoa tai khoan---------------------------------------
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    //-------------
    const getUserAvatar = await Users.findByPk(id);
    const imageAvatar = getUserAvatar.avatar.split("/");
    const imageAvatarRemove = imageAvatar[imageAvatar.length - 1];
    if (imageAvatarRemove === `public\\images\\imageLocal\\avatarLocal.jpg`) {
      //console.log("anh he thong khong can xoa");
    } else {
      fs.stat(imageAvatarRemove, (error, stats) => {
        if (error) {
          console.log(error);
        } else {
          fs.unlink(imageAvatarRemove, function (err) {
            if (err) throw err;
            console.log("File deleted!");
          });
        }
      });
      //console.log("cho phep xoa");
    }
    //-------------
    const { DetailsInfo } = req;
    await Users.destroy({
      where: {
        id,
      },
    });
    res.status(200).send(DetailsInfo);
  } catch (error) {
    res.status(500).send({
      message: "Lỗi Server",
      error,
    });
  }
};
//-----upload avatar----------------------------------------
const uploadAvatar = async (req, res) => {
  try {
    const { file, user } = req;
    // delete image old
    const getUserAvatar = await Users.findByPk(user.id);
    const imageAvatar = getUserAvatar.avatar.split("/");
    const imageAvatarRemove = imageAvatar[imageAvatar.length - 1];
    if (imageAvatarRemove === `public\\images\\imageLocal\\avatarLocal.jpg`) {
      //console.log("anh he thong khong can xoa");
    } else {
      //console.log("cho phep xoa");
      fs.stat(imageAvatarRemove, (error, stats) => {
        if (error) {
          console.log(error);
        } else {
          fs.unlink(imageAvatarRemove, function (err) {
            if (err) throw err;
            console.log("File deleted!");
          });
        }
      });
    }
    // upload image avatar new
    const urlImage = `${process.env.URL_DEPLOY}/${file.path}`;
    getUserAvatar.avatar = urlImage;
    await getUserAvatar.save();
    res.send(getUserAvatar);
  } catch (error) {
    res.status(500).send({
      message: "Lỗi Server 500",
      error,
    });
  }
};
//-----user + danh sach ve----------------------------------
const DetailUserTicker = async (req, res) => {
  try {
    const { user } = req;
    //const userDetail = await Users.findByPk(user.id);
    const query = `select * from users where id = ${user.id}`;
    const [resule] = await sequelize.query(query);
    const query1 = `
    select tickers.id,tickers.userID,tickers.maGhe,users.name,users.SDT,theaterschairs.maLichChieu,
    theaterschairs.tenGhe,theaterstimes.ngayKhoiChieu,theaterstimes.giaVe,
    movies.name as tenPhim,theatersrooms.tenPhongChieu,theatersrooms.maCumRap from tickers
    left join users
    on users.id = tickers.userID
    left join theaterschairs
    on theaterschairs.id = tickers.maGhe
    left join theaterstimes
    on theaterstimes.id= theaterschairs.maLichChieu
    left join movies
    on movies.id = theaterstimes.maPhim
    left join theatersrooms
    on theatersrooms.id = theaterstimes.maPhongChieu
    where tickers.userID = ${user.id};
    `;
    const [resule1] = await sequelize.query(query1);
    let userTemp = { thongTin: resule[0], danhSachve: [...resule1] };

    res.status(200).send(userTemp);
  } catch (error) {
    res.status(500).send({
      message: "loi server 500",
    });
  }
};
//-----huy ve da dat----------------------------------------
const deleteTicker = async (req, res) => {
  try {
    const { id } = req.params;
    const getTicker = await Tickers.findByPk(id);
    const isSetChair = await TheatersChair.findByPk(getTicker.maGhe);
    isSetChair.status = false;
    await isSetChair.save();
    await Tickers.destroy({ where: { id } });
    res.status(200).send({
      removeTicker: getTicker,
      removeChair: isSetChair,
    });
  } catch (error) {
    res.status(500).send({
      message: "Lỗi Server",
      error,
    });
  }
};
//----resset password send email----------------------------
//Go to : https://www.google.com/settings/security/lesssecureapps
//set the Access for less secure apps setting to Enable
const resetSendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const checkEmail = await Users.findOne({
      where: {
        email,
      },
    });
    if (checkEmail) {
      const r1 = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 4);
      const r2 = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 4);
      const r3 = (r1 + r2).toLowerCase();
      //-------------
      const salt = bcryptjs.genSaltSync(10);
      const hashPassword = bcryptjs.hashSync(r3, salt);
      const setPasswordEmail = await Users.findOne({
        where: {
          email,
        },
      });
      setPasswordEmail.matKhau = hashPassword;
      await setPasswordEmail.save();
      //--------------

      var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: `${process.env.USER_EMAIL}`,
          pass: `${process.env.PASSWORD_EMAIL}`,
        },
      });
      var mailOptions = {
        from: `${process.env.USER_EMAIL}`,
        to: `"${email}"`,
        subject: "reset password to starMovie",
        html: `<h2>Reset Mat Khau StarMovie:</h2>
              <h3>Mat khau moi cua ban la: ${r3}</h3>
              <p>neu ban khong reset mat khau vui long cap nhat tai khoan lai !!</p>
              <p>xin cam on !!!</p>
              <p>email duoc gui boi ${process.env.USER_EMAIL} </p>
              `,
      };
      transporter.sendMail(mailOptions);
      //------------
      res.status(200).send({
        message:
          "Reset mật khẩu thành công. Vui lòng kiểm tra hộp thư bao gồm Spam và Thùng Rác !!",
      });
    } else {
      res.status(200).send({ message: "Email chưa đăng kí tài khoản !!" });
    }
  } catch (error) {
    res.status(500).send({
      message: "Lỗi Server",
      error,
    });
  }
};
//----------------------------------------------------------

module.exports = {
  findAll,
  findDetail,
  create,
  update,
  remove,
  uploadAvatar,
  DetailUserTicker,
  deleteTicker,
  resetSendEmail,
};
