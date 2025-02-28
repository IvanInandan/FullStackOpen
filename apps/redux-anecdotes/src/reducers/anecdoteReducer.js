import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    add(state, action) {
      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0,
      };

      return [...state, newAnecdote];
    },

    vote(state, action) {
      const id = action.payload;

      const voteAnecdote = state.find((anecdote) => anecdote.id === id);

      const updatedAnecdote = {
        ...voteAnecdote,
        votes: voteAnecdote.votes + 1,
      };

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      );
    },

    set(state, action) {
      return action.payload;
    },
  },
});

export const { add, vote, set } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
