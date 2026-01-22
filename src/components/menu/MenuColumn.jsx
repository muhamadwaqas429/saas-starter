export default function MenuColumn({
  title,
  items = [],
  selectedId,
  onSelect,
  onAdd,
}) {
  return (
    <div className="border rounded p-3">
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        <button
          onClick={onAdd}
          className="px-2 py-1 text-sm bg-black text-white rounded"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item._id}
            onClick={() => onSelect(item)}
            className={`p-2 border rounded cursor-pointer ${
              selectedId === item._id
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
