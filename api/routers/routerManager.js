const express = require("express");

const router = express.Router();

const authRouter = require("./authRouter");
const chatRouter = require("./chatRouter");

router.use("/auth", authRouter);
router.use("/chat", chatRouter);

module.exports = router;
