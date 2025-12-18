import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Users from "@/pages/dashboard/Users";
import Settings from "@/pages/dashboard/Settings";
import Login from "@/pages/auth/Login";

export default function AppRoutes() {
  const isAuthenticated = true; // TEMP (frontend only)

  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard Layout */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
        }
      >
        {/* 👇 THIS IS REQUIRED */}
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Redirect */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
