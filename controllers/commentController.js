const { Article, Author, Comment } = require('../db');

module.exports = {
  store: (req, res) => {
    const { content } = req.body;
    const articleId = req.params.id;
    Comment.create({ content, articleId }).then(comment => {
      // console.log(comment);
      res.redirect(`/articulo/${articleId}`);
    });
  },
};
