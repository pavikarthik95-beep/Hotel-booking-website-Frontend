import React, { useState, useEffect } from "react";
import API from "../api"; 
import ContactImage from "../assets/ContactImage.jpg";
import hotel from "../assets/hotel.jpg";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [location, setLocation] = useState({
    lat: 11.0168,
    lng: 76.9558,
  });

  // 📍 Auto location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📩 Send to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending Contact:", form);

      // ✅ FIXED API CALL
      const res = await API.post("/contact", form);

      console.log("Response:", res.data);

      alert("Message Sent Successfully ✅");

      setForm({ name: "", email: "", message: "" });

    } catch (err) {
      console.error("Contact Error:", err.response?.data);
      alert(err.response?.data?.message || "Error sending message ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <div className="relative h-[400px]">
        <img src={ContactImage} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            Contact Royelle Hotel
          </h1>
        </div>
      </div>

      {/* MAIN */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div className="space-y-6">
          <p className="text-gray-600">
            We are here to assist you 24/7. Reach out for bookings,
            queries, or support.
          </p>

          <div className="space-y-3">
            <p><FaMapMarkerAlt /> Coimbatore, Tamil Nadu</p>
            <p><FaPhoneAlt /> +91 98765 43210</p>
            <p><FaEnvelope /> contact@royellehotel.com</p>
          </div>

          <iframe
            title="map"
            src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
            className="w-full h-60 rounded-lg"
          ></iframe>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow space-y-4"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border p-3 rounded"
            required
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="w-full border p-3 rounded"
            required
          />

          <button className="w-full bg-green-600 text-white py-3 rounded">
            Send Message
          </button>
        </form>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Guests Say
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-6">
          {[
            "Amazing stay! Very clean rooms.",
            "Great service and friendly staff.",
            "Best hotel experience in Coimbatore!",
          ].map((review, i) => (
            <div key={i} className="p-6 shadow rounded-xl">
              <p className="text-gray-600">"{review}"</p>
              <div className="mt-3 text-yellow-500">★★★★★</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-600"
      >
        💬 Chat
      </a>

    </div>
  );
}