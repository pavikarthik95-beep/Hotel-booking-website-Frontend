import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

// ADD YOUR BACKEND URL HERE
const API_BASE_URL = "https://hotel-booking-website-backend-1.onrender.com";

export default function CustomerSignup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/customer/signup`, form);

      toast.success("Signup successful! Please login.");
      navigate("/customer/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Customer Signup</h2>

        <div className="flex items-center border rounded mb-3">
          <FaUser className="text-gray-400 ml-3" />
          <input
            name="name"
            placeholder="Name"
            className="w-full p-2 ml-2 outline-none"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center border rounded mb-3">
          <FaEnvelope className="text-gray-400 ml-3" />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-2 ml-2 outline-none"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center border rounded mb-3 relative">
          <FaLock className="text-gray-400 ml-3" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 ml-2 outline-none pr-10"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-gray-400"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}