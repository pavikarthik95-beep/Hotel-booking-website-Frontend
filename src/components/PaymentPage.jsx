import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser, FaEnvelope, FaCalendarAlt, FaBed,
  FaShieldAlt, FaArrowLeft, FaCheckCircle, FaUniversity
} from "react-icons/fa";

export default function PaymentPage() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const bookingForm = location.state || {};

  const [roomData, setRoomData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingRoom, setFetchingRoom] = useState(true);

  // FETCH ROOM DETAILS
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const id = Number(roomId);

        if (!id || isNaN(id)) {
          toast.error("Invalid Room ID");
          return;
        }

        const res = await api.get(`/rooms/${id}`);
        setRoomData(res.data);

      } catch (err) {
        console.error("❌ Fetch error:", err.response?.data || err.message);
        toast.error("Could not load room details. Please try again.");
      } finally {
        setFetchingRoom(false);
      }
    };

    if (roomId) fetchRoom();
  }, [roomId]);

  // CALCULATE DAYS
  const calculateDays = (start, end) => {
    if (!start || !end) return 1;

    const diff = Math.ceil(
      Math.abs(new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)
    );

    return diff || 1;
  };

  // TOTAL DAYS
  const totalDays = calculateDays(
    bookingForm.check_in_date,
    bookingForm.check_out_date
  );

  // TOTAL AMOUNT (FIXED)
  const totalAmount = roomData ? roomData.price * totalDays : 0;

  //  HANDLE PAYMENT
  const handlePayment = async () => {
    if (!paymentMethod) return toast.error("Please select a payment method");
    if (!roomData) return toast.error("Room details are still loading...");

    try {
      setLoading(true);

      const bookingData = {
        room_id: Number(roomId),
        customer_name: bookingForm.customer_name,
        customer_emailId: bookingForm.customer_emailId,
        customer_mobileNo: bookingForm.customer_mobileNo || "N/A",

        check_in_date: bookingForm.check_in_date,
        check_out_date: bookingForm.check_out_date,

        // FIXED HERE
        amount: Number(totalAmount),

        paymentMethod: paymentMethod,
        adults: Number(bookingForm.adults) || 1,
        children: Number(bookingForm.children) || 0
      };

      console.log("✅ Sending to Backend:", bookingData);

      const response = await api.post("/bookings", bookingData);

      if (response.status === 201) {
        toast.success("Payment Successful! Booking Confirmed.");

        setTimeout(() => {
          navigate("/booking-confirmation", {
            state: {
              booking: response.data.booking,
              room: roomData,
              totalAmount: totalAmount
            }
          });
        }, 2000);
      }

    } catch (err) {
      console.error("❌ Full Error:", err.response?.data);

      const errorMessage =
        err.response?.data?.message ||
        "Booking failed. Please try again.";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 pt-24">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 relative">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="absolute -top-12 left-0 flex items-center gap-2 text-gray-500 font-bold hover:text-blue-900"
        >
          <FaArrowLeft /> Back
        </button>

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FaShieldAlt /> Secure Checkout
          </h2>

          <div className="bg-white p-6 rounded-xl shadow">
            <DetailRow icon={<FaUser />} label="Guest" value={bookingForm.customer_name} />
            <DetailRow icon={<FaEnvelope />} label="Email" value={bookingForm.customer_emailId} />
            <DetailRow icon={<FaCalendarAlt />} label="Check-In" value={bookingForm.check_in_date} />
            <DetailRow icon={<FaBed />} label="Room" value={roomData?.title || "Loading..."} />

            <p className="mt-4 font-semibold text-blue-700">
              Duration: {totalDays} Night(s)
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FaUniversity /> Payment Method
          </h3>

          <div className="space-y-3 flex-grow">
            {["Card", "UPI", "PayPal"].map((method) => (
              <div
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`p-4 border rounded-lg cursor-pointer flex justify-between ${
                  paymentMethod === method
                    ? "border-blue-600 bg-blue-50"
                    : ""
                }`}
              >
                {method}
                {paymentMethod === method && <FaCheckCircle />}
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-blue-900">
              {fetchingRoom ? "Loading..." : `₹${totalAmount}`}
            </h2>

            {/* OPTIONAL BREAKDOWN */}
            {!fetchingRoom && (
              <p className="text-sm text-gray-500 mt-1">
                ₹{roomData?.price} × {totalDays} night(s)
              </p>
            )}

            <button
              onClick={handlePayment}
              disabled={loading || fetchingRoom}
              className="w-full mt-4 bg-blue-900 text-white py-3 rounded-lg disabled:bg-gray-400"
            >
              {loading ? "Processing..." : "Confirm & Pay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// REUSABLE ROW
function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="text-blue-600">{icon}</div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="font-semibold">{value || "N/A"}</p>
      </div>
    </div>
  );
}