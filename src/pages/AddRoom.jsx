import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddRoom() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    room_id: "",
    category: "normal",
    price: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://hotel-booking-website-backend-1.onrender.com/api/rooms", form);
    navigate("/admin/rooms");
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">

        <input
          placeholder="Room ID"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, room_id: e.target.value })}
        />

        <select
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option>normal</option>
          <option>deluxe</option>
          <option>suite</option>
        </select>

        <input
          placeholder="Price"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Room
        </button>
      </form>
    </div>
  );
}