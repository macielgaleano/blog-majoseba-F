const Sequelize = require("sequelize");
const ArticleModel = require("./models/article.js");
const AuthorModel = require("./models/author.js");
const CommentModel = require("./models/comment.js");
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    logging: false,
  }
);

const Article = ArticleModel(sequelize, Sequelize);
const Author = AuthorModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);

Article.belongsTo(Author);
Article.hasMany(Comment);
Author.hasMany(Article);
Comment.belongsTo(Article);

module.exports = {
  sequelize,
  Sequelize,
  Article,
  Author,
  Comment,
};
