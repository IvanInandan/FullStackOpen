import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const updateVote = async (id) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`); // Retrieve matched anecdote

  const updatedAnecdote = {
    // Build new anecdote using retrieved data and increase vote by 1
    ...anecdote.data,
    votes: anecdote.data.votes + 1,
  };

  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
  return response.data;
};

export default { getAll, createAnecdote, updateVote };
