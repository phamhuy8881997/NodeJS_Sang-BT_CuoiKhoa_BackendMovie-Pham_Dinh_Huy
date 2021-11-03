const express = require("express");
const { signIn } = require("../controller/auth.controller");
const authRouter = express.Router();

// http://localhost:9000/auth/sign-in
authRouter.post("/login", signIn);

module.exports = {
  authRouter,
};
