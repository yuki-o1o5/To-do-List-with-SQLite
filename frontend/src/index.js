
import React, { createContext, useReducer } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";

export const IndexContext = createContext({});

export const actionTypes = {
  INITIAL_TASK: "INITIAL_TASK",
  // CREATE_TASK: "CREATE_TASK",
  REMOVE_TASK: "REMOVE_TASK",
  TOGGLE_TASK_ISCOMPLETED: "TOGGLE_TASK_ISCOMPLETED",
  EDIT_TASK: "EDIT_TASK",
  CHANGE_FILTER: "CHANGE_FILTER",
};

const initialState = {
  todos: [],
  status: "all",
};


const appStateReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INITIAL_TASK:
      return { ...state, todos: action.payload };

    case actionTypes.CREATE_TASK:
      return { ...state, todos: action.payload };

    case actionTypes.REMOVE_TASK:
      return { ...state, todos: action.payload };

    case actionTypes.TOGGLE_TASK_ISCOMPLETED:
      return { ...state, todos: action.payload };

    // eslint-disable-next-line no-duplicate-case
    case actionTypes.EDIT_TASK:
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
  // <React.StrictMode>
  <IndexContextProvider>
    <App />
  </IndexContextProvider>
  // </React.StrictMode>
);
