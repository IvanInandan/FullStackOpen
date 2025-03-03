import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addAnecdote = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const voteAnecdote = async (votedAnecdote) => {
  const id = votedAnecdote.id;
  const response = await axios.put(`${baseUrl}/${id}`, {
    ...votedAnecdote,
    votes: votedAnecdote.votes + 1,
  });
  return response.data;
};

export { getAnecdotes, addAnecdote, voteAnecdote };
