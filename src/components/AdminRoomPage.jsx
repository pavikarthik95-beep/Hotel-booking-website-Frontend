import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const API = "https://hotel-booking-website-backend-1.onrender.com/api/admin";

export default function AdminRoomPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || id === "undefined") {
      toast.error("Room ID is missing");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Please login first");
          navigate("/admin/login");
          return;
        }

        const res = await axios.get(`${API}/rooms/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRoom(res.data);
        setBooking(res.data.booking || null);

      } catch (err) {
        console.error("Fetch error:", err);

        if (err.response?.status === 401) {
          toast.error("Unauthorized! Login again");
          navigate("/admin/login");
        } else if (err.response?.status === 404) {
          toast.error("Room not found");
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, navigate]);

  if (loading) return <p className="p-10 text-center">Loading...</p>;

  if (!room) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500">Room details unavailable</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1>Room {room.roomNumber}</h1>
      <p>Title: {room.title}</p>
      <p>Status: {room.status}</p>
      <p>Price: {room.price}</p>
      <p>Capacity: {room.maxPeople}</p>

      {booking && (
        <div>
          <h3>Booking Info</h3>
          <p>Name: {booking.customerName}</p>
        </div>
      )}

      <button onClick={() => navigate("/admin/dashboard")}>
        Back
      </button>
    </div>
  );
}