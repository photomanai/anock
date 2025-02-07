const express = require("express");

const router = express.Router();

const loginRouter = require("./authRouter");

router.use("/auth", loginRouter);

module.exports = router;
