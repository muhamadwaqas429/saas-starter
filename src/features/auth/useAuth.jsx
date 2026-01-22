import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const API_BASE = import.meta.env.VITE_API_BASE; // Use deployed backend from .env

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // {_id, name, email, role, token}
  const [loading, setLoading] = useState(true);

  // Restore session
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });

      const { user: userData, token } = res.data.data;

      const authUser = { ...userData, token };
      setUser(authUser);
      localStorage.setItem("authUser", JSON.stringify(authUser));

      return true;
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      return false;
    }
  };

  // REGISTER
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, {
        name,
        email,
        password,
      });

      const { user: userData, token } = res.data.data;

      const authUser = { ...userData, token };
      setUser(authUser);
      localStorage.setItem("authUser", JSON.stringify(authUser));

      return true;
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role,
        token: user?.token || null,
        isAuthenticated: Boolean(user?.token),
        loading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
