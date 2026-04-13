 import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

export default function LogoutButton({ role }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    if (loading) return;
    setLoading(true);

    try {
      // Clear all keys
            localStorage.clear();

      if (role === "admin") {
        toast.info("Admin logged out successfully");
        navigate("/admin/login", { replace: true, state: { refresh: Date.now() } });
      } else {
        toast.info("Customer logged out successfully");
        navigate("/customer/login", { replace: true, state: { refresh: Date.now() } });
      }
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`px-4 py-2 rounded text-white transition ${
        loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
      }`}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}