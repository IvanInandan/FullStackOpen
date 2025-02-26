import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import noteReducer from "./reducers/noteReducer";

const store = createStore(noteReducer);

// Since App is a child of Provider, Provider allows whole App to access Redux store.
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
