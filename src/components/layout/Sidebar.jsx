// src/components/layout/Sidebar.jsx
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/features/auth/useAuth";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavClick = () => {
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const widthClass = collapsed ? "w-20" : "w-64";

  // Determine default route for highlighting
  const defaultUserRoute = user?.role === "user" ? "/foodmenu" : "/dashboard";

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-950 border-r border-slate-800 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${widthClass}`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
          {!collapsed && (
            <span className="text-lg font-bold text-white">SaaS Starter</span>
          )}
          <div className="flex gap-2">
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

        <nav className="flex-1 px-3 py-4 space-y-4">
          {user?.role === "admin" && (
            <>
              <p className="px-3 text-xs text-slate-500 uppercase">Admin</p>
              <NavItem
                to="/dashboard"
                icon={HomeIcon}
                label="Dashboard"
                collapsed={collapsed}
                onClick={handleNavClick}
                defaultRoute={defaultUserRoute}
              />
              <NavItem
                to="/dashboard/analytics"
                icon={ChartBarIcon}
                label="Analytics"
                collapsed={collapsed}
                onClick={handleNavClick}
              />
              <NavItem
                to="/dashboard/users"
                icon={UsersIcon}
                label="Users"
                collapsed={collapsed}
                onClick={handleNavClick}
              />
              <NavItem
                to="/dashboard/menu-builder"
                icon={RectangleGroupIcon}
                label="Menu Builder"
                collapsed={collapsed}
                onClick={handleNavClick}
              />
              <NavItem
                to="/dashboard/orders"
                icon={ListBulletIcon}
                label="Orders"
                collapsed={collapsed}
                onClick={handleNavClick}
              />
            </>
          )}

          {user?.role === "user" && (
            <>
              <p className="px-3 text-xs text-slate-500 uppercase">User</p>
              <NavItem
                to="/foodmenu"
                icon={HomeIcon}
                label="Food Menu"
                collapsed={collapsed}
                onClick={handleNavClick}
                defaultRoute={defaultUserRoute}
              />
              <NavItem
                to="/orders"
                icon={ListBulletIcon}
                label="My Orders"
                collapsed={collapsed}
                onClick={handleNavClick}
              />
            </>
          )}
        </nav>

        <div className="border-t border-slate-800 p-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 text-red-500 rounded hover:bg-slate-800"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

function NavItem({ to, icon: Icon, label, collapsed, onClick, defaultRoute }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
          isActive || location.pathname === defaultRoute
            ? "bg-indigo-600 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}
