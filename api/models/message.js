const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  userName: { type: String, required: true },
  message: { type: String, required: true },
  roomId: { type: String, required: true },
  date: { type: String, default: Date.now },
});

const message = mongoose.model("message", messageSchema);

module.exports = message;
