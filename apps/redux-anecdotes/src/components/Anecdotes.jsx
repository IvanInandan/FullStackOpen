import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotif } from "../reducers/notificationReducer";

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

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter((anecdote) => anecdote.content.includes(filter))
  );

  const dispatch = useDispatch();

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteAnecdote(anecdote.id));
            dispatch(setNotif(`Voted: ${anecdote.id}`));
          }}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
