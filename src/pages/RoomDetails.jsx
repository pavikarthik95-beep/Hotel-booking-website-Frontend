import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaWifi, FaTv, FaSnowflake, FaCoffee, FaBath } from "react-icons/fa";

/* SAME ROOM DATA (fallback if state is not passed) */
import room_1 from "../assets/room-1.jpg";
import room_2 from "../assets/room-2.jpg";
import room_3 from "../assets/room-3.jpg";
import room_4 from "../assets/room-4.jpg";
import room_5 from "../assets/room-5.jpg";
import room_6 from "../assets/room-6.jpg";

const roomsData = [
  { id: "1", img: room_1, name: "Luxury Room", price: 2000, rating: 4.2, reviews: 85 },
  { id: "2", img: room_2, name: "Deluxe Room", price: 4500, rating: 4.7, reviews: 120 },
  { id: "3", img: room_3, name: "Suite Room", price: 6500, rating: 4.9, reviews: 150 },
  { id: "4", img: room_4, name: "Standard Room", price: 1800, rating: 4.1, reviews: 60 },
  { id: "5", img: room_5, name: "Family Room", price: 4000, rating: 4.6, reviews: 95 },
  { id: "6", img: room_6, name: "Premium Suite", price: 7500, rating: 5.0, reviews: 70 },
];

export default function RoomDetails() {
  const { state } = useLocation(); // from Link
  const { roomId } = useParams(); // fallback id
  const navigate = useNavigate();

  // Use state first, fallback to roomsData
  let room = state?.room || roomsData.find((r) => r.id === roomId);

  // Room not found
  if (!room) {
    return (
      <div className="text-center mt-20">
        <p>Room Not Found ❌</p>
        <button
          onClick={() => navigate("/rooms")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    checkin: "",
    checkout: "",
    adults: 1,
    children: 0,
    rooms: 1,
    type: room.name,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = () => {
    // Validate form
    if (!form.name || !form.mobile || !form.checkin || !form.checkout) {
      alert("Please fill all required fields");
      return;
    }

    // Simulate booking success
    alert(`Booking Successful ✅\nRoom: ${room.name}\nCheck-in: ${form.checkin}\nCheck-out: ${form.checkout}`);

    // Reset form (optional)
    setForm({
      name: "",
      mobile: "",
      checkin: "",
      checkout: "",
      adults: 1,
      children: 0,
      rooms: 1,
      type: room.name,
    });

    // Navigate to home page
    navigate("/");
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <div className="relative h-[420px]">
        <img src={room.img} alt={room.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-10">
          <h1 className="text-4xl text-white font-bold">{room.name}</h1>
          <div className="mt-3 text-yellow-400">
            {"★".repeat(Math.floor(room.rating))}
            {"☆".repeat(5 - Math.floor(room.rating))}
            <span className="text-white ml-2">({room.reviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* BOOKING FORM */}
        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow space-y-6">
          <h2 className="text-2xl font-semibold">Book Your Stay</h2>

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border p-3 w-full rounded"
          />
          <input
            name="mobile"
            placeholder="Mobile"
            value={form.mobile}
            onChange={handleChange}
            className="border p-3 w-full rounded"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="date"
              name="checkin"
              value={form.checkin}
              onChange={handleChange}
              className="border p-3 rounded"
            />
            <input
              type="date"
              name="checkout"
              value={form.checkout}
              onChange={handleChange}
              className="border p-3 rounded"
            />
          </div>

          <button
            onClick={handleBooking}
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
          >
            Book Now
          </button>
        </div>

        {/* ROOM INFO */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold">Price</h3>
            <p className="text-2xl text-blue-600">₹{room.price}/night</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-2">
              <FaWifi /> WiFi
              <FaTv /> TV
              <FaSnowflake /> AC
              <FaCoffee /> Breakfast
              <FaBath /> Hot Water
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}