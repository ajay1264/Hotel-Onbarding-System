import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      setMessage('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);

      const response = await axios.post('http://localhost:5000/api/auth/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        setMessage('Signup successful!');
        navigate('/guest-registration');
      } else {
        setMessage(response.data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setMessage('Server error. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            <FaUser className="text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full outline-none"
              aria-label="Full Name"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
              aria-label="Email"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none"
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-500"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full outline-none"
              aria-label="Confirm Password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>

          {/* Message */}
          {message && <p className="text-center text-red-500 mt-4">{message}</p>}
        </form>

        {/* Already registered link */}
        <div className="text-center mt-4">
          <p className="text-sm">
            Already registered?{' '}
            <Link to="/" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
