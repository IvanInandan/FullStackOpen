import ReactDOM from "react-dom/client";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";

console.log("Initial Store: ", store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
