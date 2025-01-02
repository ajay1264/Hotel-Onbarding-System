import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useAuth } from '../context/authContext';  // Import the Auth context

const LoginPage = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);  // Call the login function from AuthContext
    setCredentials({ username: '', password: '' });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center border border-gray-300 rounded-md p-3">
            <FaUser className="text-gray-500 mr-3" />
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md p-3">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          <p>
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
