import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [username, setUsername] = useState("Admin");

  const handleSave = () => {
    // Frontend-only: show confirmation
    alert("Settings saved successfully!");
    console.log({ darkMode, notifications, username });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Settings</h2>

      {/* User Settings */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
          <Label className="w-32">Username</Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Dark Mode</Label>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>

        <div className="flex items-center justify-between">
          <Label>Notifications</Label>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </div>

        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
