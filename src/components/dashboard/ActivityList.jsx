export default function ActivityList() {
  const activities = [
    "New user registered",
    "Subscription upgraded",
    "Payment received",
    "User profile updated",
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-3 text-sm text-gray-600">
        {activities.map((activity, index) => (
          <li key={index} className="border-b pb-2 last:border-none">
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
}
