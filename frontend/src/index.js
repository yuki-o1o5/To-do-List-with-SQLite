import React, { createContext, useReducer } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";

export const IndexContext = createContext({});

export const actionTypes = {
  HANDLE_REDUCER: "HANDLE_REDUCER",
  CHANGE_FILTER: "CHANGE_FILTER",
};

const initialState = {
  todos: [],
  status: "all",
};

const appStateReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_REDUCER:
      return { ...state, todos: action.payload };
    case actionTypes.CHANGE_FILTER:
      // all, active, completed
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

const IndexContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  return (
    <IndexContext.Provider value={{ state, dispatch }}>
      {children}
    </IndexContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <IndexContextProvider>
    <App />
  </IndexContextProvider>
  </React.StrictMode>
);
