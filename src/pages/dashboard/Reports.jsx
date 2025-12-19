import { useState } from "react";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

export default function Reports() {
  const [reports, setReports] = useState([
    { id: 1, name: "Monthly Revenue", status: "Completed" },
    { id: 2, name: "User Analytics", status: "Pending" },
    { id: 3, name: "Performance Report", status: "Completed" },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  const handleView = (report) => alert(`Viewing report: ${report.name}`);
  const handleEdit = (report) => {
    setEditingId(report.id);
    setNewName(report.name);
  };
  const handleSave = (id) => {
    setReports(reports.map((r) => (r.id === id ? { ...r, name: newName } : r)));
    setEditingId(null);
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setReports(reports.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-white">Reports</h1>
      <p className="text-slate-400 text-sm">
        Manage all your reports here. You can view, edit, or delete reports.
      </p>

      <div className="overflow-x-auto bg-slate-950 rounded-lg border border-slate-800">
        <table className="min-w-full text-left text-sm text-white">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b border-slate-800">
                <td className="px-4 py-3">{report.id}</td>
                <td className="px-4 py-3">
                  {editingId === report.id ? (
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="rounded border border-slate-600 bg-slate-900 p-1 text-white w-full"
                    />
                  ) : (
                    report.name
                  )}
                </td>
                <td className="px-4 py-3">{report.status}</td>
                <td className="px-4 py-3 flex flex-wrap gap-2">
                  {editingId === report.id ? (
                    <button
                      onClick={() => handleSave(report.id)}
                      className="bg-green-600 hover:bg-green-700 p-2 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleView(report)}
                        className="bg-blue-600 hover:bg-blue-700 p-2 rounded"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => handleEdit(report)}
                        className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(report.id)}
                        className="bg-red-600 hover:bg-red-700 p-2 rounded"
                      >
                        <FiTrash2 />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-slate-400"
                >
                  No reports available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
