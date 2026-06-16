import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = ({ setSidebarOpen }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="py-4 bg-white shadow px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <HiOutlineMenuAlt2 size={28} />
        </button>

        <h1 className="lg">
          Admin Panel
        </h1>
      </div>

      {/* User Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2"
        >
          <FaUserCircle
            size={28}
            className="text-gray-700"
          />

        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-48 rounded-xl bg-white shadow-lg border border-gray-100 py-2 z-50">
            <div className="px-4 py-1 border-b">
              <p className="font-medium text-gray-800">
                Admin
              </p>

              <p className="text-xs text-gray-500">
                admin@gmail.com
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-1 text-red-500 hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;