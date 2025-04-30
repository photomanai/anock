const express = require("express");
const db = require("./models/db");
const routers = require("./routers/routerManager");
const cors = require("cors");
const io = require("socket.io");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const port = process.env.PORT || 8000;
const ip = process.env.LOCAL_IP || "127.0.0.1";

app.use(cors());
app.use(express.json());

app.use("/api", routers);
app.get("/", (req, res) => {
  res.end("hello node.js");
});

app.listen(port, ip, () => {
  console.log(`Server running at http://${ip}:${port}`);
});
