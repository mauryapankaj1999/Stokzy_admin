import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useCourses } from "../../../hooks/useCourses";

import { useCreateModule, useUpdateModule } from "../../../hooks/useModules";

import { getSingleModule } from "../../../api/moduleApi";

export default function AddModule() {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = !!id;

  const [formData, setFormData] = useState({
    course: "",
    title: "",
    order: 1,
    status: "active",
  });

  const { data: courses } = useCourses();

  const { mutateAsync: createModuleMutation } = useCreateModule();

  const { mutateAsync: updateModuleMutation } = useUpdateModule();

  useEffect(() => {
    const fetchModule = async () => {
      try {
        if (!id) return;

        const res = await getSingleModule(id);

        setFormData({
          course: res.data.course,
          title: res.data.title,
          order: res.data.order,
          status: res.data.status,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchModule();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateModuleMutation({
          id,
          data: formData,
        });

        alert("Module Updated Successfully");
      } else {
        await createModuleMutation(formData);

        alert("Module Created Successfully");
      }

      navigate("/modules");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-5">
        {isEdit ? "Edit Module" : "Add Module"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Course</label>

          <select
            value={formData.course}
            onChange={(e) =>
              setFormData({
                ...formData,
                course: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          >
            <option value="">Select Course</option>

            {courses?.data?.map((item) => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Module Title</label>

          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Order</label>

          <input
            type="number"
            value={formData.order}
            onChange={(e) =>
              setFormData({
                ...formData,
                order: Number(e.target.value),
              })
            }
            className="w-full border p-3 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Status</label>

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          >
            <option value="active">Active</option>

            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          {isEdit ? "Update Module" : "Save Module"}
        </button>
      </form>
    </div>
  );
}
