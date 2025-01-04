import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/signup', formData);
      localStorage.setItem('token', data.token);  
      toast.success('Signup successful');
      navigate('/main-admin');  
    } catch (err) {
      setError(err.response?.data?.message || 'Error signing up');
      toast.error(error);  
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full outline-none"
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full outline-none"
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full outline-none"
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{''}
            <a href="/" className="text-blue-500 hover:underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
