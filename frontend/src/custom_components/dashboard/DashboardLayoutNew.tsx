"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  Inbox,
  LogOutIcon,
  Search,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Menu items
const items = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Threads", url: "/dashboard/threads", icon: Inbox },
  { title: "Templates", url: "/dashboard/templates", icon: Calendar },
];

type DashboardProps = {
  children: React.ReactNode;
};

const DashboardLayoutNew: React.FC<DashboardProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted">
        <AppSidebar />
        <SidebarInset className="flex-1 ml-56">
          {/* match default sidebar width */}
          <main className="flex-1 bg-background rounded-xl shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8 py-8">{children}</div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-[#111827] text-gray-200 border-r border-gray-800 flex flex-col transition-all duration-300 z-50
        ${collapsed ? "w-16" : "w-56"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-white" />
            <span className="font-semibold text-white">YourApp</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 mt-4 space-y-1 overflow-y-auto">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
              text-gray-400 hover:bg-gray-800 hover:text-white
              data-[active=true]:bg-gray-800 data-[active=true]:text-white data-[active=true]:font-medium"
          >
            <item.icon className="w-5 h-5" />
            {!collapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="p-0 space-y-1 border-t border-gray-800">
        <Link
          key="Logout"
          href="/logout"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
              text-gray-400 hover:bg-gray-800 hover:text-white
              data-[active=true]:bg-gray-800 data-[active=true]:text-white data-[active=true]:font-medium"
        >
          <LogOutIcon className="w-5 h-5" />
          {!collapsed && <span>Logout</span>}
        </Link>
        {!collapsed && <span className="text-xs text-gray-500 ml-4">v1.0.0</span>}
      </div>
    </div>
  );
};

export default DashboardLayoutNew;
