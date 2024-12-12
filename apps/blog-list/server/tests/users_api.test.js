const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const helper = require("./test_helper");

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "iinandan97",
      name: "Ivan Inandan",
      password: "strongpassword1337",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with proper statuscode and message if username is taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "rootpassword",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    assert(result.body.error.includes("expected `username` to be unique"));
  });

  test("fails if password is less than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "newUser",
      name: "New User",
      password: "1",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    assert(
      result.body.error.includes("password must be longer than 3 characters")
    );
  });

  test("fails if username is less than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "na",
      name: "New User",
      password: "imthebestpassword",
    };

    const result = await api
      .post("/api/users/")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    assert(result.body.error.includes("User validation failed"));
  });
});

after(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
