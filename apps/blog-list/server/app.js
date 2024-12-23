require("dotenv").config();
const config = require("./utils/config");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const blogRoutes = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
require("express-async-errors");

const url = config.MONGODB_URI;
console.log("App.js -- connecting to", url);

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => {
    console.log("App.js -- connected to mongoDB");
  })
  .catch((error) => {
    console.log("App.js -- error connecting to mongoDB", error);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use("/api/blogs", blogRoutes);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
