import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changePassword, deleteUser, getProfile, getUsers, updateProfile, updateUser } from "../api/userApi";

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

  export const useChangePassword =
  () => {
    return useMutation({
      mutationFn:
        changePassword,
    });
  };

  export const useProfile =
  () => {
    return useQuery({
      queryKey: ["profile"],
      queryFn: getProfile,
    });
  };
  export const useUpdateProfile =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        updateProfile,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "profile",
            ],
          }
        );
      },
    });
  };