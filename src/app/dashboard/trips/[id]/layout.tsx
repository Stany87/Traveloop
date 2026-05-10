"use client";

import { use } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Calendar, CheckSquare, DollarSign, Map, Settings, Edit3 } from "lucide-react";
import Image from "next/image";

export default function TripLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id: tripId } = use(params);
  const pathname = usePathname();
  const tabs = [
    { name: "Itinerary", href: `/dashboard/trips/${tripId}`, icon: Map },
    { name: "Builder", href: `/dashboard/trips/${tripId}/build`, icon: Edit3 },
    { name: "Budget", href: `/dashboard/trips/${tripId}/budget`, icon: DollarSign },
    { name: "Checklist", href: `/dashboard/trips/${tripId}/checklist`, icon: CheckSquare },
    { name: "Notes", href: `/dashboard/trips/${tripId}/notes`, icon: Edit3 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="relative h-64 sm:h-80 rounded-[2rem] overflow-hidden shadow-lg group">
        <Image src="/kyoto.png" alt="Kyoto" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex gap-3 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-wider border border-white/30">14 Days Away</span>
              <span className="px-3 py-1 bg-amber-500/20 backdrop-blur-md rounded-lg text-[10px] font-bold text-amber-300 uppercase tracking-wider border border-amber-500/30">Planning</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Kyoto Autumn Explorer</h1>
            <div className="flex items-center gap-4 text-gray-200 text-sm font-semibold"><div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />Oct 12 - Oct 20, 2026</div></div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#1F2937] rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors self-start sm:self-auto shadow-md">
            <Settings className="w-4 h-4" />Trip Settings
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-200 dark:border-white/[0.04] bg-white dark:bg-[#0d1117] rounded-t-3xl px-4 pt-2 shadow-sm dark:shadow-none">
        <div className="flex gap-8">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link key={tab.name} href={tab.href} className={`relative flex items-center gap-2 py-4 px-2 text-sm font-bold whitespace-nowrap transition-colors ${isActive ? "text-[#1A2B3C] dark:text-white" : "text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white"}`}>
                <tab.icon className="w-4 h-4" />{tab.name}
                {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A2B3C] dark:bg-[#e8834a]" />}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="pt-2">{children}</div>
    </div>
  );
}
