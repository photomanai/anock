require("dotenv").config({ path: __dirname + "/../../.env" });

const mongoose = require("mongoose");

const mongoDb = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDb);
    console.log("MongoDB successfully connected");
  } catch (error) {
    console.error("MonogDB have error: " + error);
    process.exit(1);
  }
};

connectDB();
