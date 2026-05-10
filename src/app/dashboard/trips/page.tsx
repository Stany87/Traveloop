"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, MapPin, Calendar, MoreHorizontal, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCoverImage } from "@/lib/images";

type ApiTrip = {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: string;
  coverImage: string | null;
};

const statusStyle: Record<string, string> = {
  PLANNING: "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20",
  UPCOMING: "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20",
  COMPLETED: "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20",
};

export default function MyTripsPage() {
  const [trips, setTrips] = useState<ApiTrip[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/trips")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => setTrips(d.trips ?? []))
      .catch(() => setError("Could not load trips."));
  }, []);

  const rows = useMemo(
    () =>
      trips.map((t) => ({
        ...t,
        dateLabel: `${new Date(t.startDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })} — ${new Date(t.endDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`,
        image: getCoverImage(t.destination, t.coverImage),
        statusLabel: t.status.charAt(0) + t.status.slice(1).toLowerCase(),
        statusClass: statusStyle[t.status] ?? statusStyle.PLANNING,
      })),
    [trips],
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1
            className="text-4xl font-bold text-[#1A2B3C] dark:text-white mb-2"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            My Trips
          </h1>
          <p className="text-gray-500 dark:text-white/40 font-medium">
            Manage your upcoming and past adventures.
          </p>
          {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
        <Link
          href="/dashboard/trips/create"
          className="px-6 py-3 bg-[#1A2B3C] dark:bg-[#e8834a] text-white text-sm font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-[#d4713b] transition-colors shadow-md flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" /> New Trip
        </Link>
      </div>

      {rows.length === 0 && !error && (
        <div className="rounded-3xl border border-dashed border-gray-200 dark:border-white/[0.08] p-12 text-center text-gray-500 dark:text-white/40">
          No trips yet. Create one to get started.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rows.map((trip, index) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-white dark:bg-[#0d1117] rounded-[2rem] border border-gray-200 dark:border-white/[0.04] overflow-hidden hover:border-gray-300 dark:hover:border-white/[0.1] hover:shadow-xl dark:hover:shadow-none shadow-sm dark:shadow-none transition-all duration-300 flex flex-col"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src={trip.image}
                alt={trip.destination}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg border ${trip.statusClass} shadow-sm`}
                >
                  {trip.statusLabel}
                </span>
              </div>
              <button
                type="button"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 dark:bg-black/40 shadow-sm flex items-center justify-center text-gray-700 dark:text-white hover:bg-white dark:hover:bg-black/60 border border-gray-200 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="More"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-[#1A2B3C] dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-[#e8834a] transition-colors">
                {trip.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-white/40 font-medium mb-5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {trip.destination}
              </p>
              <div className="mt-auto space-y-4">
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-600 dark:text-white/50">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/[0.05] flex items-center justify-center text-gray-400 dark:text-white/30">
                    <Calendar className="w-4 h-4" />
                  </div>
                  {trip.dateLabel}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/[0.04]">
                  <div className="text-xs font-bold text-gray-500 dark:text-white/40 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] px-3 py-1.5 rounded-lg">
                    Trip
                  </div>
                  <Link
                    href={`/dashboard/trips/${trip.id}`}
                    className="text-sm font-bold text-[#1A2B3C] dark:text-[#e8834a] hover:text-blue-600 dark:hover:text-[#f0a060] flex items-center gap-1 group/link"
                  >
                    View Trip
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
