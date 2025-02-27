import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong>{note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch(); // Replaces store.dispatch()
  const notes = useSelector(({ filter, notes }) => {
    return filter === "ALL" // If filter states ALL
      ? notes // Return all notes
      : filter === "IMPORTANT" // Else see if it says important
      ? notes.filter((note) => note.important) // If true, return important notes
      : notes.filter((note) => !note.important); // Otherwise, return nonimportant notes
  });

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => {
            dispatch(toggleImportanceOf(note.id));
          }}
        />
      ))}
    </ul>
  );
};

export default Notes;
