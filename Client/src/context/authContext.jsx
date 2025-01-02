import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if JWT exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const decoded = decodeJwt(token); // Decode JWT to get user info
      setUser({ username: decoded.username });
    }
  }, []);

  const login = async (userCredentials) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userCredentials),
      });

      const data = await response.json();
      if (response.ok) {
        const token = data.token;
        localStorage.setItem('token', token); // Store JWT token in localStorage
        const decoded = decodeJwt(token); // Decode JWT to get user info
        setIsAuthenticated(true);
        setUser({ username: decoded.username });
        navigate('/main-admin'); // Redirect to Main Admin page after successful login
      } else {
        alert(data.message); // Show error message if credentials are invalid
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed, please try again.');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token'); // Remove token on logout
    navigate('/');
  };

  const decodeJwt = (token) => {
    // Decode JWT token to get user data
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(window.atob(base64));
    return decoded;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
