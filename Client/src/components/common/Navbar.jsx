import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Digital Guest Onboarding</h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:underline">
              Login
            </Link>
          </li>
                    {/* New Guest Registration Link on the left */}
                    <li>
            <Link to="/guest-registration" className="hover:underline">
              Guest Registration
            </Link>
          </li>
          <li>
            <Link to="/main-admin" className="hover:underline">
              Main Admin
            </Link>
          </li>
          <li>
            <Link to="/guest-admin" className="hover:underline">
              Guest Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
