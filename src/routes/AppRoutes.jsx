import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "@/pages/landing/Landing";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/dashboard/Dashboard";
import Users from "@/pages/dashboard/Users";
import Settings from "@/pages/dashboard/Settings";
import { useAuth } from "@/features/auth/useAuth";

export default function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Landing / Marketing */}
        <Route path="/" element={<Landing />} />

        {/* Auth Pages */}
        <Route path="/auth/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/auth/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />} />

        {/* Dashboard Pages */}
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/auth/login" />} />
        <Route path="/dashboard/users" element={isLoggedIn ? <Users /> : <Navigate to="/auth/login" />} />
        <Route path="/dashboard/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/auth/login" />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
