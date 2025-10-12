const mongoose = require("mongoose");
require("dotenv").config();

// const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGO_URL;
mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const db = mongoose.connection;

db.on("disconnected", () => {
  console.log("MongoDB is disconnected");
});

module.exports = db;
