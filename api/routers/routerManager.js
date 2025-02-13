const express = require("express");

const router = express.Router();

const loginRouter = require("./authRouter");
const chatRouter = require("./chatRouter");

router.use("/auth", loginRouter);
router.use("/chat", chatRouter);

module.exports = router;
