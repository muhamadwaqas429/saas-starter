import StatCard from "@/components/cards/StatCard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { name: "Jan", value: 12000 },
  { name: "Feb", value: 18500 },
  { name: "Mar", value: 24000 },
  { name: "Apr", value: 31500 },
  { name: "May", value: 38120 },
];

const trafficData = [
  { name: "Mon", value: 3200 },
  { name: "Tue", value: 4100 },
  { name: "Wed", value: 3800 },
  { name: "Thu", value: 4600 },
  { name: "Fri", value: 5200 },
];

const usersSplit = [
  { name: "Active", value: 9821 },
  { name: "Inactive", value: 4561 },
];

const activities = [
  { user: "Ali Raza", action: "Upgraded plan", time: "2 min ago" },
  { user: "Sara Khan", action: "Created report", time: "18 min ago" },
  { user: "John Doe", action: "Invited team member", time: "1 hr ago" },
  { user: "Ahmed", action: "Cancelled subscription", time: "3 hrs ago" },
];

export default function Dashboard() {
  return (
    <main className="flex-1 bg-slate-950 min-h-screen text-slate-200">
      <div className="p-6 space-y-10">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-slate-400 text-sm">
            Overview of your business performance
          </p>
        </div>

        {/* Primary KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Monthly Revenue" value="$38,120" delta="+11.2%" />
          <StatCard title="Active Users" value="9,821" delta="+3.1%" />
          <StatCard title="New Signups" value="1,284" delta="+5.6%" />
          <StatCard title="Churn Rate" value="2.3%" delta="-0.6%" />
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="xl:col-span-2 bg-slate-900 rounded-xl p-6">
            <div className="mb-4">
              <h3 className="font-medium">Revenue Growth</h3>
              <p className="text-sm text-slate-400">
                Monthly revenue performance
              </p>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Line
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Split */}
          <div className="bg-slate-900 rounded-xl p-6">
            <h3 className="font-medium mb-1">User Status</h3>
            <p className="text-sm text-slate-400 mb-4">
              Active vs inactive users
            </p>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={usersSplit}
                    dataKey="value"
                    innerRadius={65}
                    outerRadius={95}
                  >
                    <Cell fill="#6366f1" />
                    <Cell fill="#1f2937" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Traffic + Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Traffic */}
          <div className="bg-slate-900 rounded-xl p-6">
            <h3 className="font-medium mb-4">Weekly Traffic</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData}>
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-slate-900 rounded-xl p-6">
            <h3 className="font-medium mb-4">Recent Activity</h3>

            <ul className="space-y-4">
              {activities.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <span className="font-medium text-white">{item.user}</span>{" "}
                    <span className="text-slate-400">{item.action}</span>
                  </div>
                  <span className="text-slate-500">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
