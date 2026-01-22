// src/pages/dashboard/analytics/MenuStackedChart.jsx
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
  items: "#10B981",
  options: "#F59E0B",
  choices: "#8B5CF6",
};

export default function MenuStackedChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="section" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="items" stackId="a" fill={COLORS.items} />
        <Bar dataKey="options" stackId="a" fill={COLORS.options} />
        <Bar dataKey="choices" stackId="a" fill={COLORS.choices} />
      </BarChart>
    </ResponsiveContainer>
  );
}
