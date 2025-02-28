//Used for redux toolkit:
import { configureStore } from "@reduxjs/toolkit";

// Used for vanilla redux:
import { createStore, combineReducers } from "redux";

import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

/*
// Used for vanilla redux:
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer,
});

const store = createStore(reducer);
*/

// Used for redux toolkit:
const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

export default store;
