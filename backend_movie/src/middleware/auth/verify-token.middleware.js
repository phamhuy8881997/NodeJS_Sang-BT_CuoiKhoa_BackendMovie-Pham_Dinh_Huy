const jwt = require("jsonwebtoken");
require("dotenv").config();

// kiểm tra người dùng có đăng nhập hay chưa
const authenticate = (req, res, next) => {
  const token = req.header("token");
  try {
    const secretKey = process.env.SELECTKEY_JWT;
    const decode = jwt.verify(token, secretKey);
    req.user = decode;
    next();
  } catch (error) {
    res.status(200).send({
      message: "Bạn Chưa Đăng Nhập",
    });
  }
};

// phân quyền người dùng
const authorize = (arrayRole) => (req, res, next) => {
  try {
    const { user } = req;
    if (arrayRole.includes(user.phanLoai)) {
      next();
    } else {
      res.status(200).send({
        message: "Bạn Đã Đăng Nhập , Nhưng Không có quền truy cập",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  authenticate,
  authorize,
};
