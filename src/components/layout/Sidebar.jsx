import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import api from "@/api/axios";
import { useAuth } from "@/features/auth/useAuth";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("authUser");
      navigate("/login");
    }
  };

  const widthClass = collapsed ? "w-20" : "w-64";

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col
          bg-slate-900 border-r border-slate-800
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${widthClass}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
          {!collapsed && (
            <span className="text-lg font-semibold text-white">
              SaaS Starter
            </span>
          )}

          <div className="flex items-center gap-2">
            <button
              className="hidden lg:flex text-slate-400 hover:text-white"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <ChevronRightIcon className="h-5 w-5" />
              ) : (
                <ChevronLeftIcon className="h-5 w-5" />
              )}
            </button>

            <button
              className="lg:hidden text-slate-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 space-y-6 overflow-y-auto flex-1">
          {/* Overview */}
          <div>
            {!collapsed && (
              <p className="px-3 mb-2 text-xs uppercase text-slate-500">
                Overview
              </p>
            )}

            <NavItem
              to="/dashboard"
              icon={HomeIcon}
              label="Dashboard"
              collapsed={collapsed}
            />
            <NavItem
              to="/dashboard/analytics"
              icon={ChartBarIcon}
              label="Analytics"
              collapsed={collapsed}
            />
          </div>

          {/* Management */}
          <div>
            {!collapsed && (
              <p className="px-3 mb-2 text-xs uppercase text-slate-500">
                Management
              </p>
            )}

            <NavItem
              to="/dashboard/users"
              icon={UsersIcon}
              label="Users"
              collapsed={collapsed}
            />

            {/* ✅ USER ONLY */}
            {user?.role === "user" && (
              <NavItem
                to="/dashboard/menu-builder"
                icon={RectangleGroupIcon}
                label="Menu Builder"
                collapsed={collapsed}
              />
            )}
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-800 p-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-red-500 hover:bg-slate-800 w-full"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

/* =======================
   Reusable Nav Item
======================= */
function NavItem({ to, icon: Icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
        ${
          isActive
            ? "bg-indigo-600 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}
