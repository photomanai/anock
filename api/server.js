const express = require("express");
const db = require("./models/db");
const routers = require("./routers/routerManager");
const cors = require("cors");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routers);

app.listen(8000, () => {
  console.log("Server started 8000 port...");
});
