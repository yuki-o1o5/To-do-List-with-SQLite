import { TodoList } from "./components/TodoList";
import "./App.css";
import { useFetchNewTodos } from "./hooks/AppHooks";

export function App() {
  const { todos, isError, error, isLoading } = useFetchNewTodos();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log(error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <h1>todos</h1>
      <div className="toDoContainer">
        <TodoList todos={todos} />
      </div>
    </div>
  );
}
