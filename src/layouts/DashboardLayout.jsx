// src/layouts/DashboardLayout.jsx
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/features/auth/useAuth";
import api from "@/api/axios";

export default function DashboardLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users only for admin
  const fetchUsers = async () => {
    if (user?.role !== "admin") return;
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data.data.users || []);
    } catch (err) {
      console.error("Dashboard API error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Redirect user to their default page
    if (user?.role === "user") {
      navigate("/foodmenu", { replace: true });
    }
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* ================= Sidebar ================= */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* ================= Main content ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page content */}
        <main
          className={`flex-1 overflow-y-auto p-4 md:p-6 lg:p-6 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-0"
          } lg:ml-64`}
        >
          {/* Pass admin users data to Outlet */}
          <Outlet context={{ users, loading, fetchUsers }} />
        </main>
      </div>
    </div>
  );
}
