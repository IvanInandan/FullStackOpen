import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAnecdote } from "../services/anecdotes";

const AnecdoteForm = () => {
  // Define query client
  const queryClient = useQueryClient();

  const addAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,

    // When addAnecdote() is successful, proceed to do this where newAnecdote is addAnecdote's return value
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({
        queryKey: ["anecdotes"],
      });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    addAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
