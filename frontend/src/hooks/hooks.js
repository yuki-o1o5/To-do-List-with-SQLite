import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNewTodo } from "../api/api";

export const useFetchNewTodos = () => {
  const {
    data: todos,
    isError,
    error,
    isLoading,
  } = useQuery(["todos"], fetchNewTodo);

  return { todos, isError, error, isLoading };
};

export const useCreateNewTodo = (postNewTodo) => {
  const queryClient = useQueryClient();

  const createNewTodoMutation = useMutation(postNewTodo, {
    onSuccess: () => {
      queryClient.refetchQueries();
    },
  });

  const createNewTodo = async (newTodo) => {
    try {
      await createNewTodoMutation.mutateAsync(newTodo);
    } catch (error) {
      console.error("Error creating new todo:", error);
    }
  };

  return { createNewTodo };
};

export const useRemoveTodo = (removeNewTodo) => {
  const queryClient = useQueryClient();

  const removeTodoMutation = useMutation(removeNewTodo, {
    onSuccess: () => {
      queryClient.refetchQueries();
    },
  });

  const removeTodo = async (id) => {
    try {
      await removeTodoMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  return { removeTodo };
};

export const useEditTodo = (updateTodo) => {
  const queryClient = useQueryClient();

  const editTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.refetchQueries();
    },
  });

  const editTodo = async (editedTodoObject) => {
    try {
      await editTodoMutation.mutateAsync(editedTodoObject);
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  return { editTodo };
};
