const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }

  return null;
};

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const userID = decodedToken.id;

    const user = await User.findById(userID);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: userID,
      likes: body.likes,
    });

    const newBlog = await blog.save();
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();
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
