import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";
import DashboardLayout from "@/layouts/DashboardLayout";

// Pages
import Dashboard from "@/pages/dashboard/Dashboard";
import Analytics from "@/pages/dashboard/Analytics";
import Reports from "@/pages/dashboard/Reports";
import Users from "@/pages/dashboard/Users";
import Settings from "@/pages/dashboard/Settings";
import Billing from "@/pages/dashboard/Billing";
import Help from "@/pages/dashboard/Help";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Auth Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
      />

      {/* Dashboard Layout Protected */}
      <Route
        path="/dashboard/*"
        element={
          isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
        <Route path="billing" element={<Billing />} />
        <Route path="help" element={<Help />} />
      </Route>

      {/* Redirect unknown paths */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}
