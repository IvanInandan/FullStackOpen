import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  const displayBlogs = () => {
    const response = axios.get("http://localhost:3001/blogs");
    return response.then((response) => response.data);
  };

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    displayBlogs().then((response) => setBlogs(response));
  }, []);

  return (
    <div>
      <h1>
        Hello! Let's go ahead and display some blogs. Click the button below
      </h1>
      <button onClick={displayBlogs}>Click me!</button>
      <p>{blogs.map((blog) => blog)}</p>
    </div>
  );
};

export default App;
