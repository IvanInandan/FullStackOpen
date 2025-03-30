import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

const NoteId = ({ notes }) => {
  const id = useParams().id;

  const match = notes.filter((note) => note.id === id)[0];
  console.log(match);

  // For Bootstrap UI:
  return (
    <Table>
      <tbody>
        <tr>
          <td>Content</td>
          <td>{match.content}</td>
        </tr>

        <tr>
          <td>Id</td>
          <td>{match.id}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default NoteId;
