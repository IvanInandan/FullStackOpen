import { useState } from "react";

const Blog = ({ blog }) => {
  const [allInfo, setAllInfo] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  console.log(blog);

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
          <div>{blog.likes}</div>
          <div>{blog.id}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
