import React, { useState } from "react";
import API from "../api"; 
import { useNavigate } from "react-router-dom";

import mainDining from "../assets/dining-main.jpg";
import buffet from "../assets/Bistro-Bar.jpg";
import lounge from "../assets/Blanc-restaurant.jpg";

export default function DiningBooking() {
  const navigate = useNavigate();

  const [selectedVenue, setSelectedVenue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const venues = [
    { name: "Main Restaurant", img: mainDining },
    { name: "Buffet Restaurant", img: buffet },
    { name: "Bar & Lounge", img: lounge }
  ];

  const handleBooking = async () => {
    if (!selectedVenue || !date || !time || !form.name || !form.email || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    const bookingData = {
      venue: selectedVenue,
      date,
      time,
      guests: Number(guests),
      name: form.name,
      email: form.email,
      phone: form.phone,
      paymentStatus: "Pay at Hotel"
    };

    try {
      console.log("Sending Data:", bookingData);

      // ✅ FIXED API CALL
      const res = await API.post("/dining/book-dining", bookingData);

      console.log("Response:", res.data);

      alert("Booking successful ✅");

      navigate("/payment-success");

    } catch (error) {
      console.error("Booking Error:", error.response?.data);
      alert(error.response?.data?.message || "Booking failed ❌");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO */}
      <div
        className="h-[300px] flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${mainDining})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="bg-black/50 p-6 rounded">
          <h1 className="text-4xl font-bold">The Gastronomy Collection</h1>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="md:col-span-2">

          <h2 className="text-xl mb-4 font-semibold">Choose Your Venue</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {venues.map((v) => (
              <div
                key={v.name}
                onClick={() => setSelectedVenue(v.name)}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 transition ${
                  selectedVenue === v.name
                    ? "border-blue-500 scale-105"
                    : "border-gray-200"
                }`}
              >
                <img src={v.img} alt={v.name} className="h-40 w-full object-cover" />
                <p className="text-center p-2 font-medium">{v.name}</p>
              </div>
            ))}
          </div>

          {/* DETAILS */}
          <div className="bg-white p-4 mt-6 rounded shadow">
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="date"
                className="border p-2 rounded"
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="time"
                className="border p-2 rounded"
                onChange={(e) => setTime(e.target.value)}
              />
              <input
                type="number"
                min="1"
                className="border p-2 rounded"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
          </div>

          {/* GUEST */}
          <div className="bg-white p-4 mt-6 rounded shadow">
            <input
              placeholder="Name"
              className="w-full mb-2 border p-2 rounded"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Email"
              className="w-full mb-2 border p-2 rounded"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              placeholder="Phone"
              className="w-full border p-2 rounded"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-4 rounded shadow h-fit sticky top-6">
          <h3 className="mb-4 font-bold text-lg">Reservation Summary</h3>
          <p><strong>Venue:</strong> {selectedVenue || "-"}</p>
          <p><strong>Date:</strong> {date || "-"}</p>
          <p><strong>Time:</strong> {time || "-"}</p>
          <p><strong>Guests:</strong> {guests}</p>

          <button
            onClick={handleBooking}
            className="bg-black hover:bg-gray-800 text-white w-full mt-4 py-2 rounded transition"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}