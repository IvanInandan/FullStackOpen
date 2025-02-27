import AnecdoteList from "./components/Anecdotes";
import AnecdotesForm from "./components/AnecdotesForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {
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
