import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  const id = Number(useParams().id);
  const anecdote = anecdotes.find((anecdote) => anecdote.id === id);

  console.log(anecdote);

  return (
    <div>
      <p>Content: {anecdote.content}</p>
      <p>Author: {anecdote.author}</p>
      <p>Info: {anecdote.info}</p>
      <p>Votes: {anecdote.votes}</p>
      <p>Id: {anecdote.id}</p>
    </div>
  );
};

export default Anecdote;
