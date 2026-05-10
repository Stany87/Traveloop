"use client";

import { motion } from "framer-motion";
import {
  GripVertical,
  MapPin,
  Clock,
  Camera,
  Utensils,
  Mountain,
  ChevronDown,
  Plus,
  Check,
} from "lucide-react";
import Image from "next/image";
import Container from "./Container";

const days = [
  {
    day: 1,
    date: "Mar 15, 2026",
    location: "Santorini, Greece",
    activities: [
      {
        time: "08:00",
        title: "Airport Transfer to Oia",
        duration: "45 min",
        icon: MapPin,
        type: "Transport",
        completed: true,
        image: "/santorini.png",
      },
      {
        time: "10:00",
        title: "Check-in at Canaves Suites",
        duration: "1 hr",
        icon: Check,
        type: "Accommodation",
        completed: true,
        image: "/santorini.png",
      },
      {
        time: "12:30",
        title: "Lunch at Ammoudi Fish Tavern",
        duration: "1.5 hrs",
        icon: Utensils,
        type: "Dining",
        completed: false,
        image: "/santorini.png",
      },
      {
        time: "15:00",
        title: "Photography Tour — Blue Domes",
        duration: "2 hrs",
        icon: Camera,
        type: "Activity",
        completed: false,
        image: "/santorini.png",
      },
      {
        time: "18:30",
        title: "Sunset at Oia Castle",
        duration: "1.5 hrs",
        icon: Mountain,
        type: "Experience",
        completed: false,
        image: "/santorini.png",
      },
    ],
  },
  {
    day: 2,
    date: "Mar 16, 2026",
    location: "Santorini, Greece",
    activities: [
      {
        time: "09:00",
        title: "Volcanic Hot Springs Tour",
        duration: "3 hrs",
        icon: Mountain,
        type: "Adventure",
        completed: false,
        image: "/santorini.png",
      },
      {
        time: "13:00",
        title: "Wine Tasting at Santo Wines",
        duration: "2 hrs",
        icon: Utensils,
        type: "Dining",
        completed: false,
        image: "/santorini.png",
      },
    ],
  },
];

export default function ItineraryBuilder() {
  return (
    <section className="py-28 lg:py-36 bg-[#0d1117]">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#e8834a] text-xs font-semibold tracking-widest uppercase mb-6">
            Itinerary Builder
          </span>
          <h2
            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Plan every detail
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8834a] to-[#f0a060]">
              effortlessly
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            Drag, drop, and organize your perfect trip with our intuitive
            day-by-day itinerary builder.
          </p>
        </motion.div>

        {/* Builder Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9 }}
          className="bg-[#0a0a0a] rounded-[2rem] border border-white/[0.04] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)]"
        >
          {/* Builder Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-8 lg:px-10 py-6 border-b border-white/[0.04] gap-4">
            <div className="flex items-center gap-5">
              <h3 className="text-lg font-bold text-white">
                Santorini Getaway
              </h3>
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                7 Days
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] text-sm text-white/60 hover:bg-white/[0.08] transition-colors duration-300 border border-white/[0.04]">
                <Plus className="w-4 h-4" />
                Add Day
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e8834a] text-sm font-semibold text-white hover:bg-[#d4713b] transition-colors duration-300">
                Save Itinerary
              </button>
            </div>
          </div>

          {/* Days */}
          <div className="p-8 lg:p-10 space-y-10">
            {days.map((day, dayIndex) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: dayIndex * 0.15 }}
              >
                {/* Day Header */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e8834a] to-[#f0a060] flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-white">
                      {day.day}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">
                      Day {day.day}
                    </h4>
                    <p className="text-xs text-white/30 mt-0.5">
                      {day.date} · {day.location}
                    </p>
                  </div>
                  <button className="ml-auto p-2 text-white/20 hover:text-white/40 transition-colors">
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>

                {/* Activities */}
                <div className="space-y-3 ml-7 pl-7 border-l border-white/[0.04]">
                  {day.activities.map((activity, actIndex) => (
                    <motion.div
                      key={activity.title}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: dayIndex * 0.1 + actIndex * 0.08,
                      }}
                      className="group flex items-start gap-4 bg-[#161b22] rounded-2xl p-5 border border-white/[0.03] hover:border-white/[0.08] transition-all duration-300 cursor-grab active:cursor-grabbing hover:bg-[#1c2333]"
                    >
                      {/* Drag Handle */}
                      <div className="pt-1 text-white/10 group-hover:text-white/20 transition-colors flex-shrink-0">
                        <GripVertical className="w-4 h-4" />
                      </div>

                      {/* Image Thumbnail */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={activity.image}
                          alt={activity.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <activity.icon
                            className={`w-4 h-4 flex-shrink-0 ${
                              activity.completed
                                ? "text-emerald-400"
                                : "text-white/30"
                            }`}
                          />
                          <span className="text-[10px] font-semibold text-[#e8834a] uppercase tracking-wider">
                            {activity.type}
                          </span>
                        </div>
                        <h5
                          className={`text-sm font-semibold truncate ${
                            activity.completed
                              ? "text-white/40 line-through"
                              : "text-white group-hover:text-[#e8834a]"
                          } transition-colors duration-300`}
                        >
                          {activity.title}
                        </h5>
                      </div>

                      {/* Time */}
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs font-semibold text-white/60">
                          {activity.time}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <Clock className="w-3 h-3 text-white/20" />
                          <span className="text-[10px] text-white/20">
                            {activity.duration}
                          </span>
                        </div>
                      </div>

                      {/* Completion indicator */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            activity.completed
                              ? "border-emerald-400 bg-emerald-400/20"
                              : "border-white/10 group-hover:border-white/20"
                          } transition-colors duration-300`}
                        >
                          {activity.completed && (
                            <Check className="w-3 h-3 text-emerald-400" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Add Activity */}
                  <button className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl border border-dashed border-white/[0.06] text-white/20 hover:text-white/40 hover:border-white/[0.12] transition-all duration-300">
                    <Plus className="w-4 h-4" />
                    <span className="text-xs font-medium">Add Activity</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
