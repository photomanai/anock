const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true, unique: false },
  password: { type: String, required: true },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
