"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, ChevronRight, Share } from "lucide-react";

const itineraryData = [
  { day: "Day 1", date: "Oct 12, 2026", title: "Arrival & Exploring Gion", items: [
    { time: "10:00 AM", title: "Arrive at Kansai Airport", type: "Flight", cost: "$0" },
    { time: "01:00 PM", title: "Check-in at Ryokan", type: "Stay", cost: "$250" },
    { time: "04:00 PM", title: "Walk through Gion District", type: "Activity", cost: "Free" },
    { time: "07:30 PM", title: "Dinner at Kaiseki Restaurant", type: "Food", cost: "$80" },
  ]},
  { day: "Day 2", date: "Oct 13, 2026", title: "Temples & Bamboo Forests", items: [
    { time: "08:00 AM", title: "Arashiyama Bamboo Grove", type: "Activity", cost: "Free" },
    { time: "11:30 AM", title: "Tenryu-ji Temple", type: "Activity", cost: "$10" },
    { time: "01:00 PM", title: "Lunch by the River", type: "Food", cost: "$25" },
    { time: "03:30 PM", title: "Kinkaku-ji (Golden Pavilion)", type: "Activity", cost: "$15" },
  ]}
];

export default function TripItineraryView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center justify-between mb-2 mt-4">
          <h2 className="text-2xl font-bold text-[#1A2B3C] dark:text-white">Full Itinerary</h2>
          <button className="flex items-center gap-2 text-sm text-[#1A2B3C] dark:text-[#e8834a] font-bold hover:text-blue-600 dark:hover:text-[#f0a060] bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] px-4 py-2 rounded-xl shadow-sm dark:shadow-none hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-colors">
            <Share className="w-4 h-4" /> Share
          </button>
        </div>
        <div className="space-y-12">
          {itineraryData.map((day, i) => (
            <motion.div key={day.day} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="flex items-end gap-4 mb-6">
                <div className="bg-white dark:bg-[#0d1117] px-4 py-2 rounded-xl border border-gray-200 dark:border-white/[0.04] shadow-sm dark:shadow-none">
                  <div className="text-xs text-[#1A2B3C] dark:text-[#e8834a] font-bold uppercase tracking-wider">{day.day}</div>
                  <div className="text-gray-600 dark:text-white/60 font-bold">{day.date}</div>
                </div>
                <div className="pb-2"><h3 className="text-xl font-bold text-[#1A2B3C] dark:text-white">{day.title}</h3></div>
              </div>
              <div className="relative pl-8 space-y-6 before:absolute before:inset-y-0 before:left-[15px] before:w-[2px] before:bg-gray-200 dark:before:bg-white/[0.06]">
                {day.items.map((item, j) => (
                  <div key={j} className="relative flex items-start gap-6 group">
                    <div className="absolute -left-[31px] w-8 h-8 rounded-full bg-[#FDFDFB] dark:bg-[#0a0a0a] border-4 border-gray-100 dark:border-[#161b22] flex items-center justify-center z-10 group-hover:border-blue-100 dark:group-hover:border-[#e8834a]/30 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-white/20 group-hover:bg-[#1A2B3C] dark:group-hover:bg-[#e8834a] transition-colors" />
                    </div>
                    <div className="flex-1 bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] p-5 rounded-2xl group-hover:border-gray-300 dark:group-hover:border-white/[0.1] group-hover:shadow-md dark:group-hover:shadow-none transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 text-[#1A2B3C] dark:text-[#e8834a] text-sm font-bold"><Clock className="w-4 h-4" />{item.time}</div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-gray-100 dark:bg-white/[0.05] rounded-md text-gray-500 dark:text-white/40 border border-gray-200 dark:border-white/[0.06]">{item.type}</span>
                          <span className="text-sm font-bold text-gray-700 dark:text-white/60">{item.cost}</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-[#1A2B3C] dark:text-white">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="space-y-6 mt-4">
        <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] rounded-3xl p-6 shadow-sm dark:shadow-none">
          <h3 className="text-lg font-bold text-[#1A2B3C] dark:text-white mb-6">Trip Overview</h3>
          <div className="space-y-5">
            <div>
              <div className="text-xs text-gray-500 dark:text-white/40 uppercase tracking-wider font-bold mb-1.5">Destinations</div>
              <div className="flex items-center gap-2 text-[#1A2B3C] dark:text-white font-bold"><MapPin className="w-4 h-4 text-blue-500" />Kyoto, Japan</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-white/40 uppercase tracking-wider font-bold mb-1.5">Est. Total Cost</div>
              <div className="text-2xl font-bold text-[#1A2B3C] dark:text-white">$3,200 <span className="text-sm font-semibold text-gray-400 dark:text-white/30">/ 2 people</span></div>
            </div>
            <div className="pt-4 border-t border-gray-100 dark:border-white/[0.04]">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-500 dark:text-white/40 font-medium">Preparation</span>
                <span className="text-[#1A2B3C] dark:text-[#e8834a] font-bold">45%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 dark:bg-white/[0.05] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-[#e8834a] dark:to-[#f0a060] w-[45%]" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] rounded-3xl p-6 shadow-sm dark:shadow-none">
          <h3 className="text-lg font-bold text-[#1A2B3C] dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {["Download PDF", "Add Co-Traveler"].map(action => (
              <button key={action} className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.04] hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-colors text-left group">
                <span className="text-gray-700 dark:text-white/60 font-bold group-hover:text-gray-900 dark:group-hover:text-white">{action}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 dark:text-white/30 group-hover:text-gray-600 dark:group-hover:text-white/60" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
