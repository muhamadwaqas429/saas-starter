import { useEffect, useState } from "react";
import api from "@/api/axios";
import { toast } from "react-hot-toast";

// Modals
import AddSectionModal from "@/components/menu/AddSectionModal";
import AddItemModal from "@/components/menu/AddItemModal";
import AddOptionModal from "@/components/menu/AddOptionModal";
import AddChoiceModal from "@/components/menu/AddChoiceModal";

export default function MenuBuilder() {
  const [sections, setSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const [openSectionModal, setOpenSectionModal] = useState(false);
  const [openItemModal, setOpenItemModal] = useState(false);
  const [openOptionModal, setOpenOptionModal] = useState(false);
  const [openChoiceModal, setOpenChoiceModal] = useState(false);

  // Fetch menu
  const fetchMenu = async () => {
    try {
      const res = await api.get("/menu");
      setSections(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load menu");
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const selectedSection = sections.find((s) => s._id === selectedSectionId);
  const selectedItem = selectedSection?.items.find(
    (i) => i._id === selectedItemId,
  );
  const selectedOption = selectedItem?.options.find(
    (o) => o._id === selectedOptionId,
  );

  return (
    <div className="p-4">
      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ================= SECTIONS ================= */}
        <div className="border p-3 rounded bg-white shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg sm:text-base">Sections</h3>
            <button
              className="btn text-xl sm:text-lg px-2 py-1"
              onClick={() => setOpenSectionModal(true)}
            >
              +
            </button>
          </div>
          <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
            {sections.map((section) => (
              <button
                key={section._id}
                onClick={() => {
                  setSelectedSectionId(section._id);
                  setSelectedItemId(null);
                  setSelectedOptionId(null);
                }}
                className={`w-full text-left p-2 rounded border ${
                  selectedSectionId === section._id ? "bg-gray-200" : ""
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>

        {/* ================= ITEMS ================= */}
        <div className="border p-3 rounded bg-white shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg sm:text-base">Items</h3>
            {selectedSection && (
              <button
                className="btn text-xl sm:text-lg px-2 py-1"
                onClick={() => setOpenItemModal(true)}
              >
                +
              </button>
            )}
          </div>
          <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
            {selectedSection?.items.map((item) => (
              <button
                key={item._id}
                onClick={() => {
                  setSelectedItemId(item._id);
                  setSelectedOptionId(null);
                }}
                className={`w-full text-left p-2 rounded border ${
                  selectedItemId === item._id ? "bg-gray-200" : ""
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* ================= OPTIONS ================= */}
        <div className="border p-3 rounded bg-white shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg sm:text-base">Options</h3>
            {selectedItem && (
              <button
                className="btn text-xl sm:text-lg px-2 py-1"
                onClick={() => setOpenOptionModal(true)}
              >
                +
              </button>
            )}
          </div>
          <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
            {selectedItem?.options.map((option) => (
              <button
                key={option._id}
                onClick={() => setSelectedOptionId(option._id)}
                className={`w-full text-left p-2 rounded border ${
                  selectedOptionId === option._id ? "bg-gray-200" : ""
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>

        {/* ================= CHOICES ================= */}
        <div className="border p-3 rounded bg-white shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg sm:text-base">Choices</h3>
            {selectedOption && (
              <button
                className="btn text-xl sm:text-lg px-2 py-1"
                onClick={() => setOpenChoiceModal(true)}
              >
                +
              </button>
            )}
          </div>
          <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
            {selectedOption?.choices.map((choice) => (
              <div key={choice._id} className="p-2 mb-1 border rounded w-full">
                {choice.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MODALS ================= */}
      <AddSectionModal
        open={openSectionModal}
        onClose={() => setOpenSectionModal(false)}
        onSuccess={fetchMenu}
      />
      <AddItemModal
        open={openItemModal}
        onClose={() => setOpenItemModal(false)}
        sectionId={selectedSectionId}
        onSuccess={fetchMenu}
      />
      <AddOptionModal
        open={openOptionModal}
        onClose={() => setOpenOptionModal(false)}
        itemId={selectedItemId}
        onSuccess={fetchMenu}
      />
      <AddChoiceModal
        open={openChoiceModal}
        onClose={() => setOpenChoiceModal(false)}
        optionId={selectedOptionId}
        onSuccess={fetchMenu}
      />
    </div>
  );
}
