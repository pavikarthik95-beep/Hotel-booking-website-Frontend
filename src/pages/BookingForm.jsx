import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import wifiImg from "../assets/wifi.jpg";
import swimmingImg from "../assets/swimming.jpg";
import restaurantImg from "../assets/restaurant.jpg";
import gymImg from "../assets/gym.jpg";

export default function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();

  const roomCategory = (location.state?.category || "luxury").toLowerCase();

  const [form, setForm] = useState({
    room_id: "",
    customer_name: "",
    customer_age: "",
    customer_emailId: "",
    customer_mobileNo: "",
    check_in_date: "",
    check_out_date: "",
    adults: 1,
    children: 0
  });

  const categoryPricing = {
    luxury: { adult: 4500, child: 1000 },
    deluxe: { adult: 6000, child: 1500 },
    suite: { adult: 8000, child: 2000 }
  };

  const { adult: adultRate, child: childRate } =
    categoryPricing[roomCategory] || { adult: 0, child: 0 };

  const getDays = () => {
    if (!form.check_in_date || !form.check_out_date) return 0;
    const inDate = new Date(form.check_in_date);
    const outDate = new Date(form.check_out_date);
    const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const totalDays = getDays();
  const totalAmount = (form.adults * adultRate + form.children * childRate) * totalDays;

  const amenities = [
    { name: "Free Wi-Fi", img: wifiImg },
    { name: "Swimming Pool", img: swimmingImg },
    { name: "Restaurant", img: restaurantImg },
    { name: "Fitness Center", img: gymImg }
  ];

  const [currentAmenity, setCurrentAmenity] = useState(0);

  useEffect(() => {
    if (roomId) setForm((prev) => ({ ...prev, room_id: roomId }));
  }, [roomId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAmenity((prev) => (prev + 1) % amenities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [amenities.length]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if ((role !== "customer" && role !== "admin") || !token) {
      toast.error("Please login to book a room");
      navigate("/customer/login");
      return;
    }

    if (totalDays === 0) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    toast.info("Proceeding to payment...");
    navigate(`/payment/${form.room_id}`, {
      state: { ...form, category: roomCategory, totalAmount, totalDays }
    });
  };

  const handleCancel = () => {
    const role = localStorage.getItem("role");
    if (role === "admin") navigate("/admin/dashboard");
    else navigate("/rooms");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 lg:p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
        
        {/* --- LEFT SIDE: FORM --- */}
        <div className="p-8 lg:p-12">
          <header className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-800">Room Booking</h2>
            <p className="text-gray-500 mt-2">Complete your details to secure Room {form.room_id}</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Customer Details Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Full Name</label>
                  <input name="customer_name" value={form.customer_name} onChange={handleChange} placeholder="John Doe" required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Age</label>
                  <input type="number" name="customer_age" value={form.customer_age} onChange={handleChange} placeholder="25" min="1" required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 outline-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Address</label>
                <input type="email" name="customer_emailId" value={form.customer_emailId} onChange={handleChange} placeholder="example@mail.com" required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 outline-none" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Mobile Number</label>
                <input type="text" name="customer_mobileNo" value={form.customer_mobileNo} onChange={handleChange} placeholder="9876543210" required pattern="^[0-9]{10}$" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 outline-none" />
              </div>
            </div>

            {/* Stay Details Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Adults</label>
                <input type="number" name="adults" value={form.adults} onChange={handleChange} min="1" className="w-full p-3 border border-gray-200 rounded-xl outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Children</label>
                <input type="number" name="children" value={form.children} onChange={handleChange} min="0" className="w-full p-3 border border-gray-200 rounded-xl outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Check-In</label>
                <input type="date" name="check_in_date" value={form.check_in_date} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Check-Out</label>
                <input type="date" name="check_out_date" value={form.check_out_date} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl outline-none" />
              </div>
            </div>

            {/* Total Summary */}
            <div className="bg-green-50 p-4 rounded-2xl flex justify-between items-center border border-green-100">
              <div>
                <p className="text-xs font-bold text-green-600 uppercase">Stay Summary</p>
                <p className="text-sm text-gray-600">{totalDays} Nights • {form.adults + form.children} Guests</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-green-700">₹{totalAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-[2] bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition active:scale-95">
                Confirm & Pay
              </button>
              <button type="button" onClick={handleCancel} className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-2xl font-bold hover:bg-gray-200 transition">
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* --- RIGHT SIDE: AMENITIES CAROUSEL --- */}
        <div className="hidden lg:block relative bg-gray-900">
          <img src={amenities[currentAmenity].img} alt={amenities[currentAmenity].name} className="w-full h-full object-cover opacity-70 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12 text-white">
            <span className="text-green-400 font-bold tracking-widest uppercase text-sm mb-2">Royelle Amenities</span>
            <h3 className="text-4xl font-bold mb-4">{amenities[currentAmenity].name}</h3>
            <p className="text-gray-300 max-w-sm mb-8 leading-relaxed">Experience ultimate comfort with our premium facilities designed for your luxury stay.</p>
            
            <div className="flex gap-3">
              {amenities.map((_, index) => (
                <div key={index} className={`h-1.5 rounded-full transition-all duration-300 ${currentAmenity === index ? "w-12 bg-green-500" : "w-4 bg-white/30"}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}