/* eslint-disable array-callback-return */
import { useContext, useEffect } from "react";
import { TodoList } from "./components/TodoList";
import "./App.css";
import { IndexContext, actionTypes } from ".";

export function App() {
  const { dispatch } = useContext(IndexContext);

  useEffect(() => {
    // (async () => {
    //   await fetchInitialNewTodos();
    // })();

    fetchInitialNewTodos()
      .then(() => {
        // do nothing
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const fetchInitialNewTodos = async () => {
    try {
      const res = await fetch("http://localhost:3001/todos");
      const data = await res.json();
      dispatch({
        type: actionTypes.HANDLE_REDUCER,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <h1>todos</h1>
      <div className="toDoContainer">
        <TodoList />
      </div>
    </div>
  );
}
