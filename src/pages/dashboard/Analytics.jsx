import React, { useMemo } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import usersData from "@/data/users.mock.json"; // import JSON

const COLORS = ["#4F46E5", "#10B981", "#F59E0B"]; // purple, green, yellow

export default function Analytics() {
  const users = usersData.users;

  // Stats calculation
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === "active").length;
  const adminCount = users.filter(u => u.role === "admin").length;

  // Data for charts
  const pieData = useMemo(() => [
    { name: "Admins", value: adminCount },
    { name: "Active Users", value: activeUsers },
    { name: "Inactive Users", value: totalUsers - activeUsers },
  ], [totalUsers, activeUsers, adminCount]);

  const barData = useMemo(() => {
    const roleCount = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(roleCount).map(([role, value]) => ({ role, value }));
  }, [users]);

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-600 p-6 rounded-lg text-white shadow">
          <p className="text-sm font-medium">Total Users</p>
          <p className="mt-2 text-2xl font-bold">{totalUsers}</p>
        </div>
        <div className="bg-green-600 p-6 rounded-lg text-white shadow">
          <p className="text-sm font-medium">Active Users</p>
          <p className="mt-2 text-2xl font-bold">{activeUsers}</p>
        </div>
        <div className="bg-purple-600 p-6 rounded-lg text-white shadow">
          <p className="text-sm font-medium">Admins</p>
          <p className="mt-2 text-2xl font-bold">{adminCount}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">User Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Role Count</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="role" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Optional Table for detailed view */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Users List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Role</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(u => (
                <tr key={u.id}>
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-white text-xs ${u.role === "admin" ? "bg-purple-600" : "bg-gray-500"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`inline-block w-3 h-3 rounded-full ${u.status === "active" ? "bg-green-500" : "bg-red-500"}`}></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
