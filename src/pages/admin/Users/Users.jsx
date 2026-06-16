// import Table from "../../components/common/Table";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import CommonTable from "../../../components/CommonTable";
import {
  useDeleteUser,
  useUpdateUser,
  useUsers,
} from "../../../hooks/useUsers";
import { useState } from "react";
// import { useUsers } from "../../hooks/useUsers";

export default function Users() {
  const { data, isLoading } = useUsers();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { mutate: deleteUserMutation } = useDeleteUser();

  const { mutate: updateUserMutation } = useUpdateUser();

  const handleDelete = (id) => {
    if (window.confirm("Deactivate User?")) {
      deleteUserMutation(id);
    }
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSelectedUser(row);
              setOpen(true);
            }}
          >
            <MdEdit size={20} className="text-primary-600" />
          </button>

          <button onClick={() => handleDelete(row._id)}>
            <MdDeleteOutline size={20} className="text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <CommonTable columns={columns} data={data?.data || []} />

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg w-96">
            <h2 className="font-bold mb-4">Edit User</h2>

            <input
              defaultValue={selectedUser?.name}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  name: e.target.value,
                })
              }
              className="border w-full p-2 mb-3"
            />

            <select
              value={selectedUser?.role}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  role: e.target.value,
                })
              }
              className="border w-full p-2 mb-3"
            >
              <option value="user">User</option>

              <option value="admin">Admin</option>
            </select>

            <select
              value={selectedUser?.status}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  status: e.target.value,
                })
              }
              className="border w-full p-2 mb-3"
            >
              <option value="active">Active</option>

              <option value="inactive">Inactive</option>
            </select>

            <div className="flex justify-end gap-3">
              <button onClick={() => setOpen(false)}>Cancel</button>

              <button
                className="bg-primary text-white px-4 py-2 rounded"
                onClick={() => {
                  updateUserMutation({
                    id: selectedUser._id,
                    data: selectedUser,
                  });

                  setOpen(false);
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
