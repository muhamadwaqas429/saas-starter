import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/useAuth";
import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const sections = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
      { name: "Analytics", path: "/dashboard/analytics", icon: ChartBarIcon },
    ],
  },
  {
    title: "Management",
    items: [{ name: "Users", path: "/dashboard/users", icon: UsersIcon }],
  },
  {
    title: "Support",
    items: [{ name: "Settings", path: "/dashboard/settings", icon: CogIcon }],
  },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  const handleLogout = () => {
    logout(); // clear auth + localStorage
    setSidebarOpen(false); // close sidebar on mobile
    navigate("/login", { replace: true });
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
            {/* Collapse (desktop) */}
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

            {/* Close (mobile) */}
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
          {sections.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <p className="px-3 mb-2 text-xs uppercase tracking-wide text-slate-500">
                  {section.title}
                </p>
              )}

              <div className="space-y-1">
                {section.items.map(({ name, path, icon: Icon }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
                      ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`
                    }
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>{name}</span>}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
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
