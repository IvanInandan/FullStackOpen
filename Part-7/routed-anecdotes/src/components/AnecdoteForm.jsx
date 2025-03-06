import useField from "../hooks/index";
import { useNavigate } from "react-router-dom";

const CreateNew = ({ addNew }) => {
  const navigate = useNavigate();

  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  // Destructures reset function out of object, putting type/value/onChange into a new object (...Props)
  const { reset: contentReset, ...contentProps } = content;
  const { reset: authorReset, ...authorProps } = author;
  const { reset: infoReset, ...infoProps } = info;

  const handleCreate = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    navigate("/anecdotes");
  };

  const handleReset = (e) => {
    e.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...contentProps} />
        </div>
        <div>
          author
          <input {...authorProps} />
        </div>
        <div>
          url for more info
          <input {...infoProps} />
        </div>
        <button onClick={handleCreate}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
