const { Todo, User } = require("../models");

class Controller {
  static async getAllTodo(req, res, next) {
    try {
      const todo = await Todo.findAll({
        include: [{ model: User, attributes: ["user_name"] }],
        attributes: {
          exclude: ["id", "UserId", "createdAt", "updatedAt"],
        },
      });
      res.status(200).json({ status_code: 200, data: todo });
    } catch (err) {
      next(err);
    }
  }

  static async createTodo(req, res, next) {
    try {
      const { id } = req.user;
      const { list, description } = req.body;
      const todo = await Todo.create({
        list,
        description,
        UserId: +id,
      });
      res.status(201).json({
        message: "Todo created successfully",
        data: todo,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getTodoById(req, res, next) {
    try {
      const { id } = req.params;
      const todo = await Todo.findByPk(id);
      if (todo === null) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ data: todo });
    } catch (err) {
      next(err);
    }
  }

  static async updateTodo(req, res, next) {
    try {
      const { id } = req.params;
      const { list, description } = req.body;
      const updateTodo = Todo.update(
        {
          list,
          description,
        },
        { where: { id } }
      );
      res.status(200).json({ data: updateTodo });
    } catch (err) {
      next(err);
    }
  }

  static async deletTodo(req, res, next) {
    try {
      const { id } = req.params;
      const deleteTodo = await Todo.destroy({ where: { id } });
      if (deleteTodo <= 0) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ msg: `todo with id: ${id} deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
