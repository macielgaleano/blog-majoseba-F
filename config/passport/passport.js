const { Article, Author, Comment } = require("../../db");
var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      await Author.findOne({ where: { email: email } }, function (err, user) {
        console.log(user);

        return done(null, user);
      });
    }
  )
);
