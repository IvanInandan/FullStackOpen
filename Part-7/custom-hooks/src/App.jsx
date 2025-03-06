/* The following code snippet -->

const App = () => {
  const [leftCounter, setLeftCounter] = useState(0);
  const [rightCounter, setRightCounter] = useState(0);

  return (
    <div>
      <span>{leftCounter}</span>
      <button onClick={() => setLeftCounter(leftCounter + 1)}>
        increase left
      </button>
      <button onClick={() => setRightCounter(rightCounter + 1)}>
        increase right
      </button>
      <span>{rightCounter}</span>
    </div>
  );
};

=================================================================

Can be re-written as the following using custom hooks -->

const useCounter = () => {
  const [value, setValue] = useState(0);

  const increase = () => {
    setValue(value + 1);
  };

  const decrease = () => {
    setValue(value - 1);
  };

  const reset = () => {
    setValue(0);
  };

  return {
    value,
    increase,
    decrease,
    reset,
  };
};

const App = () => {
  const left = useCounter();
  const right = useCounter();

  return (
    <div>
      <span>{left.value}</span>
      <button onClick={left.increase}>increase left</button>
      <button onClick={right.increase}>increase right</button>
      <span>{right.value}</span>
    </div>
  );
};

================================================================

The following can also be re-written: --> 

import { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [height, setHeight] = useState("");

  return (
    <div>
      <form>
        <div>
          name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          birthdate:
          <input
            type="date"
            value={born}
            onChange={(event) => setBorn(event.target.value)}
          />
        </div>
        <div>
          height:
          <input
            type="number"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

================================================================

*/

import { useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const App = () => {
  const name = useField("text");
  const born = useField("date");
  const height = useField("number");

  return (
    <div>
      <form>
        <div>
          name:
          <input {...name} />
        </div>
        <div>
          birthdate:
          <input {...born} />
        </div>
        <div>
          height:
          <input {...height} />
        </div>
      </form>
    </div>
  );
};

export default App;
