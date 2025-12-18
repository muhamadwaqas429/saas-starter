import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Users,
  CreditCard,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const sections = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { label: "Analytics", path: "/dashboard/analytics", icon: BarChart3 },
      { label: "Reports", path: "/dashboard/reports", icon: FileText },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Users", path: "/dashboard/users", icon: Users },
      { label: "Billing", path: "/dashboard/billing", icon: CreditCard },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Settings", path: "/dashboard/settings", icon: Settings },
      { label: "Help", path: "/dashboard/help", icon: HelpCircle },
    ],
  },
];

export default function Sidebar({ open, onClose }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          ${collapsed ? "w-20" : "w-64"}
          bg-slate-950 border-r border-slate-800
          transition-all duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        {/* Brand */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          {!collapsed && (
            <div>
              <div className="text-white font-semibold">SaaS Starter</div>
              <div className="text-xs text-slate-400">Analytics Platform</div>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1 rounded hover:bg-slate-800"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-slate-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="px-2 py-4 space-y-6">
          {sections.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <p className="px-3 mb-2 text-xs uppercase tracking-wide text-slate-500">
                  {section.title}
                </p>
              )}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end
                      className={({ isActive }) =>
                        `
                        flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                        transition-colors
                        ${
                          isActive
                            ? "bg-slate-800 text-white"
                            : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                        }
                      `
                      }
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
