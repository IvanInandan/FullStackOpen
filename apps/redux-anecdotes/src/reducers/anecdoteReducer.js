import { createSlice } from "@reduxjs/toolkit";

// ===========================================================\

const getId = () => (100000 * Math.random()).toFixed(0);

// Declare initial anecdotes content
const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

// Declared initial anecdotes object, using content above
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

// Map through all anecdotes in array, and change content string to objects constructed with it
const initialState = anecdotesAtStart.map(asObject);

// ===========================================================

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
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
  },
});

export const { add, vote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
