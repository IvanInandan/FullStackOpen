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

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const result = await Blog.findByIdAndDelete(request.params.id);
    response.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const updatedFields = request.body;
    console.log("Updated Fields: ", updatedFields);
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedFields,
      {
        new: true,
      }
    );

    if (!updatedBlog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    response.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
