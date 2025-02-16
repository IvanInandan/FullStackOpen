const testRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

testRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({}); // Delete all blogs in database
  await User.deleteMany({}); // Delete all users in database

  response.status(204).end();
});

module.exports = testRouter;
