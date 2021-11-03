const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (id, email, phanLoai) => {
  const payload = {
    id,
    email,
    phanLoai,
  };
  const secretKey = process.env.SELECTKEY_JWT;
  const token = jwt.sign(payload, secretKey, {
    expiresIn: 3 * 30 * 24 * 60 * 60, // giây
  });
  return token;
};

module.exports = {
  generateToken,
};
