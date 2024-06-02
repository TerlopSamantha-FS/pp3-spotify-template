const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  },
  {
    sequelize,
    modelName: 'user'
  }
);

module.exports = User;
