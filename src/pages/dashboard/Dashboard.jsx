import StatsCards from "../../components/cards/StatCard";
import UsersTable from "../../components/tables/DataTable";

export default function Dashboard() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Stats Section */}
      <StatsCards />

      {/* Users Table with Filters */}
      <UsersTable />
    </div>
  );
}
