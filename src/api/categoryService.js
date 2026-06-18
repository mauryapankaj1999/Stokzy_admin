import axiosInstance from "./axiosInstance";
export const getCategories =
  async () => {
    const res =
      await axiosInstance.get("/categories");

    return res.data;
  };
    export const createCategory = async (data) => {
        const response =
          await axiosInstance.post("/categories",
            data
          );
    
        return response.data;
      };