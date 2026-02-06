// setup the server
const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the LinkedIn Backend!");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});