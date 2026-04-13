import React from "react";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Booking Confirmed 🎉
      </h1>
      <p className="mb-4">Your dining reservation is successfully booked.</p>

      <Link to="/" className="bg-black text-white px-4 py-2 rounded">
        Go Home
      </Link>
    </div>
  );
}