const bcrypt = require("bcrypt");
const User = require("../models/user");
const RefreshToken = require("../models/refreshToken");
const jwt = require("jsonwebtoken");
const message = require("../models/message");

// TODO: REFRESH Token

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      userName: user.userName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports.loginPost = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (
      typeof userName !== "string" ||
      !userName.trim() ||
      typeof password !== "string" ||
      !password.trim()
    ) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const user = await User.findOne({ userName: userName.trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 gün sonrası

    await RefreshToken.findOneAndUpdate(
      { userId: user._id },
      {
        token: refreshToken,
        expires_at: expiresAt,
      },
      { upsert: true, new: true }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      userId: user._id,
      userName: user.userName,
    });
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

module.exports.refreshToken = async (req, res) => {
  const token = req.cookie.refreshToken;

  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(payload.userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    const newAccessToken = (generateAccessToken = generateAccessToken(user));

    res.status(201).json({ accessToken: newAccessToken });
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

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
