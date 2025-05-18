const express = require("express");
const router = express.Router();

const controller = require("../controllers/chatController");
const { authenticateToken } = require("../middleWare/authenticateMiddleWare");

router.post("/sender", authenticateToken, controller.senderPost);
router.get("/messages", authenticateToken, controller.getMessageByRoom);

module.exports = router;
