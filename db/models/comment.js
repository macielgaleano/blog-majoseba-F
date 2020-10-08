module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Comment;
};
