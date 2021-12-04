const path = require("path");
const express = require("express");
const app = express();
const dotenv = require('dotenv').config()
const publicPath = path.join(__dirname, "..", "build");
const cors = require('cors');
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const { init } = require("./schedular");
const configs  = require("./../src/config");

app.use(express.static(publicPath));
app.use(cors())
app.use(function (req, res, next) {
  res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

init();

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const start = async () => {
  await mongoose.connect(configs.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  app.listen(port, () => {
    console.log(
      'Express server listening on %d mode',
      port,
    )
  });
};

start();
