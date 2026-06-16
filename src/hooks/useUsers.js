import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers, updateUser } from "../api/userApi";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
export const useUpdateUser =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: ({
        id,
        data,
      }) =>
        updateUser(
          id,
          data
        ),

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "users",
            ],
          }
        );
      },
    });
  };

export const useDeleteUser =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteUser,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "users",
            ],
          }
        );
      },
    });
  };