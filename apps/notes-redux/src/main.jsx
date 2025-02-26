import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import noteReducer from "./noteReducer";

import { createNote, toggleImportanceOf } from "./noteCreators";

const store = createStore(noteReducer);

const App = () => {
  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value; // event.target."NOTE.VALUE" corresponds to value of <input name="NOTE">
    event.target.note.value = "";
    store.dispatch(createNote(content));
  };

  const toggleImportance = (id) => {
    store.dispatch(toggleImportanceOf(id));
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>

      <ul>
        {store.getState().map((note) => (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} {note.id}{" "}
            <strong>{note.important ? "important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();

store.subscribe(renderApp);
