//createContext & useContext → for creating a React Context, which lets you share data (like the logged-in user) across your app.
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
//This allows any component wrapped in AuthProvider to access auth stateuser and login
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // For restoring session

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

      // Save user + token
      setUser({ ...userData, token });
      localStorage.setItem("authUser", JSON.stringify({ ...userData, token }));

      return true;
    } catch (err) {
      console.error(err);
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

      // Save user + token
      setUser({ ...userData, token });
      localStorage.setItem("authUser", JSON.stringify({ ...userData, token }));

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
// Hook to access auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
