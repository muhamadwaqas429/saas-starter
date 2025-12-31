import { useEffect, useState } from "react";
import api from "@/api/axios";
import UsersTable from "@/components/tables/DataTable";
import StatsCards from "@/components/cards/StatCard";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Pagination (SAME as Users page)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/users", {
        params: {
          page,
          limit: 5, // ✅ smaller list for dashboard
        },
      });

      setUsers(res.data.data.users || []);
      setTotalPages(res.data.data.pagination?.totalPages || 1);
    } catch (err) {
      console.error("Dashboard users fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <StatsCards users={users} />

      {/* Users Table */}
      <UsersTable
        users={users}
        loading={loading}
        refreshUsers={fetchUsers}
      />

      {/* ✅ SAME Pagination UI */}
      <div className="flex justify-end items-center gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
