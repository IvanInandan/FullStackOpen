const { info, error } = require("./logger");

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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
