import { Menu, Bell, Search, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/useAuth";

export default function Navbar({ onToggleSidebar }) {
  const { logout, user } = useAuth(); // get user dynamically

  // Online avatar image link
  const avatarUrl =
    user?.avatar ||
    "https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"; // random online avatar

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-slate-800 bg-slate-950/90 backdrop-blur flex-shrink-0">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Left: Logo + Mobile Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden rounded-md p-2 hover:bg-slate-800"
          >
            <Menu className="h-5 w-5 text-slate-300" />
          </button>

          <div className="flex items-center gap-2">
            <img
              src="https://dbuzz-assets.s3.amazonaws.com/ai_image/public/flt/image-1766077100256.jpeg" // online logo
              alt="Logo"
              className="h-8 w-8"
            />
            <span className="hidden sm:block text-lg font-bold text-white tracking-tight">
              SaaS Starter
            </span>
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex w-full max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md bg-slate-900 pl-10 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-700"
            />
          </div>
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-4">
          <button className="relative rounded-md p-2 hover:bg-slate-800">
            <Bell className="h-5 w-5 text-slate-300" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-md p-1 hover:bg-slate-800 relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback>
                    {user?.name?.slice(0, 2).toUpperCase() || "WA"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-white text-sm font-medium">
                  {user?.name || "Waqas"}
                </span>

                {/* Online Status */}
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border-2 border-slate-950" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500 flex items-center gap-2"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
