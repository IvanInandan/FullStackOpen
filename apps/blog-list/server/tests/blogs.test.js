const { test, describe } = require("node:test");
const assert = require("node:assert");
const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require("../utils/list_helper");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

test("dummy returns one", () => {
  assert.strictEqual(dummy([]), 1);
});

describe("Total Likes", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(totalLikes([]), 0);
  });

  test("when list only has one blog equals the likes of that", () => {
    assert.strictEqual(totalLikes(listWithOneBlog), 5);
  });

  test("when multiple blogs in list, calculated coorectly", () => {
    assert.strictEqual(totalLikes(blogs), 36);
  });
});

describe("Favorite Blog", () => {
  test("of empty list is n/a", () => {
    assert.strictEqual(favoriteBlog([]), "n/a");
  });

  test("when only one blog, returned as favorite", () => {
    assert.deepStrictEqual(favoriteBlog(listWithOneBlog), {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("when an array of blogs is passed, return most favorite", () => {
    assert.deepStrictEqual(favoriteBlog(blogs), {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });

  describe("Most Blogs", () => {
    test("Return author and occurrence of most blogs written", () => {
      const result = mostBlogs(blogs);
      assert.deepStrictEqual(result, {
        Author: "Robert C. Martin",
        Blogs: 3,
      });
    });
  });

  describe("Most Likes", () => {
    test("Return author with the most likes total", () => {
      const result = mostLikes(blogs);
      assert.deepStrictEqual(result, {
        Author: "Edsger W. Dijkstra",
        Likes: 17,
      });
    });
  });
});
