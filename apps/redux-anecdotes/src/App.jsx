import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

import AnecdoteList from "./components/Anecdotes";
import AnecdotesForm from "./components/AnecdotesForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdotesForm />
    </div>
  );
};

export default App;
