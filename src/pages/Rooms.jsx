import React from "react";
import { Link } from "react-router-dom";
import SuiteBg from "../assets/Suite-BG.jpeg";
import room_1 from "../assets/room-1.jpg";
import room_2 from "../assets/room-2.jpg";
import room_3 from "../assets/room-3.jpg";
import room_4 from "../assets/room-4.jpg";
import room_5 from "../assets/room-5.jpg";
import room_6 from "../assets/room-6.jpg";

const Stars = ({ rating }) => {
  return (
    <div className="text-yellow-500 text-sm">
      {"★".repeat(Math.floor(rating))}
      {"☆".repeat(5 - Math.floor(rating))}
    </div>
  );
};

export default function Rooms() {
  const rooms = [
    { id: "1", img: room_1, name: "Luxury Room", price: 2000, rating: 4.2, reviews: 85, desc: "Comfortable stay with city view and basic amenities" },
    { id: "2", img: room_2, name: "Deluxe Room", price: 4500, rating: 4.7, reviews: 120, desc: "Spacious room with premium interiors and comfort" },
    { id: "3", img: room_3, name: "Suite Room", price: 6500, rating: 4.9, reviews: 150, desc: "Luxury suite with king bed and elegant living area" },
    { id: "4", img: room_4, name: "Standard Room", price: 1800, rating: 4.1, reviews: 60, desc: "Budget-friendly room with all essential facilities" },
    { id: "5", img: room_5, name: "Family Room", price: 4000, rating: 4.6, reviews: 95, desc: "Perfect for families with extra space and comfort" },
    { id: "6", img: room_6, name: "Premium Suite", price: 7500, rating: 5.0, reviews: 70, desc: "Top luxury experience with premium services" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="relative h-[400px]">
        <img src={SuiteBg} alt="Rooms" className="w-full h-full object-cover brightness-110" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Our Rooms</h1>
        </div>
      </div>

      {/* Room Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition">
            <img src={room.img} alt={room.name} className="w-full h-56 object-cover" />
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{room.name}</h2>
                <span className="text-blue-600 font-bold">₹{room.price}/night</span>
              </div>

              <div className="flex items-center gap-2">
                <Stars rating={room.rating} />
                <span className="text-sm text-gray-500">({room.reviews} reviews)</span>
              </div>

              <p className="text-gray-600 text-sm">{room.desc}</p>

              {/* FIXED LINK */}
              <Link
                to={`/rooms/${room.id}`} // <-- match App.jsx dynamic route
                state={{ room }}          // optional: pass room data
                className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}