import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function UpdateBooking() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  /* COMMON CONFIG */
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  /* CHECKOUT */
  const handleCheckout = async () => {
    if (!window.confirm("Are you sure you want to checkout this room?")) return;

    try {
      await axios.put(
        `https://hotel-booking-website-backend-1.onrender.com/api/admin/rooms/${roomId}/checkout`,
        {},
        config
      );

      toast.success(`Room ${roomId} checked out successfully ✅`);

      /* FIXED ROUTE */
      navigate("/admin/dashboard");

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Checkout failed ❌");
    }
  };

  /* EXTEND */
  const handleExtend = async () => {
    if (!window.confirm("Extend booking for this room?")) return;

    try {
      await axios.put(
        `https://hotel-booking-website-backend-1.onrender.com/api/admin/rooms/${roomId}/extend`,
        {},
        config
      );

      toast.success(`Room ${roomId} extended successfully ✅`);

      /*  FIXED ROUTE */
      navigate("/admin/dashboard");

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Extend failed ❌");
    }
  };

  /* TOKEN MISSING CASE */
  if (!token) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-bold">Unauthorized ❌</h2>
        <button
          onClick={() => navigate("/admin/login")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Manage Booking for Room {roomId}
      </h2>

      <div className="flex justify-center gap-6">

        <button
          onClick={handleCheckout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
        >
          Checkout
        </button>

        <button
          onClick={handleExtend}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Extend
        </button>

      </div>
    </div>
  );
}