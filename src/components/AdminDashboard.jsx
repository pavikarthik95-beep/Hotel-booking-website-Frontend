import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  FaThLarge, FaCalendarCheck, FaCog, FaSignOutAlt,
  FaUsers, FaWallet, FaClock, FaCheckCircle, FaPlus, FaEdit, 
  FaTrash, FaMapMarkerAlt, FaHotel
} from "react-icons/fa";

export default function AdminDashboard({ defaultTab = "dashboard" }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  // Settings State
  const [generalInfo, setGeneralInfo] = useState({
    propertyName: "Royelle Hotel & Spa",
    contactEmail: "ops@royelle.com",
    address: "777 Coastal Drive, Azure Bay, Riviera 80211",
    websiteUrl: "https://royellehotel.com"
  });

  const [pricing, setPricing] = useState([
    { id: 1, type: "Luxury Room", rate: 5000 },
    { id: 2, type: "Deluxe Room", rate: 3500 },
    { id: 3, type: "Standard Suite", rate: 7500 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [formData, setFormData] = useState({ type: "", rate: "" });

  // 1. Fetch Rooms from Backend
  const fetchRooms = async () => {
    try {
      const res = await axios.get("https://hotel-booking-website-backend-1.onrender.com/api/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchRooms();
    setActiveTab(defaultTab);
  }, [defaultTab]);

  // 2.  FIXED: 45 Rooms Logic - Merging Backend Data Correctly
  const mergedRooms = useMemo(() => {
    const categories = ["luxury", "deluxe", "suite"];
    
    // Create the 45 base rooms (15 for each category)
    const baseRooms = categories.flatMap((cat, idx) =>
      Array.from({ length: 15 }, (_, i) => ({
        room_id: (idx + 1) * 100 + i + 1,
        category: cat,
      }))
    );

    // Merge with DB data: if room exists in DB, use its status, else "available"
    return baseRooms.map((br) => {
      const foundInDB = rooms.find((dbRoom) => Number(dbRoom.room_id) === Number(br.room_id));
      return {
        ...br,
        status: foundInDB ? foundInDB.status : "available",
        _id: foundInDB ? foundInDB._id : null // Backend ID if exists
      };
    });
  }, [rooms]);

  // Stats Logic
  const totalRooms = mergedRooms.length;
  const bookedRooms = mergedRooms.filter(r => r.status === "booked").length;
  const occupancyRate = totalRooms > 0 ? ((bookedRooms / totalRooms) * 100).toFixed(0) : 0;

  // 3. FIXED: Room Click Handler with Validation
  const handleRoomClick = (room) => {
    if (room.status === "booked") {
      toast.warning(`Room ${room.room_id} is already booked!`);
      return;
    }
    navigate(`/booking/${room.room_id}`);
  };

  const handleSaveAll = () => toast.success("Settings saved successfully!");

  const handleOpenModal = (item = null) => {
    if (item) {
      setCurrentEdit(item.id);
      setFormData({ type: item.type, rate: item.rate });
    } else {
      setCurrentEdit(null);
      setFormData({ type: "", rate: "" });
    }
    setIsModalOpen(true);
  };

  const handleUpdateCategory = () => {
    if (currentEdit) {
      setPricing(pricing.map(item => item.id === currentEdit ? { ...item, ...formData } : item));
    } else {
      setPricing([...pricing, { id: Date.now(), ...formData }]);
    }
    setIsModalOpen(false);
  };
  const handleDeleteCategory = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this category?");
  if (!confirmDelete) return;

  setPricing((prev) => prev.filter((item) => item.id !== id));

  toast.success("Category deleted successfully!");
};

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-100 fixed h-full flex flex-col p-8 z-20">
        <div className="flex items-center gap-3 mb-12 text-blue-900 font-black text-xl italic cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center text-white not-italic shadow-lg shadow-blue-100">R</div>
          ROYELLE
        </div>
        
        <nav className="space-y-2 flex-1">
          <NavItem active={activeTab === "dashboard"} onClick={() => { setActiveTab("dashboard"); navigate("/admin/dashboard"); }} icon={<FaThLarge />} label="Dashboard" />
          <NavItem active={false} onClick={() => navigate("/admin/bookings")} icon={<FaCalendarCheck />} label="Bookings" />
          <NavItem active={activeTab === "settings"} onClick={() => { setActiveTab("settings"); navigate("/admin/settings"); }} icon={<FaCog />} label="Settings" />
        </nav>
        
        <div className="mt-auto border-t pt-6">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl mb-4 border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold">A</div>
            <div>
              <p className="text-xs font-black text-gray-800 uppercase tracking-tight">Admin User</p>
              <p className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> ONLINE
              </p>
            </div>
          </div>
          <button onClick={() => navigate("/login")} className="flex items-center gap-3 text-red-500 font-bold p-4 w-full hover:bg-red-50 rounded-2xl transition-all">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-72 p-12">
        {activeTab === "dashboard" && (
          <div className="animate-in fade-in duration-700">
            <header className="mb-10 text-left">
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Dashboard Overview</h2>
              <p className="text-gray-400 font-medium">Live Royelle Property Metrics</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <MetricCard label="Current Occupancy" value={`${occupancyRate}%`} sub={`${bookedRooms} Booked`} icon={<FaUsers />} color="blue" progress={occupancyRate} />
              <MetricCard label="Total Revenue" value="₹4,250" sub="+12% from last week" icon={<FaWallet />} color="emerald" />
              <MetricCard label="Upcoming Check-ins" value="12" sub="Next 24 Hours" icon={<FaClock />} color="orange" />
              <MetricCard label="Available Units" value={totalRooms - bookedRooms} sub="Ready to Sell" icon={<FaCheckCircle />} color="indigo" />
            </div>

            {/* ROOM STATUS MAP */}
            <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100">
              <h3 className="font-black text-gray-400 uppercase tracking-[0.2em] mb-10 text-[10px] text-left">Room Status Map</h3>
              <div className="grid grid-cols-5 md:grid-cols-9 gap-x-6 gap-y-10">
                {mergedRooms.map((room) => (
                  <div 
                    key={room.room_id} 
                    onClick={() => handleRoomClick(room)}
                    className={`group p-6 rounded-[35px] border-2 text-center transition-all cursor-pointer hover:scale-110 hover:shadow-xl shadow-sm relative overflow-hidden ${
                      room.status === "available" 
                      ? "bg-white border-gray-50 text-gray-800 hover:border-blue-500" 
                      : "bg-[#1E293B] border-[#1E293B] text-white"
                    }`}
                  >
                    <p className="font-black text-lg tracking-tighter">{room.room_id}</p>
                    <p className="text-[7px] uppercase font-black tracking-[0.2em] opacity-40 mt-1">{room.category}</p>
                    
                    {/* Status Dot */}
                    <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${room.status === "available" ? "bg-green-400" : "bg-red-400"}`}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="max-w-4xl animate-in fade-in duration-500 text-left">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Room Settings</h2>
                <p className="text-gray-500 font-medium">Manage property details and pricing tiers</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => window.location.reload()} className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:bg-gray-100 transition">Discard</button>
                <button onClick={handleSaveAll} className="px-8 py-3 bg-[#1E293B] text-white rounded-2xl font-bold shadow-lg shadow-gray-200 hover:bg-black transition">Save Changes</button>
              </div>
            </div>
            
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 mb-8">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                <FaHotel className="text-blue-900" /> General Information
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Property Name</label>
                  <input type="text" value={generalInfo.propertyName} onChange={(e) => setGeneralInfo({...generalInfo, propertyName: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold outline-none focus:bg-white focus:ring-1 ring-blue-100 transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Email</label>
                  <input type="email" value={generalInfo.contactEmail} onChange={(e) => setGeneralInfo({...generalInfo, contactEmail: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold outline-none focus:bg-white focus:ring-1 ring-blue-100 transition" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Property Address</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
                    <input type="text" value={generalInfo.address} onChange={(e) => setGeneralInfo({...generalInfo, address: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-14 font-bold outline-none focus:bg-white focus:ring-1 ring-blue-100 transition" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Categories & Pricing</h3>
                <button onClick={() => handleOpenModal()} className="bg-blue-50 text-blue-900 px-6 py-3 rounded-2xl text-[10px] font-black hover:bg-blue-100 transition flex items-center gap-2 uppercase tracking-widest">
                  <FaPlus size={10} /> Add New Tier
                </button>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-[9px] font-black uppercase tracking-widest border-b border-gray-50">
                    <th className="pb-6">Room Type</th><th className="pb-6">Nightly Rate</th><th className="pb-6 text-right px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {pricing.map((item) => (
                    <tr key={item.id} className="group hover:bg-gray-50/50 transition">
                      <td className="py-6 font-bold text-gray-700 tracking-tight">{item.type}</td>
                      <td className="py-6 font-black text-gray-900">₹{item.rate}</td>
                      <td className="py-6 text-right space-x-2 px-4">
                        <button onClick={() => handleOpenModal(item)} className="p-3 text-gray-200 hover:text-blue-900 transition"><FaEdit /></button>
                       <button onClick={() => handleDeleteCategory(item.id)}className="p-3 text-gray-200 hover:text-red-500 transition"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/10 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white p-12 rounded-[3.5rem] w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-300">
            <h4 className="text-2xl font-black mb-8 tracking-tighter uppercase">{currentEdit ? "Edit Tier" : "Add New Tier"}</h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Type Name</label>
                <input type="text" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full bg-gray-50 border-0 p-5 rounded-2xl font-bold outline-none" placeholder="e.g. Royal Suite" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Base Rate (₹)</label>
                <input type="number" value={formData.rate} onChange={(e) => setFormData({...formData, rate: e.target.value})} className="w-full bg-gray-50 border-0 p-5 rounded-2xl font-bold outline-none" placeholder="0.00" />
              </div>
              <div className="flex gap-4 pt-6">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-5 font-black text-[10px] uppercase tracking-widest text-gray-400">Cancel</button>
                <button onClick={handleUpdateCategory} className="flex-1 py-5 bg-blue-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-100">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-components
function NavItem({ active, onClick, icon, label }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-5 w-full p-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${active ? "bg-blue-900 text-white shadow-xl shadow-blue-100 translate-x-1" : "text-gray-400 hover:bg-gray-50 hover:text-blue-900"}`}>
      {icon} {label}
    </button>
  );
}

function MetricCard({ label, value, sub, icon, color, progress }) {
  const colors = { 
    blue: "bg-blue-50 text-blue-900", 
    emerald: "bg-emerald-50 text-emerald-600", 
    orange: "bg-orange-50 text-orange-600", 
    indigo: "bg-indigo-50 text-indigo-900" 
  };
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden text-left group transition-all hover:shadow-xl hover:-translate-y-1">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-xl ${colors[color]}`}>{icon}</div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</p>
      <h4 className="text-3xl font-black text-gray-900 mt-2 tracking-tighter">{value}</h4>
      <p className="text-[10px] font-bold text-gray-400 mt-2 flex items-center gap-1 uppercase tracking-tight">{sub}</p>
      {progress && <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-50"><div className="h-full bg-blue-900" style={{ width: `${progress}%` }}></div></div>}
    </div>
  );
}