const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fileUpload = require("express-fileupload");

const userRoutes = require("./routes/user");
const gifRoutes = require("./routes/gif");
const articleRoutes = require("./routes/article");

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", gifRoutes);
app.use("/api/v1", articleRoutes);

module.exports = app;
