// src/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import RoleRoute from "@/routes/RoleRoute";

import DashboardLayout from "@/layouts/DashboardLayout";

// Admin Pages
import Dashboard from "@/pages/dashboard/Dashboard";
import Users from "@/pages/dashboard/Users";
import Analytics from "@/pages/dashboard/Analytics";
import MenuBuilder from "@/pages/menu/MenuBuilder";
import AdminOrders from "@/pages/dashboard/AdminOrders";

// User Pages
import FoodMenu from "@/pages/menu/FoodMenu";
import MyOrders from "@/pages/orders/MyOrders";

// Auth Pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* DASHBOARD LAYOUT FOR BOTH ADMIN & USER */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* ADMIN ROUTES */}
        <Route
          index
          element={
            <RoleRoute allow={["admin"]}>
              <Dashboard />
            </RoleRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <RoleRoute allow={["admin"]}>
              <Dashboard />
            </RoleRoute>
          }
        />
        <Route
          path="dashboard/users"
          element={
            <RoleRoute allow={["admin"]}>
              <Users />
            </RoleRoute>
          }
        />
        <Route
          path="dashboard/analytics"
          element={
            <RoleRoute allow={["admin"]}>
              <Analytics />
            </RoleRoute>
          }
        />
        <Route
          path="dashboard/menu-builder"
          element={
            <RoleRoute allow={["admin"]}>
              <MenuBuilder />
            </RoleRoute>
          }
        />
        <Route
          path="dashboard/orders"
          element={
            <RoleRoute allow={["admin"]}>
              <AdminOrders />
            </RoleRoute>
          }
        />

        {/* USER ROUTES */}
        <Route
          path="foodmenu"
          element={
            <RoleRoute allow={["user"]}>
              <FoodMenu />
            </RoleRoute>
          }
        />
        <Route
          path="orders"
          element={
            <RoleRoute allow={["user"]}>
              <MyOrders />
            </RoleRoute>
          }
        />

        {/* FALLBACK: redirect based on role */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Route>
    </Routes>
  );
}
