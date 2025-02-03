import { useState } from "react";

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [allInfo, setAllInfo] = useState(false);

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
    deleteBlog(blog.id);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setAllInfo(!allInfo)}>
          {allInfo ? "hide" : "view"}
        </button>
      </div>

      {allInfo && (
        <div>
          <div>{blog.url}</div>
          <div>
            {blog.likes}
            <button onClick={increaseLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <button onClick={removeBlog}>delete</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
