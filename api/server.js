const express = require("express");
const db = require("./models/db");
const routers = require("./routers/routerManager");
const cors = require("cors");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/api", routers);
app.get("/", (req, res) => {
  res.end("hello node.js");
});

// app.listen(port, "192.168.1.14", () => {
//   console.log(`Server running at http://1192.168.1.14:${port}`);
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
