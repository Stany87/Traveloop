"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Clock, MapPin, ChevronRight, Share } from "lucide-react";
import { fmtCurrency } from "@/lib/currency";

type TripActivity = {
  time: string;
  title: string;
  type: string;
  costCents: number | null;
};

type TripDay = {
  dayIndex: number;
  date: string;
  title: string | null;
  activities: TripActivity[];
};

type TripDetail = {
  id: string;
  destination: string;
  budgetTotal: number | null;
  currency: string;
  isPublic: boolean;
  days: TripDay[];
};

const fmtCost = (cents: number | null, currency: string = "INR") => {
  if (cents == null) return "—";
  return fmtCurrency(cents, currency);
};

export default function TripItineraryView() {
  const params = useParams();
  const id = params.id as string;
  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/trips/${id}`)
      .then((r) => {
        if (r.status === 404) throw new Error("notfound");
        if (!r.ok) throw new Error("fail");
        return r.json();
      })
      .then((d) => {
        if (!cancelled) setTrip(d.trip);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load itinerary.");
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return <p className="text-red-500 py-8">{error}</p>;
  }
  if (!trip) {
    return <div className="py-20 text-center text-gray-500 dark:text-white/40">Loading…</div>;
  }

  const days = [...trip.days].sort((a, b) => a.dayIndex - b.dayIndex);
  const totalEst =
    trip.budgetTotal != null
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: trip.currency }).format(trip.budgetTotal / 100)
      : "—";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center justify-between mb-6 mt-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-[#1A2B3C] dark:text-white">Full Itinerary</h2>
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/[0.05] p-1 rounded-xl">
              <button onClick={() => setViewMode("list")} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${viewMode === "list" ? "bg-white dark:bg-[#1A2B3C] text-gray-900 dark:text-white shadow" : "text-gray-500 dark:text-white/40"}`}>List</button>
              <button onClick={() => setViewMode("calendar")} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${viewMode === "calendar" ? "bg-white dark:bg-[#1A2B3C] text-gray-900 dark:text-white shadow" : "text-gray-500 dark:text-white/40"}`}>Calendar</button>
            </div>
          </div>
          <button
            type="button"
            onClick={async () => {
              if (!trip.isPublic) return;
              await navigator.clipboard.writeText(`${window.location.origin}/shared/${trip.id}`);
            }}
            className="hidden sm:flex items-center gap-2 text-sm text-[#1A2B3C] dark:text-[#e8834a] font-bold hover:text-blue-600 dark:hover:text-[#f0a060] bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] px-4 py-2 rounded-xl shadow-sm dark:shadow-none hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-colors"
          >
            <Share className="w-4 h-4" /> {trip.isPublic ? "Copy link" : "Set Public"}
          </button>
        </div>
        {viewMode === "calendar" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {days.map((day) => (
              <div key={day.dayIndex} className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] p-4 rounded-2xl shadow-sm dark:shadow-none min-h-[150px]">
                <div className="text-xs text-[#1A2B3C] dark:text-[#e8834a] font-bold uppercase tracking-wider mb-1">Day {day.dayIndex + 1}</div>
                <div className="text-gray-600 dark:text-white/60 font-bold text-xs mb-3">{new Date(day.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</div>
                <div className="space-y-2">
                  {day.activities.slice(0, 3).map((item, j) => (
                    <div key={j} className="text-sm truncate"><span className="text-gray-400 dark:text-white/30 mr-1">{item.time}</span> {item.title}</div>
                  ))}
                  {day.activities.length > 3 && (
                    <div className="text-xs text-blue-500 dark:text-[#e8834a] font-bold mt-2">+{day.activities.length - 3} more</div>
                  )}
                  {day.activities.length === 0 && (
                    <div className="text-xs text-gray-400 dark:text-white/30 italic">No activities</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
          {days.map((day, i) => (
            <motion.div key={day.dayIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <div className="flex items-end gap-4 mb-6 flex-wrap">
                <div className="bg-white dark:bg-[#0d1117] px-4 py-2 rounded-xl border border-gray-200 dark:border-white/[0.04] shadow-sm dark:shadow-none">
                  <div className="text-xs text-[#1A2B3C] dark:text-[#e8834a] font-bold uppercase tracking-wider">
                    Day {day.dayIndex + 1}
                  </div>
                  <div className="text-gray-600 dark:text-white/60 font-bold text-sm">
                    {new Date(day.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </div>
                <div className="pb-2">
                  <h3 className="text-xl font-bold text-[#1A2B3C] dark:text-white">
                    {day.title || `Day ${day.dayIndex + 1}`}
                  </h3>
                </div>
              </div>
              <div className="relative pl-8 space-y-6 before:absolute before:inset-y-0 before:left-[15px] before:w-[2px] before:bg-gray-200 dark:before:bg-white/[0.06]">
                {day.activities.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-white/30 pl-2">No activities yet — add them in the builder.</p>
                )}
                {day.activities.map((item, j) => (
                  <div key={j} className="relative flex items-start gap-6 group">
                    <div className="absolute -left-[31px] w-8 h-8 rounded-full bg-[#FDFDFB] dark:bg-[#0a0a0a] border-4 border-gray-100 dark:border-[#161b22] flex items-center justify-center z-10 group-hover:border-blue-100 dark:group-hover:border-[#e8834a]/30 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-white/20 group-hover:bg-[#1A2B3C] dark:group-hover:bg-[#e8834a] transition-colors" />
                    </div>
                    <div className="flex-1 bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] p-5 rounded-2xl group-hover:border-gray-300 dark:group-hover:border-white/[0.1] group-hover:shadow-md dark:group-hover:shadow-none transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 text-[#1A2B3C] dark:text-[#e8834a] text-sm font-bold">
                          <Clock className="w-4 h-4" />
                          {item.time}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-gray-100 dark:bg-white/[0.05] rounded-md text-gray-500 dark:text-white/40 border border-gray-200 dark:border-white/[0.06]">
                            {item.type}
                          </span>
                          <span className="text-sm font-bold text-gray-700 dark:text-white/60">{fmtCost(item.costCents, trip.currency)}</span>
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
        )}
      </div>
      <div className="space-y-6 mt-4">
        <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] rounded-3xl p-6 shadow-sm dark:shadow-none">
          <h3 className="text-lg font-bold text-[#1A2B3C] dark:text-white mb-6">Trip Overview</h3>
          <div className="space-y-5">
            <div>
              <div className="text-xs text-gray-500 dark:text-white/40 uppercase tracking-wider font-bold mb-1.5">Destination</div>
              <div className="flex items-center gap-2 text-[#1A2B3C] dark:text-white font-bold">
                <MapPin className="w-4 h-4 text-blue-500" />
                {trip.destination}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-white/40 uppercase tracking-wider font-bold mb-1.5">Planned budget</div>
              <div className="text-2xl font-bold text-[#1A2B3C] dark:text-white">{totalEst}</div>
            </div>
            <div className="pt-4 border-t border-gray-100 dark:border-white/[0.04]">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-500 dark:text-white/40 font-medium">Itinerary days</span>
                <span className="text-[#1A2B3C] dark:text-[#e8834a] font-bold">{days.length}</span>
              </div>
              <div className="h-2 w-full bg-gray-100 dark:bg-white/[0.05] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-[#e8834a] dark:to-[#f0a060]"
                  style={{ width: `${Math.min(100, days.length * 10)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] rounded-3xl p-6 shadow-sm dark:shadow-none">
          <h3 className="text-lg font-bold text-[#1A2B3C] dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link
              href={`/dashboard/trips/${id}/invoice`}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.04] hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-colors text-left group"
            >
              <span className="text-gray-700 dark:text-white/60 font-bold group-hover:text-gray-900 dark:group-hover:text-white">
                Open invoice
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 dark:text-white/30 group-hover:text-gray-600 dark:group-hover:text-white/60" />
            </Link>
            <button
              type="button"
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.04] hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-colors text-left group"
            >
              <span className="text-gray-700 dark:text-white/60 font-bold group-hover:text-gray-900 dark:group-hover:text-white">
                Invite traveler (soon)
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 dark:text-white/30 group-hover:text-gray-600 dark:group-hover:text-white/60" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
