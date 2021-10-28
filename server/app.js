const path = require("path");
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "..", "build");
const port = process.env.PORT || 3000;
const { init } = require("./schedular");

app.use(express.static(publicPath));

// // Auth middleware
// app.use((req, res, next) => {
//   // -----------------------------------------------------------------------
//   // authentication middleware

//   const auth = { login: "botocean", password: "oceanbot" }; // change this

//   // parse login and password from headers
//   const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
//   const [login, password] = Buffer.from(b64auth, "base64")
//     .toString()
//     .split(":");

//   // Verify login and password are set and correct
//   if (login && password && login === auth.login && password === auth.password) {
//     // Access granted...
//     return next();
//   }

//   // Access denied...
//   res.set("WWW-Authenticate", 'Basic realm="401"'); // change this
//   res.status(401).send("Authentication required."); // custom message

//   // -----------------------------------------------------------------------
// });

// Schedular

init();

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("Server is up!");
});
