import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoginPage from './pages/LoginPage';
import MainAdminPage from './pages/MainAdminPage';
import GuestAdminPage from './pages/GuestAdminPage';
import GuestLandingPage from './pages/GuestLandingPage';
import HotelPage from './components/HotelPage'; // New component to display hotel details
import GuestForm from './components/GuestForm/GuestForm';
import ThankYouPage from './components/GuestForm/ThankYouPage';
import SignupPage from './pages/SignupPage'; // Make sure this is imported

const App = () => {
  const navigate = useNavigate();
  const [toastShown, setToastShown] = useState(false); // Track if the toast is shown

  // Show toast only once when the page loads
  useEffect(() => {
    if (!toastShown) {
      toast.info('Please sign up first!');
      setToastShown(true);
      navigate('/signup'); // Redirect to the signup page after showing the toast
    }
  }, [navigate, toastShown]);

  // Handle the toast on navbar clicks, excluding the LoginPage
  const handleAdminClick = () => {
    if (!toastShown) {
      toast.info('Please sign up first!');
      setToastShown(true);
    }
    navigate('/signup'); // Redirect to the signup page after showing the toast
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar onAdminClick={handleAdminClick} />

      {/* Main Content */}
      <div className="flex-grow">
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<LoginPage />} />

          {/* Signup Page */}
          <Route path="/signup" element={<SignupPage />} />

          {/* Main Admin Dashboard */}
          <Route path="/main-admin" element={<MainAdminPage />} />

          {/* Guest Admin Dashboard */}
          <Route path="/guest-admin" element={<GuestAdminPage />} />

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
