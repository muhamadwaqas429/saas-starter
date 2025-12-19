import { useState } from "react";
import { Save, User, Lock, Bell } from "lucide-react";

export default function Settings() {
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [preferences, setPreferences] = useState({
    newsletter: true,
    notifications: true,
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handlePreferencesChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.checked });
  };

  const handleSave = () => {
    // Add API integration here
    alert("Settings saved!");
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your profile, password, and preferences
        </p>
      </div>

      {/* Profile */}
      <section className="rounded-lg border border-slate-800 bg-slate-950 p-6 space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <User className="w-5 h-5 text-slate-400" /> Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-400">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleProfileChange}
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Password */}
      <section className="rounded-lg border border-slate-800 bg-slate-950 p-6 space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <Lock className="w-5 h-5 text-slate-400" /> Password
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-slate-400">Current Password</label>
            <input
              type="password"
              name="current"
              value={password.current}
              onChange={handlePasswordChange}
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400">New Password</label>
            <input
              type="password"
              name="new"
              value={password.new}
              onChange={handlePasswordChange}
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              value={password.confirm}
              onChange={handlePasswordChange}
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="rounded-lg border border-slate-800 bg-slate-950 p-6 space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <Bell className="w-5 h-5 text-slate-400" /> Preferences
        </h2>

        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="newsletter"
              checked={preferences.newsletter}
              onChange={handlePreferencesChange}
              className="h-4 w-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
            />
            Receive Newsletter
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="notifications"
              checked={preferences.notifications}
              onChange={handlePreferencesChange}
              className="h-4 w-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
            />
            Enable Notifications
          </label>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500"
        >
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>
    </div>
  );
}
