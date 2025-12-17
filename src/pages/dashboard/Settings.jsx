import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "@/features/users/usersSlice";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [companyName, setCompanyName] = useState("My Company");

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  // Example: clear users from state
  const handleClearUsers = () => {
    dispatch(setUsers([]));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Settings</h2>

      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        {/* Notifications */}
        <div className="flex items-center justify-between">
          <Label>Enable Notifications</Label>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between">
          <Label>Dark Mode</Label>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>

        {/* Company Name */}
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1"
            placeholder="Enter company name"
          />
        </div>

        {/* Clear Users Button */}
        <div className="mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            onClick={handleClearUsers}
          >
            Clear All Users
          </button>
        </div>

        {/* Display users count */}
        <p className="text-gray-500 mt-2">
          Total Users in state: {users?.length || 0}
        </p>
      </div>
    </div>
  );
}
