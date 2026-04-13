import React, { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
  
      const res = await api.post("/auth/admin-login", {
        email,
        password,
      });

      const token = res.data?.token;

      if (!token) {
        toast.error("Invalid login credentials");
        setLoading(false);
        return;
      }

      // Store credentials
      localStorage.setItem("token", token);
      localStorage.setItem("role", "admin");

      toast.success("✅ Welcome back, Admin!");

      // Redirect to dashboard
      navigate("/admin/dashboard");

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      // Access the error message from backend if available
      const errorMsg = err.response?.data?.message || "Login failed. Check your connection.";
      toast.error(errorMsg);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-3xl shadow-2xl w-[400px] border border-white"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black mb-2 text-blue-900 tracking-tight">
            Admin Login
          </h2>
          <p className="text-gray-400 text-sm font-medium">Royelle Hotel Management</p>
        </div>

        {/* Email Field */}
        <div className="mb-5">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
          <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-400 transition-all">
            <FaUser className="text-gray-400" />
            <input
              type="email"
              placeholder="admin@royelle.com"
              className="w-full bg-transparent ml-3 outline-none text-gray-700 font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-8">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
          <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 relative focus-within:ring-2 focus-within:ring-blue-400 transition-all">
            <FaLock className="text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full bg-transparent ml-3 pr-10 outline-none text-gray-700 font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-300 hover:text-blue-600 transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-900 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-800 transition-all active:scale-95 disabled:bg-gray-300 disabled:shadow-none"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </span>
          ) : "Login to Dashboard"}
        </button>

        <p className="text-center text-gray-400 text-xs mt-6">
          Authorized Personnel Only
        </p>
      </form>
    </div>
  );
}