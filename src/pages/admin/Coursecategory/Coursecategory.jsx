import React, { useState } from "react";
import { useCreateCategory } from "../../../hooks/useCategories";

export default function Coursecategory() {
  const [name, setName] =
    useState("");

  const {
    mutateAsync:
      createCategoryMutation,
  } = useCreateCategory();

  const onSubmit =
    async (e) => {
      e.preventDefault();
       if (!name.trim()) {
    alert("Add category");
    return;
  }

      try {const data = {name,};
        console.log(data);
        await createCategoryMutation(
          data
        );

        alert(
          "Category Created Successfully"
        );

        setName("");
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="bg-white p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-5">
        Add Category
      </h2>

      <form
        onSubmit={onSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="w-full border px-3 py-2 text-[14px] rounded"
        />

        <button
          type="submit"
          className="bg-primary text-[14px]  text-white px-4 py-2 rounded"
        >
          Save Category
        </button>
      </form>
    </div>
  );
}