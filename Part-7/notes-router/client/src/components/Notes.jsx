import Note from "./Note";
import { Table } from "react-bootstrap";

const Notes = ({ notes, toggleImportanceOf }) => {
  return (
    <div>
      <h2>Notes</h2>
      <Table striped>
        <tbody>
          {notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Notes;
