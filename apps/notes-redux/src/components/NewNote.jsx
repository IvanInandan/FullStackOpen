import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";

const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value; // event.target."NOTE.VALUE" corresponds to value of <input name="NOTE">
    event.target.note.value = "";

    dispatch(createNote(content));
  };

  return (
    <form onSubmit={addNote}>
      <input type="text" name="note" />
      <button type="submit">add</button>
    </form>
  );
};

export default NewNote;
