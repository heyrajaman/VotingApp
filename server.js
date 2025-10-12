const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;

const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoute");

app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
