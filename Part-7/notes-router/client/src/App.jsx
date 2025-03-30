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
import { Nav, Navbar, Button } from "react-bootstrap";
import { Container } from "@mui/material";

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMessage(null);
    }, 5000);

    //clearTimeout(timeout);
  }, [errorMessage]);

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

  /* NO NEED FOR TOGGLABLE COMPONENT ANYMORE
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
*/

  const padding = {
    padding: 5,
  };

  // Link (Nav.Link) defines in 'to' what the URL will change to when clicked
  // Route defines what component is displayed under that URL
  /*
  return (
    <div className="container">
      <Notification message={errorMessage} />

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={padding}>
              home
            </Nav.Link>
            <Nav.Link as={Link} to="/notes" style={padding}>
              notes
            </Nav.Link>
            <Nav.Link as={Link} to="/users" style={padding}>
              users
            </Nav.Link>
          </Nav>

          <Nav>
            {user ? (
              <Nav.Item>
                <span style={{ color: "white", marginRight: "10px" }}>
                  {user.name} logged in
                </span>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                >
                  logout
                </Button>
              </Nav.Item>
            ) : (
              <Nav.Link as={Link} to="/login" style={padding}>
                login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

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
          element={
            <LoginForm
              handleLogin={handleLogin}
              setErrorMessage={setErrorMessage}
            />
          }
        />
      </Routes>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>

      <Footer />
    </div>
  );
  */

  return (
    <Container>
      
    </Container>
  )
};

export default App;
