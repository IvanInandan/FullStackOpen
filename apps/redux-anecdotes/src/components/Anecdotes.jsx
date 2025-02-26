import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        Votes: {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(vote(anecdote.id));
          }}
        />
      ))}
    </div>
  );
};

export default Anecdotes;
