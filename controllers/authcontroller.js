const { Article, Author, Comment } = require("../db");
const bCrypt = require("bcrypt");
const passport = require("../config/passport/passport");

let AuthController = {};

AuthController.toRegister = function (req, res) {
  res.render("./register");
};

AuthController.toLogin = function (req, res) {
  res.render("./login");
};

AuthController.create = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    await bCrypt.hash(password, 10, async (err, password) => {
      Author.create({ firstname, lastname, email, password }).then((author) => {
        res.redirect("/login");
      });
    });
  } catch (error) {
    console.log(error);
  }
};

AuthController.login = (req, res) => {
  res.send("/admin");
};

AuthController.validPassword = async (password, hash) =>
  await bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      return console.log("Error");
    }
    return result;
  });

module.exports = AuthController;
