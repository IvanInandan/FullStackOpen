// Components
import Notification from "./components/Notification";
import Home from "./components/Home";
import Notes from "./components/Notes";
import NoteId from "./components/NoteId";
import Users from "./components/Users";
import Footer from "./components/Footer";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";

// API Services
import noteService from "./services/notes";
import loginService from "./services/login";

// Libraries
import { useState, useEffect, useRef } from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  // Fetch notes from server
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes); // Put data from server into Notes state
    });
  }, []);

  // Adjust visible notes into new notesToShow variable from state that holds all notes
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  // If user is in cache (ie: logged in already), grab user data and set user state
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappuser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(user);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = async (noteObject) => {
    try {
      noteFormRef.current.toggleVisibility();
      const returnedNote = await noteService.create(noteObject);
      setNotes(notes.concat(returnedNote));
    } catch (exception) {
      setErrorMessage(exception.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    console.log("Changing: ", changedNote);

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        console.log("Returned Note: ", returnedNote);
        setNotes(
          notes.map((note) =>
            note.id !== id ? note : { ...returnedNote, user: note.user }
          )
        );
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from the server`
        );

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);

        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleLogin = async (login) => {
    try {
      const user = await loginService.login(login);
      window.localStorage.setItem("loggedNoteappuser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      console.log(user);
      return true;
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return false;
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappuser");
    setUser(null);
  };

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  );

  const noteForm = () => (
    <Togglable buttonLabel="New note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  );

  /*
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          {noteForm()}
        </div>
      )}

      <Notes notes={notesToShow} toggleImportanceOf={toggleImportanceOf} />

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>

      <Footer />
    </div>
  );
  */

  const padding = {
    padding: 5,
  };

  return (
    <div>
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
        {user ? (
          <div>
            <em>{user.name} logged in</em>
            <button onClick={() => handleLogout()}>logout</button>
          </div>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/notes"
          element={
            <Notes notes={notes} toggleImportanceOf={toggleImportanceOf} />
          }
        />
        <Route path="/notes/:id" element={<NoteId notes={notes} />} />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/login"
          element={<LoginForm handleLogin={handleLogin} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
