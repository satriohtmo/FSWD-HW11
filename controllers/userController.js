const { User, Todo } = require("../models");
const { generateToken } = require("../helpers/jwt");
const bcrypt = require("../helpers/bcrypt");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "EmailRequired" };
      } else if (!password) {
        throw { name: "PasswordRequired" };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Unauthorized" };
      }
      const validPassword = bcrypt.comparePassword(password, user.password);
      if (!validPassword) {
        throw { name: "Unauthorized" };
      }
      const payload = { id: user.id };
      const token = generateToken(payload);
      res.status(200).json({ statusCode: 200, access_token: token, user_name: user.user_name });
    } catch (err) {
      next(err);
    }
  }

  static async myList(req, res, next) {
    try {
      const todo = await User.findAll({
        where: { id: req.user.id },
        include: [{ model: Todo, attributes: ["list", "description"] }],
        attributes: {
          exclude: ["id", "password", "createdAt", "updatedAt"],
        },
      });
      res.status(200).json({ status_code: 200, data: todo });
    } catch (err) {
      next(err);
    }
  }

  static async dataUser(req, res, next) {
    try {
      const user = await User.findAll();
      res.status(200).json({ status: 200, data: user });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
