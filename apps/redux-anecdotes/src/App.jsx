import { useEffect } from "react";
import { useDispatch } from "react-redux";
import anecdoteService from "./services/anecdotes";
import { set } from "./reducers/anecdoteReducer";

import AnecdoteList from "./components/Anecdotes";
import AnecdotesForm from "./components/AnecdotesForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => {
      dispatch(set(anecdotes));
    });
  });

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
