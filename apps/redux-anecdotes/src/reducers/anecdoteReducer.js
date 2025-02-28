import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

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

    append(state, action) {
      state.push(action.payload);
    },

    set(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    try {
      const anecdotes = await anecdoteService.getAll();
      dispatch(set(anecdotes));
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    try {
      const newAnecdote = await anecdoteService.createAnecdote(content);
      dispatch(append(newAnecdote));
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    try {
      const anecdote = await anecdoteService.updateVote(id);
      dispatch(vote(anecdote.id));
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };
};

export const { add, vote, append, set } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
