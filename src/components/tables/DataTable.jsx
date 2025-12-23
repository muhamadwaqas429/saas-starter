import React from "react";
import mockData from "@/data/mockData"; // Make sure this exports an array of users

export default function UsersTable() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Avatar</th>
              <th className="px-4 py-2 text-left text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-gray-700">Role</th>
              <th className="px-4 py-2 text-left text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockData.length > 0 ? (
              mockData.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        user.name[0].toUpperCase()
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-gray-900">{user.name}</td>
                  <td className="px-4 py-2 text-gray-700">{user.email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        user.role === "admin" ? "bg-purple-600" : "bg-gray-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block h-3 w-3 rounded-full ${
                        user.status === "active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-600 hover:underline mr-2"
                      onClick={() => console.log("Edit", user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => console.log("Delete", user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
