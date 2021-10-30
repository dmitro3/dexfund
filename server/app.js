const path = require("path");
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "..", "build");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const { init } = require("./schedular");
const { configs } = require("./../src/config");

app.use(express.static(publicPath));

// init();

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const start = async () => {
  await mongoose.connect(configs.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log("Successfully connected to db.");
  app.listen(4000, '0.0.0.0', () => {
    console.log("Server is up!");
  });
};

start();
