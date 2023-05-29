"use strict";
const { Model } = require("sequelize");

const bcrypt = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo);
    }
  }
  User.init(
    {
      user_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(user, option) {
          user.password = bcrypt.hashPassword(user.password, 8);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
