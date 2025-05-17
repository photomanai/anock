const { text } = require("stream/consumers");
const Message = require("../models/message");
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
const ivLength = 16;

const encrypt = (text) => {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
};

const decrypt = (text) => {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = textParts.join(":");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};

module.exports.senderPost = async (req, res) => {
  try {
    const { userName, message, roomId } = req.body;
    console.log(req.body);

    if (!userName?.trim() || !message?.trim() || !roomId?.trim()) {
      console.log("err");
      return res.status(400).json({ message: "All fields are required." });
    }

    const encryptedMessage = encrypt(message);

    const newMessage = new Message({
      userName,
      message: encryptedMessage,
      roomId,
      date: new Date(),
    });

    await newMessage.save();

    const io = req.app.get("io");
    io.to(roomId).emit("chat:message", { ...newMessage.toObject(), message });

    res.status(201).json({ newMessage, message: "Message Sent Successfully" });
  } catch (error) {
    console.error("Error during message sending: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getMessageByRoom = async (req, res) => {
  const { roomId } = req.query;
  const message = await Message.find({ roomId }).sort({ date: 1 });

  const decryptedMessages = message.map((msg) => ({
    ...msg.toObject(),
    message: decrypt(msg.message),
  }));
  res.status(201).json(decryptedMessages);
};
