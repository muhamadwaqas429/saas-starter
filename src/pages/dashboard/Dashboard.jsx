import DashboardLayout from "@/layouts/DashboardLayout";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RevenueChart from "@/components/dashboard/RevenueChart";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <StatsGrid />

        <RevenueChart />
      </div>
    </DashboardLayout>
  );
}
