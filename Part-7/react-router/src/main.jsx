import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
};

const Notes = () => {
  const navigate = useNavigate();

  const navigateNotes = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Notes</h2>
      <button onClick={navigateNotes}>Home</button>
    </div>
  );
};

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
    </div>
  );
};

const App = () => {
  const padding = {
    padding: 5,
  };

  return (
    <>
      {/* When using router, new pages aren't fetched from server when address changes.
      Instead everything exists already and is MANIPULATED/RENDERED depending on link state */}
      <Router>
        {/* Changes url in address bar */}
        <div>
          <Link style={padding} to="/">
            home
          </Link>
          <Link style={padding} to="/notes">
            notes
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
        </div>

        {/* Renders element component based on what url in address bar is */}
        <Routes>
          <Route path="/notes" element={<Notes />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
        </Routes>

        <div>
          <i>Note app, Ivan Inandan 2025</i>
        </div>
      </Router>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
