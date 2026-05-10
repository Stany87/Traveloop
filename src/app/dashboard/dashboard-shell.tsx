"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import ChecklistWidget from "@/components/ChecklistWidget";
import {
  Plane,
  LayoutDashboard,
  Map,
  Compass,
  Users,
  Settings,
  Bell,
  Plus,
  Search,
  LogOut,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Trips", href: "/dashboard/trips", icon: Map },
    { name: "Explore", href: "/dashboard/search", icon: Compass },
    { name: "Community", href: "/dashboard/community", icon: Users },
  ];

  const initials = session?.user?.name
    ? session.user.name
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className="min-h-screen bg-[#FDFDFB] dark:bg-[#0a0a0a] flex text-[#1A2B3C] dark:text-[#f5f0eb] font-sans">
      <aside className="fixed inset-y-0 left-0 z-50 w-[88px] bg-[#FDFDFB] dark:bg-[#0d1117] border-r border-[#E5E7EB] dark:border-white/[0.04] flex flex-col items-center py-6">
        <Link href="/" className="flex items-center justify-center w-12 h-12 mb-8">
          <Image src="/logo.png" alt="Traveloop Logo" width={48} height={48} className="object-contain" />
        </Link>

        <nav className="flex-1 flex flex-col items-center gap-4 w-full">
          {navigation.map((item) => {
            const isActive =
              item.name === "Overview"
                ? pathname === "/dashboard"
                : item.name === "My Trips"
                  ? pathname === "/dashboard/trips" || /^\/dashboard\/trips\/[^/]+/.test(pathname)
                  : item.name === "Explore"
                    ? pathname.startsWith("/dashboard/search")
                    : item.name === "Community"
                      ? pathname.startsWith("/dashboard/community")
                      : pathname === item.href;

            return (
              <div key={item.name} className="relative group/item flex justify-center w-full">
                <Link
                  href={item.href}
                  className={`
                    flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#1A2B3C] dark:bg-white/[0.1] text-white shadow-md"
                        : "text-[#6B7280] dark:text-white/40 hover:text-[#1A2B3C] dark:hover:text-white hover:bg-[#F3F4F6] dark:hover:bg-white/[0.05]"
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
                </Link>
                <div className="absolute left-[100%] ml-2 px-3 py-1.5 bg-[#1A2B3C] dark:bg-white/[0.15] dark:backdrop-blur-md text-white text-xs font-semibold rounded-lg shadow-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                  {item.name}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-[#E5E7EB] dark:border-white/[0.04] w-full flex flex-col items-center gap-4">
          <div className="relative group/item flex justify-center w-full">
            <Link
              href="/dashboard/settings"
              className="flex items-center justify-center w-12 h-12 rounded-2xl text-[#6B7280] dark:text-white/40 hover:text-[#1A2B3C] dark:hover:text-white hover:bg-[#F3F4F6] dark:hover:bg-white/[0.05] transition-all duration-200"
            >
              <Settings className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <div className="absolute left-[100%] ml-2 px-3 py-1.5 bg-[#1A2B3C] dark:bg-white/[0.15] dark:backdrop-blur-md text-white text-xs font-semibold rounded-lg shadow-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all whitespace-nowrap z-50 pointer-events-none">
              Settings
            </div>
          </div>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="relative group/log flex justify-center w-full w-12 h-12 rounded-2xl text-[#6B7280] dark:text-white/40 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
            title="Sign out"
          >
            <LogOut className="w-5 h-5 m-auto" strokeWidth={1.5} />
            <div className="absolute left-[100%] ml-2 px-3 py-1.5 bg-[#1A2B3C] dark:bg-white/[0.15] dark:backdrop-blur-md text-white text-xs font-semibold rounded-lg shadow-lg opacity-0 invisible group-hover/log:opacity-100 group-hover/log:visible transition-all whitespace-nowrap z-50 pointer-events-none">
              Sign out
            </div>
          </button>

          <Link
            href="/dashboard/settings"
            className="w-10 h-10 rounded-full bg-[#E5E7EB] dark:bg-white/[0.1] flex items-center justify-center text-[#1A2B3C] dark:text-white font-semibold text-xs cursor-pointer border border-[#D1D5DB] dark:border-white/[0.1] hover:border-[#9CA3AF] dark:hover:border-white/[0.2] transition-colors"
            title={session?.user?.name ?? "Profile"}
          >
            {initials}
          </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 pl-[88px]">
        <header className="h-[88px] flex items-center justify-between px-8 sm:px-12 bg-[#FDFDFB] dark:bg-[#0a0a0a] sticky top-0 z-30">
          <div className="flex-1 max-w-xl">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-[#9CA3AF] dark:text-white/30 group-focus-within:text-[#1A2B3C] dark:group-focus-within:text-[#e8834a]" />
              </div>
              <input
                type="text"
                placeholder="Search destinations, hotels, activities..."
                className="w-full bg-white dark:bg-white/[0.03] border border-[#E5E7EB] dark:border-white/[0.08] text-[#1A2B3C] dark:text-white rounded-full py-3 pl-11 pr-12 outline-none focus:border-[#1A2B3C] dark:focus:border-[#e8834a]/50 focus:ring-1 focus:ring-[#1A2B3C] dark:focus:ring-[#e8834a]/50 transition-all text-sm font-medium shadow-sm dark:shadow-none placeholder:text-gray-400 dark:placeholder:text-white/30"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="text-[10px] font-bold text-[#9CA3AF] dark:text-white/30 bg-[#F3F4F6] dark:bg-white/[0.05] px-2 py-1 rounded-md">
                  ⌘K
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-8">
            <ThemeToggle variant="dashboard" />
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-white dark:bg-white/[0.05] border border-[#E5E7EB] dark:border-white/[0.08] flex items-center justify-center text-[#6B7280] dark:text-white/40 hover:text-[#1A2B3C] dark:hover:text-white hover:border-[#D1D5DB] dark:hover:border-white/[0.15] transition-all shadow-sm dark:shadow-none"
            >
              <Bell className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <Link
              href="/dashboard/trips/create"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1A2B3C] dark:bg-[#e8834a] text-white rounded-full text-sm font-medium hover:bg-[#0F172A] dark:hover:bg-[#d4713b] transition-colors shadow-md"
            >
              <Plus className="w-4 h-4" />
              New trip
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-auto px-8 sm:px-12 pb-12">{children}</div>
      </main>
      <ChecklistWidget />
    </div>
  );
}
