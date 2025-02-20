'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Book, { foreignKey: 'user_id' })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};