import StatCard from "@/components/cards/StatCard";

export default function StatsGrid() {
  const stats = [
    { label: "Total Users", value: "1,248" },
    { label: "Monthly Revenue", value: "$12,430" },
    { label: "Active Subscriptions", value: "842" },
    { label: "Growth Rate", value: "+12.4%" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </div>
  );
}
