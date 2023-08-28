'use strict'
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      //TODO: define associations here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
