const express = require("express");
const app = express();
const cors = require("cors");
const blogRoutes = require("./controllers/blogs");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/", blogRoutes);

module.exports = app;
