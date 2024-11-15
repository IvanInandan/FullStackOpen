const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("../utils/list_helper");
const Blog = require("../models/blog");
const { raw } = require("express");

// beforeEach function runs before each and every test suite. Used to initialize database
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("Blogs are returned as JSON", async () => {
  const blogs = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("There are three blogs", async () => {
  const blogs = await api.get("/api/blogs");
  assert.strictEqual(blogs.body.length, helper.initialBlogs.length);
});

test("First blog is by Learose Miranda", async () => {
  const blogs = await api.get("/api/blogs");
  const contents = blogs.body.map((blog) => blog.author);
  assert.strictEqual(contents[0], "Learose Miranda");
});

test("Field 'id' exists", async () => {
  const blogs = await api.get("/api/blogs");
  const exists = blogs.body[0].hasOwnProperty("id");
  assert.strictEqual(exists, true);
});

test("A valid blog can be added to the database", async () => {
  const newBlog = {
    title: "Hello, I am a new note!",
    author: "Tyler Nishida",
    url: "newnote.dev",
    likes: 666,
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const updatedDb = await api.get("/api/blogs");
  assert.strictEqual(updatedDb.body.length, helper.initialBlogs.length + 1);
});

test("An invalid blog can't be added to the database, missing title", async () => {
  const newBlog = {
    author: "Mark Guiriba",
    url: "invalidblog.io",
    likes: "0",
  };

  const response = await api.post("/api/blogs").send(newBlog).expect(400);
});

test("An invalid blog can't be added to the database, missing url", async () => {
  const newBlog = {
    title: "Oh no, I'm missing a URL!",
    author: "Annalysa Nishida",
    likes: "12",
  };

  const response = await api.post("/api/blogs").send(newBlog).expect(400);
});

test("If a blog is passed without likes default value to 0", async () => {
  const newBlog = {
    title: "I'm a blog with zero likes!",
    author: "Mister No Name",
    url: "noonelikesme.net",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

after(async () => {
  await mongoose.connection.close();
});
