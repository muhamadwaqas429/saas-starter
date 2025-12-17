import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", users: 200 },
  { month: "Feb", users: 300 },
  { month: "Mar", users: 450 },
  { month: "Apr", users: 600 },
  { month: "May", users: 750 },
  { month: "Jun", users: 900 },
];

export default function UsersChart() {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">User Growth</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="users" fill="#0f172a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
