import React from "react";
import { useUsers } from "@/features/users/useUsers";
import StatCard from "@/components/cards/StatCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  UserIcon,
  ChartBarIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const { users = [] } = useUsers();

  // Stats
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.active).length;
  const revenue = "$12,345"; // mock
  const sales = 320; // mock
  const growth = "+5%";

  // Mocked chart data
  const userGrowthData = [
    { month: "Jan", users: 400 },
    { month: "Feb", users: 600 },
    { month: "Mar", users: 800 },
    { month: "Apr", users: 900 },
    { month: "May", users: 1200 },
  ];

  const activityData = [
    { day: "Mon", visits: 120 },
    { day: "Tue", visits: 200 },
    { day: "Wed", visits: 150 },
    { day: "Thu", visits: 300 },
    { day: "Fri", visits: 250 },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={<UserIcon className="h-6 w-6 text-indigo-600" />}
          change={growth}
          trend="up"
          description="Compared to last month"
        />
        <StatCard
          title="Active Users"
          value={activeUsers}
          icon={<UserIcon className="h-6 w-6 text-green-600" />}
          change="+3%"
          trend="up"
          description="Currently active"
        />
        <StatCard
          title="Revenue"
          value={revenue}
          icon={<ChartBarIcon className="h-6 w-6 text-blue-600" />}
          change="-2%"
          trend="down"
          description="Monthly revenue"
        />
        <StatCard
          title="Sales"
          value={sales}
          icon={<ShoppingCartIcon className="h-6 w-6 text-yellow-600" />}
          change="+10%"
          trend="up"
          description="Total orders"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-gray-700 mb-4 text-lg">
            User Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#4F46E5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Activity Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-gray-700 mb-4 text-lg">
            Daily Activity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visits" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
