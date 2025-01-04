import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation(); // Get the current location

  return (
    <nav className="bg-blue-800 text-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Digital Guest Onboarding</h1>

        {/* Only show navbar links if we are not on the signup page */}
        {location.pathname !== '/signup' && (
          <ul className="flex space-x-6">
            {!user ? (
              <>
                <li>
                  <Link to="/signup" className="text-white hover:text-yellow-300">Signup</Link>
                </li>
                <li>
                  <Link to="/" className="text-white hover:text-yellow-300">Login</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/guest-registration" className="text-white hover:text-yellow-300">Guest Registration</Link>
                </li>
                <li>
                  <Link to="/main-admin" className="text-white hover:text-yellow-300">Main Admin</Link>
                </li>
                <li>
                  <Link to="/guest-admin" className="text-white hover:text-yellow-300">Guest Admin</Link>
                </li>
                <li>
                  <button onClick={logout} className="text-white hover:text-yellow-300">Logout</button>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
