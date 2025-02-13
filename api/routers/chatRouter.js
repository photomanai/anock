const express = require("express");
const router = express.Router();

const controller = require("../controllers/chatController");

router.post("/sender", controller.senderPost);
router.post("/viewer", controller.viwerPost);

module.exports = router;
