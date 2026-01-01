// src/pages/menu/MenuBuilder.jsx
import { useState } from "react";
import { menuData } from "@/data/menu.mock";
import MenuColumn from "@/components/menu/MenuColumn";

export default function MenuBuilder() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);

  return (
    <div className="h-full w-full p-4">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Menu Builder
        </h1>
        <p className="text-sm text-slate-500">
          Build your restaurant menu hierarchy
        </p>
      </div>

      {/* 4 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-180px)]">
        {/* Menu Sections */}
        <MenuColumn
          title="Menu Sections"
          items={menuData}
          selectedId={selectedSection?.id}
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
          selectedId={selectedItem?.id}
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
          selectedId={selectedOption?.id}
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
          selectedId={selectedChoice?.id}
          onSelect={(choice) => setSelectedChoice(choice)}
          onAdd={() => console.log("Add Choice")}
        />
      </div>
    </div>
  );
}
