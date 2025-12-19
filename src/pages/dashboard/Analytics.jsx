import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

export default function Analytics() {
  const [filter, setFilter] = useState("Monthly");

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Analytics</h1>
          <p className="text-slate-400 text-sm">
            Deep insights into user behavior and revenue
          </p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-md bg-slate-900 border border-slate-700 px-3 py-2"
        >
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </div>

      {/* Trend Analysis */}
      <section className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h2 className="text-lg font-medium mb-4">Growth Trends</h2>

        <div className="h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { name: "Jan", Revenue: 4000, Users: 2400 },
                { name: "Feb", Revenue: 3000, Users: 1398 },
                { name: "Mar", Revenue: 5000, Users: 9800 },
                { name: "Apr", Revenue: 4780, Users: 3908 },
                { name: "May", Revenue: 6000, Users: 4800 },
              ]}
            >
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line dataKey="Revenue" stroke="#22c55e" strokeWidth={2} />
              <Line dataKey="Users" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-lg border border-slate-800 bg-slate-950 p-6">
          <h2 className="text-lg font-medium mb-4">Weekly Performance</h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "Mon", Sales: 120 },
                  { name: "Tue", Sales: 200 },
                  { name: "Wed", Sales: 150 },
                  { name: "Thu", Sales: 300 },
                  { name: "Fri", Sales: 250 },
                ]}
              >
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="Sales" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-950 p-6">
          <h2 className="text-lg font-medium mb-4">Users by Device</h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Desktop", value: 65 },
                    { name: "Mobile", value: 25 },
                    { name: "Tablet", value: 10 },
                  ]}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={100}
                >
                  {COLORS.map((c, i) => (
                    <Cell key={i} fill={c} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}
