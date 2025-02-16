import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggeduser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const createBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog);
      blogFormRef.current.toggleVisibility(); // Only toggle visibility of form after successful creation
      setBlogs(blogs.concat(returnedBlog));

      setMessage("Blog successfully created");
      setStatus(true);
      setTimeout(() => {
        setMessage(null);
        setStatus(null);
      }, 5000);
    } catch (exception) {
      setMessage(exception.response.data.error);
      setStatus(false);
      setTimeout(() => {
        setMessage(null);
        setStatus(null);
      }, 5000);
    }
  };

  const deleteBlog = async (id) => {
    try {
      console.log("Attempting to delete blog");
      const deletedBlog = await blogService.remove(id);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));

      setMessage("Blog successfully deleted");
      setStatus(true);
      setTimeout(() => {
        setMessage(null);
        setStatus(null);
      }, 5000);
    } catch (exception) {
      setMessage(exception.response.data.error);
      setStatus(false);
      setTimeout(() => {
        setMessage(null);
        setStatus(null);
      }, 5000);
    }
  };

  const addLike = async (updatedBlog, id) => {
    try {
      const returnedBlog = await blogService.update(updatedBlog, id);

      setBlogs((prevBlogs) => {
        // Update the blog in the array
        const updatedBlogs = prevBlogs.map((blog) =>
          blog.id === returnedBlog.id
            ? { ...returnedBlog, user: blog.user }
            : blog
        );

        // Sort the blogs by likes in descending order
        return updatedBlogs.sort((a, b) => b.likes - a.likes);
      });

      setMessage("Increased like counter!");
      setStatus(true);
      setTimeout(() => {
        setMessage(null);
        setStatus(null);
      }, 5000);
    } catch (exception) {
      setMessage(exception.response.data.error);
      setStatus(false);
      setTimeout(() => {
        setMessage(null);
        setStatus(null);
      }, 5000);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggeduser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user); // set user state to user retrieved by loginService function login
    } catch (exception) {
      setMessage(exception.response.data.error);
      setStatus(false);
      setTimeout(() => {
        setMessage(null);
        setStatus(null);
      }, 5000); // After 5 seconds, erase error message
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggeduser");
    setUser(null);
  };

  const loginForm = () => <LoginForm handleLogin={handleLogin} />;

  const blogForm = () => (
    <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  );

  return (
    <div>
      <Notification message={message} status={status} />
      {!user && loginForm()}
      {user && (
        <>
          <p>
            {user.name} is logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          {blogForm()}

          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              addLike={addLike}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
