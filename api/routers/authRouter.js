const express = require("express");
const router = express.Router();

const controller = require("../controllers/authController");

router.post("/register", controller.registerPost);
router.post("/login", controller.loginPost);

module.exports = router;
