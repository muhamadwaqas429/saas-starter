import React, { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Switch } from "@/components/ui/switch"; // ← use curly braces

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>
        <div className="bg-white p-6 rounded shadow space-y-4">
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
