import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { _id, name, email, role, token }
  const [loading, setLoading] = useState(true); // for restoring session

  // Restore user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const userData = res.data.data.user;
      const token = res.data.data.token;

      const authUser = { ...userData, token };
      setUser(authUser);
      localStorage.setItem("authUser", JSON.stringify(authUser));

      return true;
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      return false;
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      const userData = res.data.data.user;
      const token = res.data.data.token;

      const authUser = { ...userData, token };
      setUser(authUser);
      localStorage.setItem("authUser", JSON.stringify(authUser));

      return true;
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
