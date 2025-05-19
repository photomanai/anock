const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// TODO: REFRESH Token

module.exports.registerPost = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName.trim() || !password.trim()) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      console.error("This username already exists.");
      return res.status(400).json({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ newUser, message: "Register successful" });
  } catch (error) {
    console.error("Error during registration: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.loginPost = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName.trim() || !password.trim()) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const token = jwt.sign(
        { userId: user._id, userName: user.userName },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.status(200).json({
        message: "Login successful",
        accessToken: token,
        userId: user._id,
        userName: user.userName,
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.protected = (req, res) => {
  res.json({
    message: "Protected data accessed successfully",
    user: req.user,
  });
};
