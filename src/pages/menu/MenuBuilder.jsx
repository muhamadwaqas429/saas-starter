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
    (i) => i._id === selectedItemId
  );
  const selectedOption = selectedItem?.options.find(
    (o) => o._id === selectedOptionId
  );

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {/* ================= SECTIONS ================= */}
      <div className="border p-3 rounded">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Sections</h3>
          <button className="btn" onClick={() => setOpenSectionModal(true)}>
            +
          </button>
        </div>
        {sections.map((section) => (
          <button
            key={section._id}
            onClick={() => {
              setSelectedSectionId(section._id);
              setSelectedItemId(null);
              setSelectedOptionId(null);
            }}
            className={`block w-full text-left p-2 mb-1 border rounded ${
              selectedSectionId === section._id ? "bg-gray-200" : ""
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* ================= ITEMS ================= */}
      <div className="border p-3 rounded">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Items</h3>
          {selectedSection && (
            <button className="btn" onClick={() => setOpenItemModal(true)}>
              +
            </button>
          )}
        </div>
        {selectedSection?.items.map((item) => (
          <button
            key={item._id}
            onClick={() => {
              setSelectedItemId(item._id);
              setSelectedOptionId(null);
            }}
            className={`block w-full text-left p-2 mb-1 border rounded ${
              selectedItemId === item._id ? "bg-gray-200" : ""
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* ================= OPTIONS ================= */}
      <div className="border p-3 rounded">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Options</h3>
          {selectedItem && (
            <button className="btn" onClick={() => setOpenOptionModal(true)}>
              +
            </button>
          )}
        </div>
        {selectedItem?.options.map((option) => (
          <button
            key={option._id}
            onClick={() => setSelectedOptionId(option._id)}
            className={`block w-full text-left p-2 mb-1 border rounded ${
              selectedOptionId === option._id ? "bg-gray-200" : ""
            }`}
          >
            {option.name}
          </button>
        ))}
      </div>

      {/* ================= CHOICES ================= */}
      <div className="border p-3 rounded">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Choices</h3>
          {selectedOption && (
            <button className="btn" onClick={() => setOpenChoiceModal(true)}>
              +
            </button>
          )}
        </div>
        {selectedOption?.choices.map((choice) => (
          <div key={choice._id} className="p-2 mb-1 border rounded">
            {choice.name}
          </div>
        ))}
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
