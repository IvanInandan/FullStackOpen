import Display from "./components/Display";
import Button from "./components/Button";

const App = () => {
  return (
    <div>
      <Display />
      <div>
        <Button type="INC" label="+"></Button>
        <Button type="DEC" label="-"></Button>
        <Button type="ZERO" label="0"></Button>
      </div>
    </div>
  );
};

export default App;
