const formidable = require("formidable");
const nodemailer = require("nodemailer");
const { Article, Author, Comment } = require("../db");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});
const mailOptions = {
  from: process.env.EMAIL_ADDRESS,
  to: process.env.EMAIL_ADDRESS,
  subject: "Test mail",
  text: "Node.js testing mail for GeeksforGeeks", // plain text body
};

module.exports = {
  show: (req, res) => {
    Article.findAll({ include: [Author] }).then((articles) => {
      // console.log(articles);
      res.render("home", { articles });
    });
  },
  showInAdmin: (req, res) => {
    authors = Author.findAll().then((authors) => {
      Article.findAll().then((articles) => {
        // console.log(articles);
        res.render("admin", { articles, authors });
      });
    });
  },
  showOne: (req, res) => {
    const { id } = req.params;
    Article.findByPk(id, { include: [Author, Comment] }).then((article) => {
      res.render("articulo", { article });
    });
  },
  destroy: (req, res) => {
    const { id } = req.params;
    Article.destroy({ where: { id } }).then((articles) => {
      // console.log(articles);
      res.redirect("/admin");
    });
  },
  store: (req, res) => {
    const form = formidable({
      multiples: true,
      uploadDir: `${__dirname}/../public/img`,
      keepExtensions: true,
    });
    form.parse(req, (err, fields, files) => {
      console.log(fields);
      console.log(files.image.path);
      Article.create({ ...fields, image: files.image.path }).then((article) => {
        console.log(files);
        res.redirect("/admin");
        transporter.sendMail(mailOptions, function (err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log("Email sent successfully");
          }
        });
        // console.log(article);
      });
    });
  },
  showInApi: (req, res) => {
    Article.findAll().then((articles) => {
      res.json(articles);
    });
  },
  modify: (req, res) => {
    const { title, content, image, id } = req.body;
    articles = Article.findAll().then((article) => {
      Article.findByPk(id).then((article) => {
        article.update({ title, content, image }).then((article) => {
          res.redirect("/admin");
        });
      });
    });
  },
};

// app.post("/articulos", (req, res) => {

//   });
