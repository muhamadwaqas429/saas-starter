import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import api from "@/api/axios";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
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
    fetchUsers();
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
          className={`
            flex-1 overflow-y-auto p-4 md:p-6 lg:p-6
            transition-all duration-300
            ${sidebarOpen ? "ml-64" : "ml-0"} 
            lg:ml-64
          `}
        >
          {/* Users and loading state via context */}
          <Outlet context={{ users, loading, fetchUsers }} />
        </main>
      </div>
    </div>
  );
}
