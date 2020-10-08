const express = require("express");
const authRouter = express.Router();
const authController = require("./controllers/authcontroller.js");
const passport = require("passport");

authRouter.get("/registro", authController.toRegister);

authRouter.get("/login", authController.toLogin);

authRouter.post("/registro", authController.create);

authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
  })
);

module.exports = authRouter;
