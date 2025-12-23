import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar setSidebarOpen={setSidebarOpen} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
