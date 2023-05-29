const express = require("express");
const router = express.Router();
const todo = require("./todo");
const user = require("./user");
const userController = require("../controllers/userController");

// router.post("/register", controllerUser.register);
router.post("/login", userController.login);

router.use("/todo", todo);
router.use("/user", user);

module.exports = router;
