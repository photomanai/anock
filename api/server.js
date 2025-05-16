const express = require("express");
const db = require("./models/db");
const routers = require("./routers/routerManager");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const port = process.env.PORT || 8000;
const ip = process.env.LOCAL_IP || "127.0.0.1";

const path = require("path");
const { request } = require("http");
const chatSocket = require("./sockets/chatSocket");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use("/api", routers);

io.on("connection", (socket) => {
  chatSocket(io, socket);
});

app.get("/", (req, res) => {
  res.end("hello node.js");
});

app.set("io", io);
server.listen(port, ip, () => {
  console.log(`Server running at http://${ip}:${port}`);
});
