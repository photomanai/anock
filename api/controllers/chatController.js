const Message = require("../models/message");

module.exports.senderPost = async (req, res) => {
  try {
    const { userName, message } = req.body;
    console.log(req.body); // req.body'yi kontrol et

    const newMessage = new Message({
      userName,
      message,
      date: new Date(), // Eğer date yoksa, şu anki tarihi kullan
    });

    await newMessage.save();
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
