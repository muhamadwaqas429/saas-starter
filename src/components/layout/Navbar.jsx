import { Search, Bell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-slate-800 bg-[#0b1220]">
      {/* Search */}
      <div className="hidden md:flex items-center bg-slate-900 rounded-md px-3 py-2 w-72">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 text-sm text-slate-200 w-full"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-white">
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-semibold text-white">
            WA
          </div>
          <span className="text-sm text-slate-300 hidden sm:block">
            Waqas
          </span>
        </div>
      </div>
    </header>
  );
}
