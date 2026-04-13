import React, { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import {
  FaTrash,
  FaEye,
  FaCalendarPlus,
  FaDoorOpen,
  FaTimes,
} from "react-icons/fa";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  // FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      toast.error("Error fetching bookings");
    }
  };

  //  VIEW BOOKING (FIXED)
  const handleView = async (id) => {
    try {
      console.log("Clicked ID:", id);

      const res = await api.get(`/bookings/${id}`);

      setSelected(res.data);    
      setShowModal(true);       
    } catch (err) {
      console.error(err);
      toast.error("Booking not found");
    }
  };

  //  CHECKOUT
  const handleCheckout = async (id) => {
    if (window.confirm("Confirm Checkout? This will free the room.")) {
      try {
        await api.delete(`/bookings/${id}`);

        toast.success("Guest checked out and room is now available!");
        fetchBookings();
        setShowModal(false);
      } catch (err) {
        toast.error("Checkout failed");
      }
    }
  };

  // EXTEND STAY
  const handleExtend = async (id) => {
    const newDate = prompt("Enter new Check-out Date (YYYY-MM-DD):");
    if (!newDate) return;

    try {
      await api.patch(`/bookings/extend/${id}`, { 
        newCheckOutDate: newDate,
      });

      toast.success("Stay extended successfully!");
      fetchBookings();
      setShowModal(false);
    } catch (err) {
      toast.error("Failed to extend stay. Check date format.");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Delete this record permanently?")) {
      try {
        await api.delete(`/bookings/${id}`); 

        setBookings(bookings.filter((b) => b._id !== id));
        toast.info("Record removed.");
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Manage Bookings</h2>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 uppercase text-xs font-bold text-gray-500">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Room</th>
              <th className="p-4">Dates</th>
              <th className="p-4">Amount</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <div className="font-bold">{b.customer_name}</div>
                  <div className="text-xs text-gray-400">
                    {b.customer_emailId}
                  </div>
                </td>

                <td className="p-4 text-sm">Room {b.room_id}</td>

                <td className="p-4 text-sm">
                  {new Date(b.check_in_date).toLocaleDateString()} -{" "}
                  {new Date(b.check_out_date).toLocaleDateString()}
                </td>

                <td className="p-4 font-bold text-green-600">
                  ₹{b.amount}
                </td>

                <td className="p-4 flex justify-center gap-2">
                  {/* ✅ VIEW */}
                  <button
                    onClick={() => handleView(b._id)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                  >
                    <FaEye />
                  </button>

                  {/* ✅ DELETE */}
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-bold mb-4 border-b pb-2">
              Booking Info
            </h3>

            <div className="space-y-3 text-gray-600">
              <p className="flex justify-between">
                <strong>Name:</strong>
                <span>{selected.customer_name}</span>
              </p>

              <p className="flex justify-between">
                <strong>Email:</strong>
                <span>{selected.customer_emailId}</span>
              </p>

              <p className="flex justify-between">
                <strong>Mobile:</strong>
                <span>{selected.customer_mobileNo}</span>
              </p>

              <p className="flex justify-between">
                <strong>Status:</strong>
                <span className="text-green-600 font-bold uppercase">
                  {selected.status}
                </span>
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              
              {/* CHECKOUT */}
              <button
                onClick={() => handleCheckout(selected._id)}
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <FaDoorOpen /> Checkout
              </button>

              {/* EXTEND */}
              <button
                onClick={() => handleExtend(selected._id)}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <FaCalendarPlus /> Extend Stay
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}