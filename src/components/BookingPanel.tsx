"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  Plane,
  Hotel,
  Compass,
} from "lucide-react";

type TabType = "tour" | "flight" | "hotels";

export default function BookingPanel() {
  const [activeTab, setActiveTab] = useState<TabType>("tour");

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "tour", label: "Tour", icon: <Compass className="w-4 h-4" /> },
    { id: "flight", label: "Flight", icon: <Plane className="w-4 h-4" /> },
    { id: "hotels", label: "Hotels", icon: <Hotel className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-[0_25px_80px_-12px_rgba(0,0,0,0.25)] overflow-hidden animate-float">
      {/* Tabs */}
      <div className="flex items-center gap-2 px-8 pt-8 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? "text-[#0a0a0a]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gray-100 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2.5">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="px-8 pb-8 pt-4">
        {/* Destination */}
        <div className="mb-6">
          <label className="block text-[11px] font-bold text-gray-800 mb-3 tracking-widest uppercase">
            Destination
          </label>
          <div className="flex items-center gap-3 px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors duration-300 cursor-pointer">
            <MapPin className="w-4.5 h-4.5 text-[#e8834a] flex-shrink-0" />
            <span className="text-sm text-gray-700 font-medium">
              Mountain Bromo, Indonesia — 1200
            </span>
          </div>
        </div>

        {/* Check In / Check Out */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-[11px] font-bold text-gray-800 mb-3 tracking-widest uppercase">
              Check In
            </label>
            <div className="flex items-center gap-2.5 px-4 py-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors duration-300 cursor-pointer">
              <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-[13px] text-gray-700 font-medium">
                Sun, 12 Feb 2026
              </span>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-800 mb-3 tracking-widest uppercase">
              Check Out
            </label>
            <div className="flex items-center gap-2.5 px-4 py-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors duration-300 cursor-pointer">
              <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-[13px] text-gray-700 font-medium">
                Wed, 15 Feb 2026
              </span>
            </div>
          </div>
        </div>

        {/* Guest */}
        <div className="mb-8">
          <label className="block text-[11px] font-bold text-gray-800 mb-3 tracking-widest uppercase">
            Guest
          </label>
          <div className="flex items-center gap-3 px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors duration-300 cursor-pointer">
            <Users className="w-4.5 h-4.5 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-700 font-medium">4 People</span>
          </div>
        </div>

        {/* Reserve Button */}
        <button className="w-full py-4.5 bg-[#0a0a0a] text-white text-sm font-bold rounded-2xl hover:bg-[#1a1a1a] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] active:scale-[0.98]">
          Reserve
        </button>
      </div>
    </div>
  );
}
