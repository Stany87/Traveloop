"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Calendar,
  DollarSign,
  MapPin,
  Plane,
  BarChart3,
  Globe,
  Clock,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import Container from "./Container";

const tripCards = [
  {
    destination: "Santorini, Greece",
    dates: "Mar 15 — Mar 22",
    status: "Upcoming",
    statusColor: "bg-emerald-500",
    budget: "$4,200",
    spent: "$1,840",
    progress: 44,
    activities: 12,
  },
  {
    destination: "Bali, Indonesia",
    dates: "Apr 5 — Apr 12",
    status: "Planning",
    statusColor: "bg-amber-500",
    budget: "$3,800",
    spent: "$920",
    progress: 24,
    activities: 8,
  },
];

const stats = [
  {
    label: "Total Trips",
    value: "24",
    change: "+3",
    icon: Globe,
    color: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-400",
  },
  {
    label: "Countries Visited",
    value: "18",
    change: "+2",
    icon: MapPin,
    color: "from-emerald-500/20 to-emerald-600/5",
    iconColor: "text-emerald-400",
  },
  {
    label: "Total Spent",
    value: "$42.8K",
    change: "-12%",
    icon: DollarSign,
    color: "from-orange-500/20 to-orange-600/5",
    iconColor: "text-[#e8834a]",
  },
  {
    label: "Avg. Trip Duration",
    value: "6.5 days",
    change: "+0.5",
    icon: Clock,
    color: "from-purple-500/20 to-purple-600/5",
    iconColor: "text-purple-400",
  },
];

const itinerary = [
  {
    time: "08:00 AM",
    title: "Arrive at Santorini Airport",
    type: "Transport",
    icon: Plane,
  },
  {
    time: "10:30 AM",
    title: "Check-in at Canaves Oia Suites",
    type: "Accommodation",
    icon: MapPin,
  },
  {
    time: "01:00 PM",
    title: "Lunch at Ammoudi Bay",
    type: "Dining",
    icon: Calendar,
  },
  {
    time: "04:00 PM",
    title: "Oia Village Walking Tour",
    type: "Activity",
    icon: Globe,
  },
  {
    time: "07:30 PM",
    title: "Sunset at Oia Castle",
    type: "Experience",
    icon: TrendingUp,
  },
];

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="py-28 lg:py-36 bg-[#FDFDFB] dark:bg-[#0a0a0a]">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#e8834a]/10 dark:bg-white/[0.04] border border-[#e8834a]/20 dark:border-white/[0.06] text-[#e8834a] text-xs font-semibold tracking-widest uppercase mb-6">
            Travel Dashboard
          </span>
          <h2
            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1A2B3C] dark:text-white tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Your personal
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8834a] to-[#f0a060]">
              command center
            </span>
          </h2>
          <p className="text-gray-500 dark:text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            Track trips, manage budgets, and plan itineraries all from one
            beautifully designed dashboard.
          </p>
        </motion.div>

        {/* Dashboard Mock */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9 }}
          className="bg-[#0d1117] rounded-[2rem] border border-white/[0.04] p-8 lg:p-10 shadow-[0_0_80px_rgba(0,0,0,0.5)]"
        >
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1.5">
                Welcome back, Alex
              </h3>
              <p className="text-sm text-white/40">
                You have 2 upcoming trips this month
              </p>
            </div>
            <button className="flex items-center gap-2.5 px-6 py-3 bg-[#e8834a] rounded-xl text-sm font-semibold text-white hover:bg-[#d4713b] transition-colors duration-300 self-start">
              <Calendar className="w-4 h-4" />
              Plan New Trip
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#161b22] rounded-2xl p-6 border border-white/[0.03] hover:border-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/30 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content: Trips + Itinerary */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-7">
            {/* Trips (3 cols) */}
            <div className="lg:col-span-3 space-y-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                  Active Trips
                </h4>
                <button className="text-xs text-[#e8834a] font-medium flex items-center gap-1 hover:text-[#f0a060] transition-colors">
                  View All <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {tripCards.map((trip, index) => (
                <motion.div
                  key={trip.destination}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="bg-[#161b22] rounded-2xl p-6 border border-white/[0.03] hover:border-white/[0.06] transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h5 className="font-bold text-white group-hover:text-[#e8834a] transition-colors duration-300">
                          {trip.destination}
                        </h5>
                        <span
                          className={`w-2 h-2 rounded-full ${trip.statusColor}`}
                        />
                        <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">
                          {trip.status}
                        </span>
                      </div>
                      <p className="text-xs text-white/30 mb-4">
                        {trip.dates} · {trip.activities} activities planned
                      </p>

                      {/* Budget Bar */}
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#e8834a] to-[#f0a060] rounded-full transition-all duration-700"
                            style={{ width: `${trip.progress}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-white/40 font-medium whitespace-nowrap">
                          {trip.spent} / {trip.budget}
                        </span>
                      </div>
                    </div>

                    <button className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center hover:bg-[#e8834a] transition-all duration-300 border border-white/[0.04] flex-shrink-0">
                      <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Budget Overview Mini */}
              <div className="bg-[#161b22] rounded-2xl p-6 border border-white/[0.03]">
                <div className="flex items-center gap-2.5 mb-5">
                  <BarChart3 className="w-4 h-4 text-[#e8834a]" />
                  <span className="text-sm font-semibold text-white/70">
                    Monthly Spending
                  </span>
                </div>
                <div className="flex items-end gap-2 h-24">
                  {[35, 52, 28, 65, 42, 78, 55, 45, 68, 38, 72, 60].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-[#e8834a]/60 to-[#e8834a]/20 hover:from-[#e8834a] hover:to-[#e8834a]/40 transition-all duration-300 cursor-pointer"
                        style={{ height: `${h}%` }}
                      />
                    )
                  )}
                </div>
                <div className="flex justify-between mt-4 text-[10px] text-white/20 font-medium">
                  <span>Jan</span>
                  <span>Jun</span>
                  <span>Dec</span>
                </div>
              </div>
            </div>

            {/* Itinerary Timeline (2 cols) */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                  Today&apos;s Itinerary
                </h4>
                <span className="text-xs text-white/20 font-medium">
                  Day 1 of 7
                </span>
              </div>

              <div className="bg-[#161b22] rounded-2xl p-6 border border-white/[0.03] space-y-0">
                {itinerary.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex gap-4 group cursor-pointer"
                  >
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          index === 0
                            ? "bg-[#e8834a]"
                            : "bg-white/[0.04] group-hover:bg-white/[0.08]"
                        } transition-colors duration-300`}
                      >
                        <item.icon
                          className={`w-4 h-4 ${
                            index === 0 ? "text-white" : "text-white/40"
                          }`}
                        />
                      </div>
                      {index < itinerary.length - 1 && (
                        <div className="w-[1px] h-full min-h-[36px] bg-white/[0.04] my-1.5" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-6">
                      <span className="text-[10px] text-[#e8834a] font-semibold uppercase tracking-wider">
                        {item.time}
                      </span>
                      <h5 className="text-sm font-semibold text-white mt-1 group-hover:text-[#e8834a] transition-colors duration-300">
                        {item.title}
                      </h5>
                      <span className="text-[11px] text-white/25 font-medium">
                        {item.type}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
