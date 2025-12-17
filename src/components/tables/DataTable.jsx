import React from "react";

/**
 * Generic DataTable component
 *
 * Props:
 * - columns: array of { key, label, render? }
 * - data: array of objects
 */

export default function DataTable({ columns, data }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-gray-400"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-4 py-2 whitespace-nowrap text-sm text-gray-700"
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
