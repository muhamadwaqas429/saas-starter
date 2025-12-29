import { useUsers } from "@/context/UsersContext";
import StatsCards from "../../components/cards/StatCard";
import UsersTable from "../../components/tables/DataTable";

export default function Dashboard() {
  // Get users, loading, and fetchUsers from context
  const { users, loading, fetchUsers } = useUsers();

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <StatsCards users={users} />

      {/* Users Table with working Edit/Delete */}
      <UsersTable users={users} loading={loading} refreshUsers={fetchUsers} />
    </div>
  );
}
