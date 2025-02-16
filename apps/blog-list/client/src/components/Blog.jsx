import { useState } from "react";

import PropTypes from "prop-types";

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [allInfo, setAllInfo] = useState(false);
  const isVisible = blog.user.id == user.id ? true : false; // If blog creator ID matches logged in user, then toggle show flag

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const increaseLike = (event) => {
    event.preventDefault();

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    addLike(updatedBlog, blog.id);
  };

  const removeBlog = (event) => {
    event.preventDefault();

    if (window.confirm("Do you really want to delete this blog?")) {
      deleteBlog(blog.id);
    }
  };

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  return (
    <div className="blog" style={blogStyle}>
      <div className="info">
        <span>{blog.title}</span>
        <span>{blog.author}</span>
        <button className="toggleVis" onClick={() => setAllInfo(!allInfo)}>
          {allInfo ? "hide" : "view"}
        </button>
      </div>

      {allInfo && (
        <div className="more-info">
          <div>
            <span>{blog.url}</span>
          </div>
          <div>
            <span>{blog.likes}</span>
            <button className="likeBlog" onClick={increaseLike}>
              like
            </button>
          </div>
          <div>
            <span>{blog.user.name}</span>
          </div>
          {isVisible && <button onClick={removeBlog}>delete</button>}
        </div>
      )}
    </div>
  );
};

export default Blog;
