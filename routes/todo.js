const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/", todoController.getAllTodo);
router.get("/:id", todoController.getTodoById);
router.post("/", todoController.createTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deletTodo);

module.exports = router;
