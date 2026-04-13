import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* --- Components --- */
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

/* --- Pages & Core Views --- */
import HomePage from "./pages/HomePage";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import Contact from "./pages/Contact";
import DiningBooking from "./pages/DiningBooking";

/* --- Auth Pages --- */
import LoginSelector from "./pages/LoginSelector";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerSignup from "./pages/CustomerSignup";
import AdminLogin from "./pages/AdminLogin";

/* --- Booking Flow --- */
import BookingForm from "./pages/BookingForm";
import PaymentPage from "./components/PaymentPage"; 
import BookingConfirmation from "./components/BookingConfirmation";
import PaymentSuccess from "./pages/PaymentSuccess";

/* --- Admin Management --- */
import AdminDashboard from "./components/AdminDashboard";
import AdminRoomPage from "./components/AdminRoomPage";
import AddRoom from "./pages/AddRoom";
import BookingList from "./pages/BookingList";
import UpdateBooking from "./pages/UpdateBooking";

export default function App() {
  return (
    <Router>
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="pt-20">
        <Routes>
          
          {/* -------------------- PUBLIC ROUTES -------------------- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:roomId" element={<RoomDetails />} />
          <Route path="/dining" element={<DiningBooking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginSelector />} />

          {/* -------------------- CUSTOMER AUTH -------------------- */}
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/signup" element={<CustomerSignup />} />

          {/* -------------------- ADMIN AUTH -------------------- */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* -------------------- ADMIN DASHBOARD (PROTECTED) -------------------- */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard defaultTab="dashboard" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard defaultTab="settings" />
              </ProtectedRoute>
            }
          />

          {/* -------------------- ADMIN ROOM & BOOKING MGMT -------------------- */}
          <Route
            path="/admin/rooms/:id" 
            element={
              <ProtectedRoute role="admin">
                <AdminRoomPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-room"
            element={
              <ProtectedRoute role="admin">
                <AddRoom />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute role="admin">
                <BookingList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/update/:roomId"
            element={
              <ProtectedRoute role="admin">
                <UpdateBooking />
              </ProtectedRoute>
            }
          />

          {/* -------------------- CUSTOMER BOOKING FLOW -------------------- */}
          {/* Step 1: Fill Details */}
          <Route path="/booking/:roomId" element={<BookingForm />} />
          
          {/* Step 2: Payment (Requires Room ID) */}
          <Route path="/payment/:roomId" element={<PaymentPage />} />
          
          {/* Step 3: Success/Confirmation */}
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

          {/* -------------------- CATCH-ALL REDIRECT -------------------- */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </div>
    </Router>
  );
}