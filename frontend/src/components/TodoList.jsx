import { HiOutlineXMark } from "react-icons/hi2";
import React, { useContext, useMemo } from "react";
import "./TodoList.css";
import { actionTypes } from "../index";
import { IndexContext } from "..";
import {
  fetchNewTodo,
  postNewTodo,
  removeNewTodo,
  updateTodo,
} from "../utilities/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCreateNewTodo, useMutationPost } from "../hooks/AppHooks";

export function TodoList({ todos }) {
  const queryClient = useQueryClient();
  const { state, dispatch } = useContext(IndexContext);
  // ----------------------------------------------------------------
  // Change todos by the status
  // todos.isCompleted = false => "active"
  // todos.isCompleted = true  => "completed"
  // ----------------------------------------------------------------
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (state.status === "active") {
        return !todo.isCompleted;
      } else if (state.status === "completed") {
        return todo.isCompleted;
      } else {
        return true;
      }
    });
  }, [state.status, todos]);

  // const createNewTodoMutation = useMutation(postNewTodo);
  const { createNewTodo } = useCreateNewTodo(postNewTodo);
  const handleCreateNewTodo = async (event) => {
    const newTodo = {
      name: event.target.value,
      isCompleted: false,
    };

    await createNewTodo(newTodo);
    // await createNewTodoMutation.mutateAsync(newTodo);
    // await queryClient.refetchQueries();
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
            className={state.status === "all" ? "button active" : "button"}
            onClick={() =>
              dispatch({ type: actionTypes.CHANGE_FILTER, payload: "all" })
            }
          >
            All
          </button>
          <button
            className={state.status === "active" ? "button active" : "button"}
            onClick={() =>
              dispatch({ type: actionTypes.CHANGE_FILTER, payload: "active" })
            }
          >
            Actives
          </button>
          <button
            className={
              state.status === "completed" ? "button active" : "button"
            }
            onClick={() =>
              dispatch({
                type: actionTypes.CHANGE_FILTER,
                payload: "completed",
              })
            }
          >
            Completed
          </button>
        </div>
      </div>
    </>
  );
}

function Todo({ eachTodo }) {
  const queryClient = useQueryClient();
  // ----------------------------------------------------------------
  // Prevent line break when I click the enter key
  // ----------------------------------------------------------------
  const preventDefault = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  // const handleRemoveNewTodo = async (id) => {
  //   await removeNewTodo(id);
  //   await fetchNewTodo();
  //   // dispatch({
  //   //   type: actionTypes.HANDLE_REDUCER,
  //   //   payload: newDataFromServer,
  //   // });
  // };

  const removeTodoMutation = useMutation(removeNewTodo);
  const handleRemoveNewTodo = async (id) => {
    await removeTodoMutation.mutateAsync(id);
    await queryClient.refetchQueries();
  };

  const toggleTodoMutation = useMutation(updateTodo);
  const handleToggleTodo = async (exitingTodo) => {
    const editedTodo = {
      name: exitingTodo.name,
      isCompleted: !exitingTodo.isCompleted,
    };
    await toggleTodoMutation.mutateAsync({
      id: exitingTodo.id,
      todo: editedTodo,
    });
    await queryClient.refetchQueries();
  };

  const handleEditTodo = async (exitingTodo, value) => {
    if (value.length === 0) {
      await removeTodoMutation.mutateAsync(exitingTodo.id);
    } else {
      const editedTodo = {
        name: value,
        isCompleted: exitingTodo.isCompleted,
      };
      await toggleTodoMutation.mutateAsync({
        id: exitingTodo.id,
        todo: editedTodo,
      });
      await queryClient.refetchQueries();
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
