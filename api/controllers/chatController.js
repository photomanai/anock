const Message = require("../models/message");

//Socket io

module.exports.senderPost = async (req, res) => {
  try {
    const { userName, message, roomId } = req.body;
    console.log(req.body);

    const newMessage = new Message({
      userName,
      message,
      roomId,
      date: new Date(),
    });

    await newMessage.save();

    const io = req.app.get("io");
    io.to(roomId).emit("chat:message", newMessage);

    res.status(201).json({ newMessage, message: "Message Sent Successfully" });
  } catch (error) {
    console.error("Error during message sending: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.viwerPost = async (req, res) => {
  try {
    const Messages = await Message.find();
    res.status(201).json({ Messages, message: "Message Sent Successfully" });
  } catch (error) {
    console.error("Error during message calling: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
