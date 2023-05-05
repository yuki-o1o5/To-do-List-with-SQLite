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
      // Refetch queries after a successful mutation
      queryClient.refetchQueries();
    },
  });

  const createNewTodo = async (newTodo) => {
    try {
      await createNewTodoMutation.mutateAsync(newTodo);
    } catch (error) {
      // Handle any errors that occur during the mutation
      console.error("Error creating new todo:", error);
    }
  };

  return { createNewTodo };
};

export const useRemoveTodo = (removeNewTodo) => {
  const queryClient = useQueryClient();

  const removeTodoMutation = useMutation(removeNewTodo, {
    onSuccess: () => {
      // Refetch queries after a successful mutation
      queryClient.refetchQueries();
    },
  });

  const removeTodo = async (id) => {
    try {
      await removeTodoMutation.mutateAsync(id);
    } catch (error) {
      // Handle any errors that occur during the mutation
      console.error("Error removing todo:", error);
    }
  };

  return { removeTodo };
};

export const useEditTodo = (updateTodo) => {
  const queryClient = useQueryClient();

  const editTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      // Refetch queries after a successful mutation
      queryClient.refetchQueries();
    },
  });

  const editTodo = async (editedTodoObject) => {
    try {
      await editTodoMutation.mutateAsync(editedTodoObject);
    } catch (error) {
      // Handle any errors that occur during the mutation
      console.error("Error toggling todo:", error);
    }
  };

  return { editTodo };
};

// const toggleTodoMutation = useMutation(updateTodo);
// const handleToggleTodo = async (exitingTodo) => {
//   const editedTodo = {
//     name: exitingTodo.name,
//     isCompleted: !exitingTodo.isCompleted,
//   };
//   await toggleTodoMutation.mutateAsync({
//     id: exitingTodo.id,
//     todo: editedTodo,
//   });
//   await queryClient.refetchQueries();
// };
