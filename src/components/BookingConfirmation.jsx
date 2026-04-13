import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaUser, FaBed, FaCalendarAlt, FaEnvelope, FaWallet } from "react-icons/fa";

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    // 1. Get raw data from navigation state or localStorage
    const rawData = location.state || JSON.parse(localStorage.getItem("lastBooking") || "null");
    
    if (rawData) {
      // 2. FIX: If data is nested inside 'booking' property, extract it. 
      // This handles: navigate("/...", { state: { booking: res.data } })
      const finalData = rawData.booking ? rawData.booking : rawData;
      setBooking(finalData);
    }
  }, [location.state]);

  const formatDate = (dateString) => {
    if (!dateString) return "Not Set";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString("en-IN", {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-10 bg-white rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-red-500">No Booking Data Found</h2>
          <button onClick={() => navigate("/")} className="bg-blue-600 text-white px-6 py-2 rounded-xl">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md border border-white/20">

        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <FaCheckCircle className="text-green-500 text-5xl" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-center text-gray-800 mb-2">Confirmed! 🎉</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">Your reservation has been successfully completed.</p>

        <div className="bg-gray-50 rounded-2xl p-5 space-y-4 border border-gray-100">
          
          {/* Guest Name */}
          <div className="flex items-center gap-3">
            <FaUser className="text-blue-500" />
            <div>
              <span className="text-gray-400 text-[10px] block uppercase font-black tracking-widest">Guest Name</span>
              <span className="font-bold text-gray-800">
                {booking.customer_name || booking.name || "Guest User"}
              </span>
            </div>
          </div>

          {/* Email Address */}
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-blue-500" />
            <div>
              <span className="text-gray-400 text-[10px] block uppercase font-black tracking-widest">Email Address</span>
              <span className="font-bold text-gray-800">
                {booking.customer_emailId || booking.email || "No Email Provided"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <FaBed className="text-purple-500" />
              <div>
                <span className="text-gray-400 text-[10px] block uppercase font-black tracking-widest">Room ID</span>
                <span className="font-bold text-gray-800">{booking.room_id || booking.roomNumber || "N/A"}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaBed className="text-purple-400" />
              <div>
                <span className="text-gray-400 text-[10px] block uppercase font-black tracking-widest">Category</span>
                <span className="font-bold text-gray-800 capitalize">{booking.category || "Luxury"}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-orange-500" />
              <div>
                <span className="text-gray-400 text-[10px] block uppercase font-black tracking-widest">Check-In</span>
                <span className="font-bold text-gray-700 text-xs">{formatDate(booking.check_in_date || booking.checkIn)}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-orange-400" />
              <div>
                <span className="text-gray-400 text-[10px] block uppercase font-black tracking-widest">Check-Out</span>
                <span className="font-bold text-gray-700 text-xs">{formatDate(booking.check_out_date || booking.checkOut)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Amount Paid */}
        <div className="mt-6 flex justify-between items-center bg-green-50 p-4 rounded-2xl border border-green-100">
          <div>
            <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase mb-1">
              <FaWallet className="text-green-600" />
              {booking.paymentMethod || "Paid Online"}
            </div>
            <p className="text-xs text-gray-400 font-medium">Total Amount Paid</p>
          </div>
          <p className="text-2xl font-black text-green-700">
            ₹{(booking.amount || booking.price || 0).toLocaleString("en-IN")}
          </p>
        </div>

        <div className="mt-8 flex gap-3 print:hidden">
          <button onClick={() => window.print()} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 border border-gray-200 transition-all">
            Print
          </button>
          <button onClick={() => navigate("/")} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg transition-transform active:scale-95">
            Home
          </button>
        </div>
      </div>
    </div>
  );
}