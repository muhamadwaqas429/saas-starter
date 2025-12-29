import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useUsers } from "@/context/UsersContext";

const COLORS = {
  admin: "#6366F1",
  active: "#22C55E",
  inactive: "#EF4444",
  user: "#FBBF24",
};

export default function Analytics() {
  const { users, loading } = useUsers();

  const usersList = useMemo(() => {
    if (Array.isArray(users)) return users;
    if (Array.isArray(users?.data)) return users.data;
    if (Array.isArray(users?.users)) return users.users;
    return [];
  }, [users]);

  if (loading)
    return <div className="p-6 text-gray-500">Loading analytics...</div>;

  // Stats
  const totalUsers = usersList.length;
  const activeUsers = usersList.filter((u) => u.status === "active").length;
  const inactiveUsers = totalUsers - activeUsers;
  const adminUsers = usersList.filter((u) => u.role === "admin").length;
  const normalUsers = totalUsers - adminUsers;

  // Charts
  const pieData = useMemo(
    () => [
      { name: "Admins", value: adminUsers },
      { name: "Active Users", value: activeUsers },
      { name: "Inactive Users", value: inactiveUsers },
    ],
    [adminUsers, activeUsers, inactiveUsers]
  );

  const barData = useMemo(() => {
    const roleCount = usersList.reduce((acc, u) => {
      acc[u.role] = (acc[u.role] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(roleCount).map(([role, value]) => ({ role, value }));
  }, [usersList]);

  const stackedData = [
    {
      role: "Admin",
      active: usersList.filter(
        (u) => u.role === "admin" && u.status === "active"
      ).length,
      inactive: usersList.filter(
        (u) => u.role === "admin" && u.status === "inactive"
      ).length,
    },
    {
      role: "User",
      active: usersList.filter(
        (u) => u.role === "user" && u.status === "active"
      ).length,
      inactive: usersList.filter(
        (u) => u.role === "user" && u.status === "inactive"
      ).length,
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={totalUsers}
          color="bg-indigo-600"
        />
        <StatCard
          title="Active Users"
          value={activeUsers}
          color="bg-green-600"
        />
        <StatCard title="Admins" value={adminUsers} color="bg-purple-600" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="User Status Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.name === "Admins"
                        ? COLORS.admin
                        : entry.name === "Active Users"
                        ? COLORS.active
                        : COLORS.inactive
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Users by Role">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ top: 10, bottom: 10 }}>
              <XAxis dataKey="role" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill={COLORS.admin} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Stacked Bar for Role vs Status */}
      <ChartCard title="Role vs Status Overview">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={stackedData}>
            <XAxis dataKey="role" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="active" stackId="a" fill={COLORS.active} />
            <Bar dataKey="inactive" stackId="a" fill={COLORS.inactive} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

/* ===== REUSABLE COMPONENTS ===== */
function StatCard({ title, value, color }) {
  return (
    <div className={`${color} p-6 rounded-xl shadow text-white`}>
      <p className="text-sm opacity-90">{title}</p>
      <p className="mt-3 text-3xl font-bold">{value}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="font-semibold mb-4 text-gray-800">{title}</h2>
      {children}
    </div>
  );
}
