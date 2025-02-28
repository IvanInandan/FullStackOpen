import { useDispatch } from "react-redux";
import anecdoteService from "../services/anecdotes";
import { append } from "../reducers/anecdoteReducer";
import { setNotif } from "../reducers/notificationReducer";

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    const newAnecdote = await anecdoteService.createAnecdote(content);

    dispatch(append(newAnecdote));
    dispatch(setNotif(`Added: ${content}`));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdotesForm;
