import { Link } from "react-router-dom";
import { TableRow, TableCell } from "@mui/material";

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";

  // For Bootstrap UI:
  /*
  return (
    <tr className="note">
      <td>
        {" "}
        <Link to={`/notes/${note.id}`}>{note.content}</Link>
      </td>

      <td>
        {" "}
        <button onClick={toggleImportance}>{label}</button>
      </td>
    </tr>
  );
  */

  // For Material UI:
  return (
    <TableRow>
      <TableCell>
        <Link to={`/notes/${note.id}`}>{note.content}</Link>
      </TableCell>
      <TableCell>
        <button onClick={toggleImportance}>{label}</button>
      </TableCell>
    </TableRow>
  );
};

export default Note;
