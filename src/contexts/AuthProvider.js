import React, { createContext, useState, useEffect } from 'react';
import { login, register } from 'api/Auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = async (credentials) => {
    try {
      const userData = await login(credentials);
      setUser(userData.user);
      localStorage.setItem('user', JSON.stringify(userData.user));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleRegister = async (userData) => {
    try {
      const newUser = await register(userData);
      setUser(newUser.user);
      localStorage.setItem('user', JSON.stringify(newUser.user));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
