const express = require("express");
const db = require("./models/db");
const routers = require("./routers/routerManager");
const cors = require("cors");

const http = require("http");
const socketIo = require("socket.io");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

app.use("/api", routers);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("newMessage", async (messageData) => {
    try {
      // Mesajı MongoDB'ye kaydet
      const savedMessage = await saveMessage(messageData);

      // Yeni mesajları tüm bağlı istemcilere gönder
      io.emit("message", savedMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.listen(8000, () => {
  console.log("Server started 8000 port...");
});
