import PropTypes from "prop-types";

import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
  };

  return (
    <div>
      <h2>Create Blog</h2>

      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          Author
          <input
            type="text"
            value={author}
            name="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          URL
          <input
            type="text"
            value={url}
            name="url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
