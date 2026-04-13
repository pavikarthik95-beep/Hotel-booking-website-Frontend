import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaStar, FaHeart, FaWifi, FaSwimmingPool, FaSpa, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";

import lobbyImg from "../assets/Lobby.jpg";
import roomImg from "../assets/standard-3.jpg";
import diningImg from "../assets/delux1.jpeg";
import spaImg from "../assets/suite2.jpg";
import guest1 from "../assets/guest1.jpg";
import guest2 from "../assets/guest2.jpg";
import Logo from "../assets/hotel-logo.jpg";
import roomService from "../assets/room-service.jpg";
import teaBreakfast from "../assets/tea-breakfast.jpg";
import fiberNet from "../assets/fibrenet.jpg";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slide, setSlide] = useState(0);

  const guests = [
    { img: guest1, name: "Sarah", review: "Amazing stay! Rooms were clean, staff was friendly and service was excellent. Highly recommended for families and couples looking for comfort." },
    { img: guest2, name: "James", review: "Beautiful hotel with great ambiance. Food and amenities were top-notch. Loved the overall experience and hospitality provided." },
    { img: guest1, name: "Priya", review: "Very comfortable stay with excellent service. Rooms were spacious and well-maintained. Perfect place for a relaxing vacation." },
    { img: guest2, name: "Arun", review: "Great location and peaceful atmosphere. Staff were helpful and services were quick. Will definitely visit again." }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % guests.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white shadow-md flex justify-between items-center px-10 py-4 z-50">
        <div className="flex items-center gap-3">
          <img src={Logo} className="h-10 w-10 rounded-full" />
          <h1 className="text-2xl font-bold text-blue-600">Royelle Hotel</h1>
        </div>

        <div className="hidden md:flex gap-8 items-center text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/rooms">Rooms</Link>
          <Link to="/dining">Dining</Link>
          <Link to="/contact">Contact</Link>
     <Link to="/customer/login">Login</Link>
     <Link to="/admin/login">Admin Login</Link>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
{/* HERO */} <div className="relative h-screen"> 
  <img src={lobbyImg} className="w-full h-full object-cover" />
   <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center text-white px-6"> 
   <h1 className="text-5xl font-bold mb-4">Welcome to Royelle Hotel</h1> 
   <p className="max-w-xl mb-6"> Experience luxury, comfort and unforgettable stays with world-class service. </p> <div className="flex gap-4"> 
    <Link to="/rooms" className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700"> Explore Now </Link>
     <Link to="/contact" className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200"> Contact Us </Link> </div> </div> </div>

{/* ROOMS */}
<section className="py-20 px-6 bg-gray-50">
  <div className="max-w-6xl mx-auto">

    <h2 className="text-4xl font-bold text-center mb-12">
      Our Rooms
    </h2>

    <div className="grid md:grid-cols-3 gap-10">

      {[
        {
          img: roomImg,
          name: "Luxury Room",
          price: "₹2000 / night",
          rating: 4.2,
          reviews: 120,
          desc: "Comfortable and budget-friendly room designed with modern essentials, cozy bedding, and a peaceful ambiance for a relaxing stay.",
        },
        {
          img: spaImg,
          name: "Deluxe Room",
          price: "₹4500 / night",
          rating: 4.6,
          reviews: 210,
          desc: "Spacious luxury room featuring premium interiors, stylish decor, enhanced comfort, and perfect for both business and leisure travelers.",
        },
        {
          img: diningImg,
          name: "Suite Room",
          price: "₹6500 / night",
          rating: 4.9,
          reviews: 320,
          desc: "Elegant suite with a separate living area, scenic views, high-end amenities, and personalized services for a truly luxurious experience.",
        }
      ].map((room, i) => (

        <div
          key={i}
          className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition duration-300"
        >

          {/* IMAGE */}
          <div className="relative">
            <img
              src={room.img}
              className="h-60 w-full object-cover group-hover:scale-105 transition duration-300"
            />

            <FaHeart className="absolute top-4 right-4 text-white bg-black/40 p-2 rounded-full cursor-pointer hover:text-red-500" />
          </div>

          {/* CONTENT */}
          <div className="p-6">

            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{room.name}</h3>
              <span className="text-blue-600 font-bold">{room.price}</span>
            </div>

            {/* ⭐ DYNAMIC RATING */}
            <div className="flex items-center gap-2 mb-3">
              
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, index) => {
                  if (index < Math.floor(room.rating)) {
                    return <FaStar key={index} />;
                  } else {
                    return <FaStar key={index} className="text-gray-300" />;
                  }
                })}
              </div>

              <span className="text-sm text-gray-600">
                {room.rating} ({room.reviews} reviews)
              </span>

            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {room.desc}
            </p>

          </div>
        </div>

      ))}

    </div>
  </div>
</section>

     {/* SERVICES */}
<section className="py-20 px-6 bg-gray-100">
  <div className="max-w-6xl mx-auto text-center">
    <p className="text-blue-600 font-medium mb-2 tracking-wide">OUR SERVICES</p>
    <h2 className="text-4xl font-bold mb-12">Best Convenience Services</h2>

    <div className="grid md:grid-cols-3 gap-10">
      {[
        {
          title: "Room Services",
         img: roomService,
          desc: "Enjoy 24/7 room service with fast delivery, professional staff support, and personalized assistance for a comfortable stay.",
        },
        {
          title: "Tea & Breakfast",
          img: teaBreakfast,
          desc: "Start your day with fresh breakfast and hot beverages, offering a variety of healthy and delicious options.",
        },
        {
          title: "Fiber Internet",
         img: fiberNet,
          desc: "High-speed fiber internet access across all rooms ensuring smooth browsing, streaming, and work experience.",
        }
      ].map((service, i) => (
        <div key={i} className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
          <div className="relative p-4 bg-blue-50 rounded-t-3xl">
            <h3 className="text-lg font-semibold text-left">{service.title}</h3>
            <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full">+</div>
          </div>

          <div className="relative">
            <img src={service.img} className="h-56 w-full object-cover" />

            {/* Floating description card */}
            <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[85%] bg-white rounded-full shadow-lg px-6 py-4">
              <p className="text-gray-600 text-sm text-center leading-snug">
                {service.desc}
              </p>
            </div>
          </div>

          <div className="h-12" />
        </div>
      ))}
    </div>
  </div>
</section>
     {/* GUEST REVIEWS */}
<section className="py-24 px-6 relative">
  <div className="absolute inset-0">
    <img src={lobbyImg} className="w-full h-full object-cover opacity-30" />
    <div className="absolute inset-0 bg-black/50" />
  </div>

  <div className="relative max-w-5xl mx-auto text-white">
    <h2 className="text-5xl font-serif mb-10">Guest Reviews</h2>

    <div className="overflow-hidden">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${slide * 100}%)` }}
      >

        {[
          { img: guest1, name: "Asma_043", location: "Indore, India", review: "Nice place to visit nearby hotel good quality room and food location is awesome all nearby shops and malls markets. Beach is next to the hotel just 10 mins walk. Beach is the place do shopping and play full." },
          { img: guest2, name: "Rahul", location: "Chennai, India", review: "Wonderful stay with amazing service. Rooms were neat and well maintained. Food quality was excellent and staff were very supportive." },
          { img: guest1, name: "Priya", location: "Bangalore, India", review: "Loved the ambiance and peaceful environment. Perfect place for vacation and relaxation with family." },
          { img: guest2, name: "Arjun", location: "Mumbai, India", review: "Hotel location is perfect and close to all attractions. Staff was very polite and helpful." },
          { img: guest1, name: "Sneha", location: "Delhi, India", review: "Great experience overall. Clean rooms, fast service and beautiful interiors. Highly recommended." }
        ].map((g, i) => (

          <div key={i} className="min-w-full px-4">
            <div className="bg-green-900/80 backdrop-blur-md p-10 rounded-xl shadow-2xl">

              <div className="flex items-center gap-6 mb-6">
                <img src={g.img} className="w-20 h-20 rounded-full border-4 border-white" />
                <div>
                  <h4 className="font-semibold">{g.name}</h4>
                  <p className="text-sm text-gray-300">{g.location}</p>
                </div>
              </div>

              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              </div>

              <h3 className="font-bold text-lg mb-2">WELL MAINTAINED HOTEL</h3>

              <p className="text-gray-200 text-sm leading-relaxed">
                {g.review}
              </p>

            </div>
          </div>

        ))}

      </div>
    </div>

    {/* DOTS */}
    <div className="flex justify-center gap-2 mt-6">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          onClick={() => setSlide(i)}
          className={`w-3 h-3 rounded-full cursor-pointer ${slide === i ? "bg-white" : "bg-gray-400"}`}
        />
      ))}
    </div>

  </div>
</section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-8">
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="font-bold text-lg mb-3">Royelle Hotel</h3>
            <p className="text-gray-400 text-sm">Premium luxury and comfort stay experience.</p>
          </div>

          <div>
            <h3 className="font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/rooms">Rooms</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">Follow Us</h3>
            <div className="flex gap-4 text-xl">
              <FaFacebook />
              <FaInstagram />
              <FaTwitter />
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-8 text-sm">
          © {new Date().getFullYear()} Royelle Hotel
        </p>
      </footer>

    </div>
          );
}
