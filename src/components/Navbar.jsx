import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.info("Logged out successfully");
    navigate("/");
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsLoginOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-blue-600">
          Royelle Hotel
        </NavLink>

        {/* MENU */}
        <div className="flex items-center space-x-8 font-medium text-gray-700">

          <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
          <NavLink to="/rooms" className="hover:text-blue-600">Rooms</NavLink>

          {/* LOGIN DROPDOWN */}
          {!token && (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsLoginOpen(!isLoginOpen)}>
                Login
              </button>

              {isLoginOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white border rounded-xl shadow-lg">
                  <NavLink to="/customer/login" className="block px-4 py-2 hover:bg-gray-100">
                    Customer Login
                  </NavLink>
                  <NavLink to="/admin/login" className="block px-4 py-2 hover:bg-gray-100">
                    Admin Login
                  </NavLink>
                </div>
              )}
            </div>
          )}

          {/* SIGNUP */}
          {!token && (
            <NavLink
              to="/customer/signup"  
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Signup
            </NavLink>
          )}

          {/* ADMIN DASHBOARD QUICK ACCESS */}
          {token && role === "admin" && (
            <NavLink
              to="/admin/dashboard"
              className="text-blue-600 font-semibold"
            >
              Dashboard
            </NavLink>
          )}

          {/* LOGOUT */}
          {token && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}