// Import Components
import About from "./components/About";
import Footer from "./components/Footer";
import Anecdote from "./components/Anecdote";
import AnecdoteList from "./components/AnecdoteList";
import CreateNew from "./components/AnecdoteForm";
import Notification from "./components/Notification";

// Import Libraries
import { useState, useEffect } from "react";
import { Link, Routes, Route, useParams, useNavigate } from "react-router-dom";

// Import Hooks
import useField from "./hooks/index";

// ----------------------------------------------------------------------------------------------

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState(null);

  // When the state of notification changes, clear it after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [notification]);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`${anecdote.content} has been added!`);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const padding = {
    padding: 5,
  };

  return (
    <div>
      <Notification notification={notification} />
      <h1>Software anecdotes</h1>

      <div>
        <Link to="/anecdotes" style={padding}>
          anecdotes
        </Link>
        <Link to="/about" style={padding}>
          about
        </Link>
        <Link to="/create" style={padding}>
          create new
        </Link>
      </div>

      <Routes>
        <Route
          path="/anecdotes"
          element={<AnecdoteList anecdotes={anecdotes} />}
        />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdotes={anecdotes} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
