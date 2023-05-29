const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
router.use(authentication);

router.get("/", userController.dataUser);
router.get("/myList", userController.myList);

module.exports = router;
