import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { showError, showSuccess } from "../utils/toast";

const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      console.log(res);
      if (res.success) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("role", res.user.role);
        if (res.user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        showError("Login Failed");
      }
    } catch (error) {
      console.log(error);
      showError(error?.response?.data?.message || "Login Failed");
    }
  };
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent"></div>

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome to
            <span className="block text-green-400">Stokzy Admin</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-lg">
            Manage blogs, courses, users and platform content from one powerful
            dashboard.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-gray-100">
          <div className="text-center">
            <img
              src="/stokzy_logo.png"
              alt="logo"
              className="w-32 mx-auto mb-5"
            />

            {/* <h2 className="text-3xl font-bold text-gray-900">
              Sign In
            </h2> */}

            <p className="mt-2 text-gray-500">Login to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            © 2026 Stokzy Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
