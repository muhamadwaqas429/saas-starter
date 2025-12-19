import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 px-6 py-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Left */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">SaaS Starter</span>. All
          rights reserved.
        </p>

        {/* Right - links */}
        <div className="flex gap-4 text-sm">
          <a
            href="/dashboard/help"
            className="hover:text-white transition-colors"
          >
            Help
          </a>
          <a
            href="/dashboard/settings"
            className="hover:text-white transition-colors"
          >
            Settings
          </a>
          <a
            href="/dashboard/privacy"
            className="hover:text-white transition-colors"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
