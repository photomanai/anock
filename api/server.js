const express = require("express");
const db = require("./models/db");
const routers = require("./routers/routerManager");

const app = express();

app.use(express.json());

app.use("/api", routers);

app.listen(8000, () => {
  console.log("Server started 8000 port...");
});
