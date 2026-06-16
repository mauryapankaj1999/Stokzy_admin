import axiosInstance from "./axiosInstance";


export const getUsers = async () => {
  const response =
    await axiosInstance.get(
      "/users"
    );

  return response.data;
};

export const updateUser =
  async (id, data) => {
    const response =
      await axiosInstance.put(
        `/users/${id}`,
        data
      );

    return response.data;
  };

export const deleteUser =
  async (id) => {
    const response =
      await axiosInstance.delete(
        `/users/${id}`
      );

    return response.data;
  };