import { useEffect, useState } from "react";
import api from "@/api/axios";
import useDebounce from "@/hooks/useDebounce";
import UsersTable from "@/components/tables/DataTable";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // ✅ Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/users", {
        params: {
          page, // ✅ current page
          limit: 10, // ✅ items per page
          search: debouncedSearch,
          role: roleFilter,
          status: statusFilter,
        },
      });

      setUsers(res.data.data.users || []);
      setTotalPages(res.data.data.pagination?.totalPages || 1);
    } catch (err) {
      console.error("Fetch users error", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on page / filter change
  useEffect(() => {
    fetchUsers();
  }, [page, debouncedSearch, roleFilter, statusFilter]);

  // ✅ Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, roleFilter, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/3"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Reusable Users Table */}
      <UsersTable users={users} loading={loading} refreshUsers={fetchUsers} />

      {/* ✅ Pagination UI */}
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
