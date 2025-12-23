import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Users from "@/pages/dashboard/Users";
import Analytics from "@/pages/dashboard/Analytics";
import Login from "@/pages/auth/Login";

export default function AppRoutes() {
  const isAuthenticated = true; // TEMP (frontend only)

  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard Layout with nested routes */}
      <Route
        path="/dashboard/*"
        element={
          isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
        }
      >
        {/* Dashboard main page */}
        <Route index element={<Dashboard />} />

        {/* Users page */}
        <Route path="users" element={<Users />} />

        {/* Analytics page */}
        <Route path="analytics" element={<Analytics />} />
      </Route>

      {/* Redirect unknown routes to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
