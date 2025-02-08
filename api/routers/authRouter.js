const express = require("express");
const router = express.Router();

const controller = require("../controllers/authController");
const middleWare = require("../middleWare/authenticateMiddleWare");

router.post("/register", controller.registerPost);
router.post("/login", controller.loginPost);

module.exports = router;
