// src/pages/dashboard/analytics/UsersStackedChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  active: "#22C55E",
  inactive: "#EF4444",
};

export default function UsersStackedChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="role" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="active" stackId="a" fill={COLORS.active} />
        <Bar dataKey="inactive" stackId="a" fill={COLORS.inactive} />
      </BarChart>
    </ResponsiveContainer>
  );
}
