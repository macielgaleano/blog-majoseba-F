require("dotenv").config();
const express = require("express");

//const flash = require("connect-flash");
const routes = require("./routes");
const authRouter = require("./authRouter");
const { initialArticles, initialAuthors } = require("./initialContent");

const db = require("./db");
const app = express();
//app.use(flash());
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//const passport = require("./config/passport/passport");
/* 
db.sequelize
  .sync({ force: true })
  .then(() => db.Author.bulkCreate(initialAuthors()))
  .then(() => db.Article.bulkCreate(initialArticles()));
 */
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());

//For passport
app.use(
  session({
    secret: "KoiGallardo",
    resave: false,
    saveUninitialized: true,
  })
); //session secret

app.use(passport.initialize());
app.use(passport.session());

///
const { Article, Author, Comment } = require("./db");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      Author.findOne({ where: { email: email } })
        .then((err, autor) => {
          console.log(`AUTOR : ${autor}`);
          if (err) {
            return done(err);
          }

          if (!autor) {
            return done(null, false);
          }
          /*  if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          } */
          console.log("LocalStrategy - User OK");
          console.log(autor);
          return done(null, autor);
        })
        .catch((err) => console.log("error"));
    }
  )
);
passport.serializeUser(function (user, done) {
  console.log("Serializar Usuario");
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  console.log("Deserializar Usuario");
  Author.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, user);
    });
});
////
app.use(authRouter);
app.use(routes);

app.listen(process.env.APP_PORT, () =>
  console.log(`servidor escuchando en el puerto ${process.env.APP_PORT}`)
);
