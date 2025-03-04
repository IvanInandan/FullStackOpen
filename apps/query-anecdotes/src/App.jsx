import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAnecdotes, voteAnecdote } from "./services/anecdotes";
import {
  useNotificationValue,
  useNotificationDispatch,
} from "./NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["anecdotes"],
      });
    },
  });

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote);

    // Display notification
    dispatch({
      type: "SHOW",
      payload: `${anecdote.id} has been voted on!`,
    });
  };

  // First establish useQuery
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1, // If there is an error, retry getAnecdotes one more time before proceeding to result.isError case.
    // accomplishes this by not setting result.isError to true on fail until it retries once.
  });

  console.log(JSON.parse(JSON.stringify(result)));

  // Then check if in loading state
  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  // If not then check if in error state
  if (result.isError) {
    return (
      <div>anecdote service not available due to problems reaching server</div>
    );
  }

  // Then, the rest as follows assumes it's in success state. No need to list result.isSuccess
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
