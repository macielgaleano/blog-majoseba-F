const passport = require("passport");
const { Article, Author, Comment } = require("../db");
const bCrypt = require("bcrypt");

module.exports = {
  store: async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
      await bCrypt.hash(password, 10, async (err, password) => {
        console.log("hash: " + password);
        Author.create({ firstname, lastname, email, password }).then(
          (author) => {
            res.redirect("/admin");
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  },
};
