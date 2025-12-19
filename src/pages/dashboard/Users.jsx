import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@company.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@company.com",
      role: "Editor",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Viewer");

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------- Invite ---------- */
  const handleInvite = () => {
    if (!email) return;

    setUsers([
      ...users,
      {
        id: Date.now(),
        name: email.split("@")[0],
        email,
        role,
        status: "Pending",
      },
    ]);

    setEmail("");
    setRole("Viewer");
    setShowInvite(false);
  };

  /* ---------- Edit ---------- */
  const startEdit = (user) => {
    setEditingUser(user);
    setEmail(user.email);
    setRole(user.role);
  };

  const saveEdit = () => {
    setUsers(
      users.map((u) =>
        u.id === editingUser.id ? { ...u, email, role } : u
      )
    );

    setEditingUser(null);
    setEmail("");
    setRole("Viewer");
  };

  /* ---------- Delete ---------- */
  const deleteUser = (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-sm text-slate-400">
            Manage team members and permissions
          </p>
        </div>

        <button
          onClick={() => setShowInvite(true)}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500"
        >
          + Invite User
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-64 rounded-md bg-slate-900 border border-slate-800 px-3 py-2 text-sm outline-none focus:border-indigo-500"
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900 text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-900/50">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-slate-400">{user.email}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      user.status === "Active"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-right space-x-3">
                  <button
                    onClick={() => startEdit(user)}
                    className="text-slate-400 hover:text-indigo-400"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-slate-400 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <Modal
          title="Invite User"
          onClose={() => setShowInvite(false)}
          onSave={handleInvite}
          email={email}
          setEmail={setEmail}
          role={role}
          setRole={setRole}
          saveText="Send Invite"
        />
      )}

      {/* Edit Modal */}
      {editingUser && (
        <Modal
          title="Edit User"
          onClose={() => setEditingUser(null)}
          onSave={saveEdit}
          email={email}
          setEmail={setEmail}
          role={role}
          setRole={setRole}
          saveText="Save Changes"
        />
      )}
    </div>
  );
}

/* ---------- Reusable Modal ---------- */
function Modal({
  title,
  onClose,
  onSave,
  email,
  setEmail,
  role,
  setRole,
  saveText,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-lg bg-slate-900 p-6 space-y-4">
        <h2 className="text-lg font-semibold">{title}</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md bg-slate-950 border border-slate-800 px-3 py-2 text-sm focus:border-indigo-500 outline-none"
          placeholder="Email address"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded-md bg-slate-950 border border-slate-800 px-3 py-2 text-sm"
        >
          <option>Viewer</option>
          <option>Editor</option>
          <option>Admin</option>
        </select>

        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm hover:bg-indigo-500"
          >
            {saveText}
          </button>
        </div>
      </div>
    </div>
  );
}
