import { useNavigate } from "react-router-dom";

export default function LoginSelector() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-6">
      <h1 className="text-3xl font-bold">Login</h1>

      <button
        onClick={() => navigate("/customer/login")}
        className="bg-blue-500 text-white px-6 py-2 rounded w-64"
      >
        Customer Login
      </button>

      <button
        onClick={() => navigate("/admin/login")}
        className="bg-green-500 text-white px-6 py-2 rounded w-64"
      >
        Admin Login
      </button>

      <button
        onClick={() => navigate("/customer/signup")}
        className="bg-purple-500 text-white px-6 py-2 rounded w-64"
      >
        Customer Signup
      </button>
    </div>
  );
}