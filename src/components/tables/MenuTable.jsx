import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-hot-toast";
import api from "@/api/axios";

export default function MenuTable({
  menu: propMenu = [],
  loading: propLoading = false,
  refreshMenu,
}) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
  });

  // Sync props → local state
  useEffect(() => {
    setMenu(propMenu || []);
    setLoading(propLoading);
  }, [propMenu, propLoading]);

  // =====================
  // Edit section
  // =====================
  const handleEdit = (section) => {
    if (!section?._id) {
      toast.error("Section ID missing");
      return;
    }

    setEditingSection(section);
    setFormData({
      title: section.title || "",
      description: section.description || "",
      status: section.status || "active",
    });
    setModalOpen(true);
  };

  // =====================
  // Form change
  // =====================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // =====================
  // Save update
  // =====================
  const handleSave = async () => {
    if (!editingSection?._id) {
      toast.error("Section ID missing");
      return;
    }

    try {
      const res = await api.put(
        `/menu/sections/${editingSection._id}`,
        formData
      );

      const updatedSection = res.data.data;

      // Update local table immediately
      setMenu((prev) =>
        prev.map((sec) =>
          sec._id === updatedSection._id ? updatedSection : sec
        )
      );

      toast.success("Menu section updated");
      setModalOpen(false);
      setEditingSection(null);

      // Optional refresh from backend
      refreshMenu?.();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-500">Loading menu...</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Menu Sections</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm table-fixed">
          <thead className="bg-gray-100">
            <tr className="text-left text-slate-600">
              <th className="px-4 py-2 w-1/4">Title</th>
              <th className="px-4 py-2 w-1/4">Description</th>
              <th className="px-4 py-2 w-1/6">Items</th>
              <th className="px-4 py-2 w-1/6">Status</th>
              <th className="px-4 py-2 w-1/6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {menu.length ? (
              menu.map((section) => (
                <tr key={section._id} className="hover:bg-slate-50">
                  <td className="px-4 py-2">{section.title}</td>
                  <td className="px-4 py-2">{section.description}</td>
                  <td className="px-4 py-2">{section.items?.length || 0}</td>
                  <td className="px-4 py-2 capitalize">
                    {section.status || "active"}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleEdit(section)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No menu sections found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =====================
          EDIT MODAL
         ===================== */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      >
        <Dialog.Panel className="bg-white p-6 rounded w-full max-w-md">
          <Dialog.Title className="font-semibold mb-4">
            Edit Menu Section
          </Dialog.Title>

          <input
            className="w-full border p-2 mb-2 rounded"
            name="title"
            value={formData.title}
            placeholder="Title"
            onChange={handleChange}
          />

          <input
            className="w-full border p-2 mb-2 rounded"
            name="description"
            value={formData.description}
            placeholder="Description"
            onChange={handleChange}
          />

          <select
            className="w-full border p-2 mb-4 rounded"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setModalOpen(false)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
