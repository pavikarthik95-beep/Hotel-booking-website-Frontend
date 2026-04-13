import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings (replace URL with your API)
  const fetchBookings = async () => {
    try {
      const res = await axios.get("https://hotel-booking-website-backend-1.onrender.com/api/bookings");
      setBookings(res.data);
    } catch (error) {
      toast.error("Failed to fetch bookings");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Delete booking
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`https://hotel-booking-website-backend-1.onrender.com/api/bookings/${id}`);
      toast.success("Booking deleted successfully");
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (error) {
      toast.error("Failed to delete booking");
      console.error(error);
    }
  };

  // Manage booking (example: redirect to booking details page)
  const handleManage = (id) => {
    window.location.href = `/admin/bookings/manage/${id}`;
  };

  // Calculate totals
  const totalBookings = bookings.length;
  const activeBookings = bookings.filter(b => !b.checkedOut).length;
  const revenue = bookings.reduce((acc, b) => acc + (b.totalAmount || 0), 0);
  const checkedOut = bookings.filter(b => b.checkedOut).length;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Bookings Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-gray-500">Total</p>
          <p className="font-bold text-lg">{totalBookings}</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-gray-500">Active</p>
          <p className="font-bold text-lg">{activeBookings}</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-gray-500">Revenue</p>
          <p className="font-bold text-lg">₹{revenue}</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-gray-500">Checked Out</p>
          <p className="font-bold text-lg">{checkedOut}</p>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Room</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Check-In</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Check-Out</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{booking.customerName || "N/A"}</td>
                <td className="px-4 py-2">{booking.customerEmail || "N/A"}</td>
                <td className="px-4 py-2">{booking.roomName || "N/A"}</td>
                <td className="px-4 py-2">{new Date(booking.checkIn).toLocaleDateString() || "N/A"}</td>
                <td className="px-4 py-2">{new Date(booking.checkOut).toLocaleDateString() || "N/A"}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleManage(booking._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Manage
                  </button>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}