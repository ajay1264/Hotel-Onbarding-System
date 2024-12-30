import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoginPage from './pages/LoginPage';
import MainAdminPage from './pages/MainAdminPage';
import GuestAdminPage from './pages/GuestAdminPage';
import GuestLandingPage from './pages/GuestLandingPage';
import HotelPage from './components/HotelPage'; // New component to display hotel details

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow">
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<LoginPage />} />

          {/* Main Admin Dashboard */}
          <Route path="/main-admin" element={<MainAdminPage />} />

          {/* Guest Admin Dashboard */}
          <Route path="/guest-admin" element={<GuestAdminPage />} />

          {/* Guest Landing Page */}
          <Route path="/guest/:hotelId" element={<GuestLandingPage />} />

          {/* Hotel Details Page */}
          <Route path="/main-admin/hotel/:id" element={<HotelPage />} /> {/* New route for hotel details */}
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;