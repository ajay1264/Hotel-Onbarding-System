import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoginPage from './pages/LoginPage';
import MainAdminPage from './pages/MainAdminPage';
import GuestAdminPage from './pages/GuestAdminPage';
import GuestLandingPage from './pages/GuestLandingPage';
import HotelPage from './components/HotelPage';
import GuestForm from './components/GuestForm/GuestForm';
import ThankYouPage from './components/GuestForm/ThankYouPage';
import SignupPage from './pages/SignupPage';
import { useAuth } from './context/authContext';

const App = () => {
  const { user } = useAuth(); 

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow">
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<LoginPage />} />

          {/* Signup Page */}
          <Route path="/signup" element={<SignupPage />} />

          {/* Main Admin Dashboard (Protected Route) */}
          <Route
            path="/main-admin"
            element={user ? <MainAdminPage /> : <Navigate to="/signup" />}
          />

          {/* Guest Admin Dashboard (Protected Route) */}
          <Route
            path="/guest-admin"
            element={user ? <GuestAdminPage /> : <Navigate to="/signup" />}
          />

          {/* Guest Landing Page */}
          <Route path="/guest/:hotelId" element={<GuestLandingPage />} />

          {/* Hotel Details Page */}
          <Route path="/main-admin/hotel/:id" element={<HotelPage />} />

          {/* Guest Form */}
          <Route path="/guest-registration" element={<GuestForm />} />

          {/* Thank You Page */}
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />

      {/* Toast Container to show toasts */}
      <ToastContainer />
    </div>
  );
};

export default App;
