import { Dialog } from "@headlessui/react";
import { useState } from "react";
import api from "@/api/axios";
import { toast } from "react-hot-toast";

export default function AddSectionModal({
  open,
  onClose,
  onSuccess,
  onSelectSection,
}) {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Section name required");
      return;
    }

    try {
      const res = await api.post("/menu/section", { name });

      toast.success("Section added");
      setName("");
      onSuccess();
      onSelectSection(res.data.data._id);
      onClose();
    } catch {
      toast.error("Failed to add section");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
        <Dialog.Panel className="bg-white p-4 rounded w-80">
          <Dialog.Title className="mb-3 font-semibold">
            Add Section
          </Dialog.Title>

          <input
            className="w-full border p-2 mb-3"
            placeholder="Section name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-2 rounded"
          >
            Add
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
