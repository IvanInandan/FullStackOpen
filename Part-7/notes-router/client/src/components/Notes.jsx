import Note from "./Note";
// import { Table } from "react-bootstrap";
import { Table, TableBody, TableContainer, Paper } from "@mui/material";

const Notes = ({ notes, toggleImportanceOf }) => {
  // For Bootstrap UI:
  /*
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
  */

  // For Material UI:
  return (
    <div>
      <h2>Notes</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {notes.map((note) => (
              <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Notes;
