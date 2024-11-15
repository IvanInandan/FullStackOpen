const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", async (request, response, next) => {
  try {
    const blog = new Blog(request.body);

    const newBlog = await blog.save();
    response.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
