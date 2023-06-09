import { HiOutlineXMark } from "react-icons/hi2";
import React, { useMemo, useState } from "react";
import "./TodoList.css";
import { postNewTodo, removeNewTodo, updateTodo } from "../api/api";
import { useCreateNewTodo, useEditTodo, useRemoveTodo } from "../hooks/hooks";

export function TodoList({ todos }) {
  const [status, setStatus] = useState("all");
  // ----------------------------------------------------------------
  // Change todos by the status
  // todos.isCompleted = false => "active"
  // todos.isCompleted = true  => "completed"
  // ----------------------------------------------------------------
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (status === "active") {
        return !todo.isCompleted;
      } else if (status === "completed") {
        return todo.isCompleted;
      } else {
        return true;
      }
    });
  }, [status, todos]);

  const { createNewTodo } = useCreateNewTodo(postNewTodo);
  const handleCreateNewTodo = async (event) => {
    const newTodo = {
      name: event.target.value,
      isCompleted: false,
    };

    await createNewTodo(newTodo);
    event.target.value = "";
  };

  return (
    <>
      <input
        type="text"
        className="newInput"
        placeholder="What needs to be done?"
        onKeyDown={(event) => {
          if (event.target.value.length > 0 && event.key === "Enter") {
            handleCreateNewTodo(event);
          }
        }}
        autoFocus
      />
      {filteredTodos.map((eachTodo, index) => {
        return <Todo eachTodo={eachTodo} key={index} />;
      })}

      <div className="footerContainer">
        <div className="itemNumber">
          {todos.filter((todo) => !todo.isCompleted).length < 2
            ? `${todos.filter((todo) => !todo.isCompleted).length} task left`
            : `${todos.filter((todo) => !todo.isCompleted).length} tasks left `}
        </div>
        <div className="buttonContainer">
          <button
            className={status === "all" ? "button active" : "button"}
            onClick={() => setStatus("all")}
          >
            All
          </button>
          <button
            className={status === "active" ? "button active" : "button"}
            onClick={() => setStatus("active")}
          >
            Actives
          </button>
          <button
            className={status === "completed" ? "button active" : "button"}
            onClick={() => setStatus("completed")}
          >
            Completed
          </button>
        </div>
      </div>
    </>
  );
}

function Todo({ eachTodo }) {
  // ----------------------------------------------------------------
  // Prevent line break when I click the enter key
  // ----------------------------------------------------------------
  const preventDefault = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const { removeTodo } = useRemoveTodo(removeNewTodo);
  const handleRemoveNewTodo = async (id) => {
    await removeTodo(id);
  };

  const { editTodo } = useEditTodo(updateTodo);
  const handleToggleTodo = async (exitingTodo) => {
    const editedTodo = {
      name: exitingTodo.name,
      isCompleted: !exitingTodo.isCompleted,
    };
    await editTodo({
      id: exitingTodo.id,
      todo: editedTodo,
    });
  };

  const handleEditTodo = async (exitingTodo, value) => {
    if (value.length === 0) {
      await removeTodo(exitingTodo.id);
    } else {
      const editedTodo = {
        name: value,
        isCompleted: exitingTodo.isCompleted,
      };
      await editTodo({
        id: exitingTodo.id,
        todo: editedTodo,
      });
    }
  };

  return (
    <div className="toDoControler">
      <div className="writtenTaskContainer">
        <input
          type="checkbox"
          checked={eachTodo.isCompleted}
          onChange={() => handleToggleTodo(eachTodo)}
        />
        <label
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={(event) => handleEditTodo(eachTodo, event.target.textContent)}
          onKeyDown={preventDefault}
        >
          {eachTodo.name}
        </label>
      </div>
      <button
        className="removeButton"
        onClick={() => handleRemoveNewTodo(eachTodo.id)}
      >
        <HiOutlineXMark />
      </button>
    </div>
  );
}
