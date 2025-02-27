import ReactDOM from "react-dom/client";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";

console.log("Initial States: ", store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Listens for state changes in store, whenever state change log the updated states in store
store.subscribe(() => console.log(store.getState()));
