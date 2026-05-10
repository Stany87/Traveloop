"use client";

import { motion } from "framer-motion";
import { Calendar, Wallet, TrendingUp, Compass, Plus, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { label: "ACTIVE TRIPS", value: "3", sub: "2 upcoming · 2 planning", icon: Calendar },
  { label: "TOTAL PLANNED", value: "$17,000", sub: "Across 4 trips", icon: Wallet },
  { label: "SPENT SO FAR", value: "$5,640", sub: "33% of plan", icon: TrendingUp },
  { label: "DAYS ON THE ROAD", value: "38", sub: "Next 12 months", icon: Sparkles },
];

export default function DashboardPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-10">
      
      {/* Header Section */}
      <div className="flex items-end justify-between pt-4">
        <div>
          <h3 className="text-xs font-bold text-[#6B7280] dark:text-white/40 uppercase tracking-widest mb-4">Good morning, Maya</h3>
          <h1 className="text-[3.5rem] leading-[1.1] text-[#1A2B3C] dark:text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 500 }}>
            Three trips in motion.<br />
            <span className="text-[#6B7280] dark:text-white/40">Let's keep them moving.</span>
          </h1>
        </div>
        <div className="pb-2">
          <Link href="/dashboard/trips/create" className="flex items-center gap-2 px-6 py-3 bg-[#1A2B3C] dark:bg-[#e8834a] text-white rounded-full text-sm font-medium hover:bg-[#0F172A] dark:hover:bg-[#d4713b] transition-colors shadow-md">
            <Plus className="w-4 h-4" />
            Plan a new trip
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#FDFDFB] dark:bg-[#0d1117] border border-[#E5E7EB] dark:border-white/[0.04] rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-md dark:hover:shadow-none transition-shadow"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="text-[10px] font-bold text-[#6B7280] dark:text-white/40 tracking-widest uppercase">{stat.label}</div>
              <stat.icon className="w-4 h-4 text-[#6B7280] dark:text-white/30" strokeWidth={1.5} />
            </div>
            <div className="text-4xl text-[#1A2B3C] dark:text-white mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{stat.value}</div>
            <div className="text-xs text-[#6B7280] dark:text-white/30">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Featured Trip Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-[#0d1117] rounded-3xl border border-[#E5E7EB] dark:border-white/[0.04] overflow-hidden flex flex-col md:flex-row shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-none h-auto md:h-[400px]"
      >
        <div className="relative w-full md:w-[55%] h-[300px] md:h-full">
          <Image src="/kyoto.png" alt="Kyoto Cherry Blossom" fill className="object-cover" />
          <div className="absolute top-6 left-6">
            <div className="bg-white/90 dark:bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-[#1A2B3C] dark:text-white shadow-sm">
              Next adventure · 23 days away
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-[45%] p-10 flex flex-col justify-center">
          <div className="text-[10px] font-bold text-[#6B7280] dark:text-white/40 tracking-widest uppercase mb-4">Japan</div>
          <h2 className="text-4xl text-[#1A2B3C] dark:text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Kyoto in Cherry Blossom Season
          </h2>
          <p className="text-[#6B7280] dark:text-white/40 text-sm leading-relaxed mb-10">
            Ten days following the sakura wave from Tokyo neon to Kyoto temples, ending with street food in Osaka.
          </p>
          
          <div className="grid grid-cols-3 gap-4 border-t border-[#E5E7EB] dark:border-white/[0.04] pt-6 mt-auto">
            <div>
              <div className="text-[10px] font-bold text-[#6B7280] dark:text-white/40 tracking-widest uppercase mb-2">Dates</div>
              <div className="text-sm font-medium text-[#1A2B3C] dark:text-white">Apr 04 → Apr 14</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#6B7280] dark:text-white/40 tracking-widest uppercase mb-2">Stops</div>
              <div className="text-sm font-medium text-[#1A2B3C] dark:text-white">Tokyo, Kyoto, Osaka</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#6B7280] dark:text-white/40 tracking-widest uppercase mb-2">Travelers</div>
              <div className="text-sm font-medium text-[#1A2B3C] dark:text-white">2 people</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
