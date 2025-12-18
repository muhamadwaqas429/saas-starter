import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex bg-slate-950 text-white">
      <Sidebar
        isOpen={sidebarOpen}
        toggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-900">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 p-2 rounded-lg hover:bg-slate-800 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <h2 className="text-sm text-slate-400">Welcome back 👋</h2>
        </header>

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
}
