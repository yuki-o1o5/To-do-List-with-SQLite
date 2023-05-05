import React, { createContext, useReducer } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const IndexContext = createContext({});

export const actionTypes = {
  CHANGE_FILTER: "CHANGE_FILTER",
};

const initialState = {
  status: "all",
};

const appStateReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_FILTER:
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

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <IndexContextProvider>
        <App />
      </IndexContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
