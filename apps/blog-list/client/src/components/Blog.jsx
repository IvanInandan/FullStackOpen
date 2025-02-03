import { useState } from "react";

const Blog = ({ blog, addLike }) => {
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
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    addLike(updatedBlog, blog.id);
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
        </div>
      )}
    </div>
  );
};

export default Blog;
