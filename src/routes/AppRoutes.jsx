import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import RoleRoute from "@/routes/RoleRoute";

import DashboardLayout from "@/layouts/DashboardLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Users from "@/pages/dashboard/Users";
import Analytics from "@/pages/dashboard/Analytics";
import MenuBuilder from "@/pages/menu/MenuBuilder";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= PROTECTED DASHBOARD ================= */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="analytics" element={<Analytics />} />

        {/* Menu Builder → USER ONLY */}
        <Route
          path="menu-builder"
          element={
            <RoleRoute allow={["user"]}>
              <MenuBuilder />
            </RoleRoute>
          }
        />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
