import mockData from "@/data/mockData";

export default function StatsCards() {
  const totalUsers = mockData.length;
  const activeUsers = mockData.filter((u) => u.status === "active").length;
  const adminCount = mockData.filter((u) => u.role === "admin").length;

  const cardData = [
    { label: "Total Users", value: totalUsers, color: "bg-blue-500" },
    { label: "Active Users", value: activeUsers, color: "bg-green-500" },
    { label: "Admins", value: adminCount, color: "bg-purple-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cardData.map((card) => (
        <div
          key={card.label}
          className={`${card.color} text-white p-4 rounded shadow flex flex-col justify-center`}
        >
          <span className="text-sm">{card.label}</span>
          <span className="text-2xl font-bold">{card.value}</span>
        </div>
      ))}
    </div>
  );
}
