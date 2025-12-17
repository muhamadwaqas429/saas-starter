import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Users from "@/pages/dashboard/Users";
import Settings from "@/pages/dashboard/Settings";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import { useAuth } from "@/features/auth/useAuth";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={
          isAuthenticated ? (
            <DashboardLayout>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
              </Routes>
            </DashboardLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}
