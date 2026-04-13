import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function DeleteBooking() {
  const { roomId } = useParams();
  const navigate = useNavigate();

 const { id } = useParams(); // booking id, not roomId

const handleDelete = async () => {
  try {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      await axios.delete(`/api/admin/bookings/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      toast.success("Booking deleted successfully!");
      navigate("/admin/bookings");
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Delete failed");
  }
};


  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Delete Booking {roomId}</h2>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Confirm Delete
      </button>
    </div>
  );
}