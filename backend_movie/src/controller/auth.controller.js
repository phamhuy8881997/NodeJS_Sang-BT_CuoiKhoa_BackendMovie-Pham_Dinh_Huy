const { Users } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/token");

const signIn = async (req, res) => {
  try {
    const { taiKhoan, matKhau } = req.body;
    //------
    const userSignIn = await Users.findOne({
      where: {
        taiKhoan,
      },
    });
    //------
    if (userSignIn) {
      const isCheckPassword = bcryptjs.compareSync(matKhau, userSignIn.matKhau);
      if (isCheckPassword) {
        // tạo token
        const token = generateToken(
          userSignIn.id,
          userSignIn.email,
          userSignIn.phanLoai
        );
        const userLog = await Users.findByPk(userSignIn.id);
        const avatar = userLog.avatar;
        const name = userLog.name;
        res.status(200).send({
          successfull: "Đăng nhập thành công",
          token,
          avatar,
          name,
        });
      } else {
        res.status(200).send({
          message: "Mật Khẩu Không chính xác !!",
        });
      }
    } else {
      res.status(200).send({
        message: "Tài Khoản Không Tồn Tại !!",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  signIn,
};
