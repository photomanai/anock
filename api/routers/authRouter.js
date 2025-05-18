const express = require("express");
const router = express.Router();

const controller = require("../controllers/authController");
const { authenticateToken } = require("../middleWare/authenticateMiddleWare");

router.post("/register", controller.registerPost);
router.post("/login", controller.loginPost);
router.get("/protected", authenticateToken, controller.protected);

module.exports = router;
