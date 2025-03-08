import { Link } from "react-router-dom";

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";

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
};

export default Note;
