'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'book_id' })
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    user_comment: DataTypes.STRING,
    book_cover: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};