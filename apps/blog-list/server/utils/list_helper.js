const { info, error } = require("./logger");
const _ = require("lodash");

const initialBlogs = [
  {
    title: "This blog sucks!",
    author: "Learose Miranda",
    url: "bestblogs.com",
    likes: 3,
  },
  {
    title: "I write the best blogs.",
    author: "Ivan Inandan",
    url: "theworstblogs.org",
    likes: 6,
  },
  {
    title: "Okay guys, whatever. Let's get this thing going",
    author: "Alec Panatonni",
    url: "blogblog.blogs",
    likes: 1,
  },
];

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    const total = blogs.reduce((sum, blog) => {
      return sum + blog.likes;
    }, 0);

    return total;
  }
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return "n/a";
  } else if (blogs.length === 1) {
    return {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes,
    };
  } else {
    const favorite = blogs.reduce(
      (top, current) => (current.likes > top.likes ? current : top),
      blogs[0]
    );
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes,
    };
  }
};

const mostBlogs = (blogs) => {
  const count = _.countBy(blogs, "author");
  const highestAuthor = _.maxBy(Object.entries(count), ([, value]) => value);

  return {
    Author: highestAuthor[0],
    Blogs: highestAuthor[1],
  };
};

const mostLikes = (blogs) => {
  const groupedBy = _.groupBy(blogs, "author");
  const authorLikes = _.map(groupedBy, (blogs, author) => ({
    author,
    totalLikes: _.sumBy(blogs, "likes"),
  }));
  const mostAuthorLikes = _.maxBy(authorLikes, "totalLikes");

  return {
    Author: mostAuthorLikes.author,
    Likes: mostAuthorLikes.totalLikes,
  };
};

module.exports = {
  initialBlogs,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
