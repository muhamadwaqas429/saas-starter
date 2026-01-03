import { useState } from "react";
import MenuColumn from "@/components/menu/MenuColumn";
import useMenuData from "@/hooks/useMenuData";

export default function MenuBuilder() {
  const { menu, loading } = useMenuData();

  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);

  if (loading) {
    return <div className="p-4 text-sm text-slate-500">Loading menu...</div>;
  }

  return (
    <div className="h-full w-full p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Menu Builder
        </h1>
        <p className="text-sm text-slate-500">
          Build your restaurant menu hierarchy
        </p>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-180px)]">
        {/* Sections */}
        <MenuColumn
          title="Menu Sections"
          items={menu}
          selectedId={selectedSection?._id}
          onSelect={(section) => {
            setSelectedSection(section);
            setSelectedItem(null);
            setSelectedOption(null);
            setSelectedChoice(null);
          }}
          onAdd={() => console.log("Add Section")}
        />

        {/* Items */}
        <MenuColumn
          title="Items"
          items={selectedSection?.items || []}
          selectedId={selectedItem?._id}
          onSelect={(item) => {
            setSelectedItem(item);
            setSelectedOption(null);
            setSelectedChoice(null);
          }}
          onAdd={() => console.log("Add Item")}
        />

        {/* Options */}
        <MenuColumn
          title="Options"
          items={selectedItem?.options || []}
          selectedId={selectedOption?._id}
          onSelect={(option) => {
            setSelectedOption(option);
            setSelectedChoice(null);
          }}
          onAdd={() => console.log("Add Option")}
        />

        {/* Choices */}
        <MenuColumn
          title="Choices"
          items={selectedOption?.choices || []}
          selectedId={selectedChoice?._id}
          onSelect={(choice) => setSelectedChoice(choice)}
          onAdd={() => console.log("Add Choice")}
        />
      </div>
    </div>
  );
}
