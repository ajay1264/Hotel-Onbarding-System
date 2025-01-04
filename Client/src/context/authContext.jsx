import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';  

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);  // Use jwtDecode from the named import
          const isTokenExpired = decodedToken.exp * 1000 < Date.now();
          if (isTokenExpired) {
            console.warn('Token has expired');
            localStorage.removeItem('token');
            setUser(null);
          } else {
            setUser(decodedToken);
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (token) => {
    try {
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token); 
      setUser(decodedToken);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
