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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggeduser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(user);
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
      setMessage("Blog cannot be created");
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
      setMessage("Error updating likes");
      setStatus(false);
      setTimeout(() => {
        setMessage(null);
        setStatus(null);
      }, 5000);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggeduser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user); // set user state to user retrieved by loginService function login
      setUsername(""); // reset username state
      setPassword(""); // reset password state
    } catch (exception) {
      setMessage("wrong credentials"); // Set error message
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

  const loginForm = () => (
    <>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );

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
            <Blog key={blog.id} blog={blog} addLike={addLike} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
