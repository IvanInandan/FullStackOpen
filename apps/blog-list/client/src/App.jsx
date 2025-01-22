import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogURL, setBlogURL] = useState("");

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

  const createBlog = (event) => {
    event.preventDefault();
    console.log("Creating Blog!");

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogURL,
    };

    blogService.create(newBlog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setBlogTitle("");
      setBlogAuthor("");
      setBlogURL("");
    });
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
      setErrorMessage("wrong credentials"); // Set error message
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000); // After 5 seconds, erase error message
    }
  };

  const handleLogout = () => {
    event.preventDefault();
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
    <>
      <h2>Create Blog</h2>

      <form onSubmit={createBlog}>
        <div>
          Title
          <input
            type="text"
            value={blogTitle}
            name="blogTitle"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>

        <div>
          Author
          <input
            type="text"
            value={blogAuthor}
            name="blogAuthor"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>

        <div>
          URL
          <input
            type="text"
            value={blogURL}
            name="blogURL"
            onChange={({ target }) => setBlogURL(target.value)}
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </>
  );

  return (
    <div>
      <Notification message={errorMessage} />
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
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
