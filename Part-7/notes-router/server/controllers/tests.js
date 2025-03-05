const testsRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");

testsRouter.post("/reset", async (request, response) => {
  await Note.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = testsRouter;
