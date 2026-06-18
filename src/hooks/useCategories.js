import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createCategory,
  getCategories,
} from "../api/categoryService";

export const useCategories =
  () => {
    return useQuery({
      queryKey: [
        "categories",
      ],
      queryFn:
        getCategories,
    });
  };

export const useCreateCategory =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        createCategory,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "categories",
          ],
        });
      },
    });
  };

//   export const usegetCategories = () => {
//   return useQuery({
//     queryKey: ["categories"],
//     queryFn: getCategories,
//   });
// };