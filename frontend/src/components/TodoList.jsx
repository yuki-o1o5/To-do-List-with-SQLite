import { HiOutlineXMark } from "react-icons/hi2";
import React, { useContext, useMemo } from "react";
import "./TodoList.css";
import { actionTypes } from "../index";
import { IndexContext } from "..";
import {
  fetchNewTodo,
  postNewTodo,
  removeNewTodo,
  toggleUpdateTodo,
  updateTodo,
} from "../utilities/api";

export function TodoList() {
  const { state, dispatch } = useContext(IndexContext);
  // ----------------------------------------------------------------
  // Change todos by the status
  // todos.isCompleted = false => "active"
  // todos.isCompleted = true  => "completed"
  // ----------------------------------------------------------------
  const filteredTodos = useMemo(() => {
    return state.todos.filter((todo) => {
      if (state.status === "active") {
        return !todo.isCompleted;
      } else if (state.status === "completed") {
        return todo.isCompleted;
      } else {
        return true;
      }
    });
  }, [state.status, state.todos]);

  const handleCreateNewTodo = async (event) => {
    const newTodo = {
      name: event.target.value,
      isCompleted: false,
    };

    await postNewTodo(newTodo);

    const newDataFromServer = await fetchNewTodo();
    dispatch({
      type: actionTypes.CREATE_TASK,
      payload: newDataFromServer,
    });

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
          {state.todos.filter((todo) => !todo.isCompleted).length < 2
            ? `${
                state.todos.filter((todo) => !todo.isCompleted).length
              } task left`
            : `${
                state.todos.filter((todo) => !todo.isCompleted).length
              } tasks left `}
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
  const { state, dispatch } = useContext(IndexContext);
  // ----------------------------------------------------------------
  // Prevent line break when I click the enter key
  // ----------------------------------------------------------------
  const preventDefault = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleRemoveNewTodo = async (id) => {
    await removeNewTodo(id);
    const newDataFromServer = await fetchNewTodo();
    dispatch({
      type: actionTypes.REMOVE_TASK,
      payload: newDataFromServer,
    });
  };

  const handleToggleTodo = async (exitingTodo) => {
    const editedTodo = {
      name: exitingTodo.name,
      isCompleted: !exitingTodo.isCompleted,
    };
    await updateTodo(exitingTodo.id, editedTodo);
    const newDataFromServer = await fetchNewTodo();
    dispatch({
      type: actionTypes.TOGGLE_TASK_ISCOMPLETED,
      payload: newDataFromServer,
    });
  };

  const handleEditTodo = async (exitingTodo, value) => {
    if (value.length === 0) {
      await handleRemoveNewTodo(exitingTodo.id);
    } else {
      const editedTodo = {
        name: value,
        isCompleted: exitingTodo.isCompleted,
      };
      await updateTodo(exitingTodo.id, editedTodo);
      const newDataFromServer = await fetchNewTodo();
      dispatch({
        type: actionTypes.EDIT_TASK,
        payload: newDataFromServer,
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
          // dispatch({
          //   type: actionTypes.EDIT_TASK,
          //   payload: {
          //     value: event.target.textContent,
          //     id: eachTodo.id,
          //   },
          // })
          onKeyDown={preventDefault}
        >
          {eachTodo.name}
        </label>
      </div>
      <button
        className="removeButton"
        // onClick={() =>
        //   dispatch({ type: actionTypes.REMOVE_TASK, payload: eachTodo.id })
        // }
        onClick={() => handleRemoveNewTodo(eachTodo.id)}
      >
        <HiOutlineXMark />
      </button>
    </div>
  );
}