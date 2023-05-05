import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNewTodo, postNewTodo } from "../utilities/api";

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
