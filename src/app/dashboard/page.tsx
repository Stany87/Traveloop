"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Wallet, TrendingUp, Sparkles, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getCoverImage } from "@/lib/images";

type Stats = {
  activeTrips: number;
  totalPlannedCents: number;
  spentCents: number;
  daysOnRoad: number;
  baseCurrency: string;
};

type Featured = {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  coverImage: string | null;
  status: string;
} | null;

const currencyLocales: Record<string, string> = {
  INR: "en-IN",
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  JPY: "ja-JP",
  AUD: "en-AU",
  CAD: "en-CA",
};

const fmtMoney = (cents: number, currency: string = "INR") =>
  new Intl.NumberFormat(currencyLocales[currency] || "en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(
    cents / 100,
  );

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats | null>(null);
  const [featured, setFeatured] = useState<Featured>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/dashboard/stats")
      .then((r) => {
        if (r.status === 401) return null;
        if (!r.ok) throw new Error("Could not load dashboard");
        return r.json();
      })
      .then((d) => {
        if (!d || cancelled) return;
        setStats(d.stats);
        setFeatured(d.featured);
      })
      .catch(() => {
        if (!cancelled) setLoadError("Unable to load stats.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const greeting = useMemo(() => {
    const n = session?.user?.name || "Traveler";
    const first = n.split(/\s+/)[0] || "Traveler";
    return first;
  }, [session?.user?.name]);

  const statCards = stats
    ? [
        {
          label: "ACTIVE TRIPS",
          value: String(stats.activeTrips),
          sub: "Planning & upcoming",
          icon: Calendar,
        },
        {
          label: "TOTAL PLANNED",
          value: fmtMoney(stats.totalPlannedCents, stats.baseCurrency),
          sub: "Budgets across trips",
          icon: Wallet,
        },
        {
          label: "RECORDED SPEND",
          value: fmtMoney(stats.spentCents, stats.baseCurrency),
          sub: "From expenses log",
          icon: TrendingUp,
        },
        {
          label: "DAYS AHEAD (12 MO)",
          value: String(Math.max(0, stats.daysOnRoad)),
          sub: "On the calendar",
          icon: Sparkles,
        },
      ]
    : [];

  const startEnd = (isoS: string, isoE: string) => {
    const s = new Date(isoS);
    const e = new Date(isoE);
    const o: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
    return `${s.toLocaleDateString(undefined, o)} → ${e.toLocaleDateString(undefined, o)}`;
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-4">
        <div>
          <h3 className="text-xs font-bold text-[#6B7280] dark:text-white/40 uppercase tracking-widest mb-4">
            Hello, {greeting}
          </h3>
          <h1
            className="text-4xl sm:text-[3.5rem] leading-[1.1] text-[#1A2B3C] dark:text-white"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 500 }}
          >
            Your trips, budgets, and itineraries
            <br />
            <span className="text-[#6B7280] dark:text-white/40">in one calm workspace.</span>
          </h1>
          {loadError && <p className="mt-3 text-sm text-amber-600 dark:text-amber-400">{loadError}</p>}
        </div>
        <div className="pb-2">
          <Link
            href="/dashboard/trips/create"
            className="flex items-center gap-2 px-6 py-3 bg-[#1A2B3C] dark:bg-[#e8834a] text-white rounded-full text-sm font-medium hover:bg-[#0F172A] dark:hover:bg-[#d4713b] transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            Plan a new trip
          </Link>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#FDFDFB] dark:bg-[#0d1117] border border-[#E5E7EB] dark:border-white/[0.04] rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-md dark:hover:shadow-none transition-shadow"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="text-[10px] font-bold text-[#6B7280] dark:text-white/40 tracking-widest uppercase">
                  {stat.label}
                </div>
                <stat.icon className="w-4 h-4 text-[#6B7280] dark:text-white/30" strokeWidth={1.5} />
              </div>
              <div
                className="text-3xl sm:text-4xl text-[#1A2B3C] dark:text-white mb-2"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-[#6B7280] dark:text-white/30">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      )}

      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-[#0d1117] rounded-3xl border border-[#E5E7EB] dark:border-white/[0.04] overflow-hidden flex flex-col md:flex-row shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-none h-auto md:h-[400px]"
        >
          <div className="relative w-full md:w-[55%] h-[300px] md:h-full">
            <Image
              src={getCoverImage(featured.destination, featured.coverImage)}
              alt={featured.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-6 left-6">
              <div className="bg-white/90 dark:bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-[#1A2B3C] dark:text-white shadow-sm uppercase tracking-wide">
                {featured.status}
              </div>
            </div>
          </div>

          <div className="w-full md:w-[45%] p-10 flex flex-col justify-center">
            <div className="text-[10px] font-bold text-[#6B7280] dark:text-white/40 tracking-widest uppercase mb-4">
              {featured.destination}
            </div>
            <h2
              className="text-3xl sm:text-4xl text-[#1A2B3C] dark:text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {featured.title}
            </h2>
            <p className="text-[#6B7280] dark:text-white/40 text-sm leading-relaxed mb-10">
              Open this trip to edit the itinerary, budget, packing list, and notes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#E5E7EB] dark:border-white/[0.04] pt-6 mt-auto">
              <div>
                <div className="text-[10px] font-bold text-[#6B7280] dark:text-white/40 tracking-widest uppercase mb-2">
                  Dates
                </div>
                <div className="text-sm font-medium text-[#1A2B3C] dark:text-white">
                  {startEnd(featured.startDate, featured.endDate)}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#6B7280] dark:text-white/40 tracking-widest uppercase mb-2">
                  Actions
                </div>
                <Link
                  href={`/dashboard/trips/${featured.id}`}
                  className="text-sm font-bold text-[#1A2B3C] dark:text-[#e8834a] hover:underline"
                >
                  View trip →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {!featured && stats && (
        <div className="rounded-3xl border border-dashed border-gray-300 dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.02] p-12 text-center">
          <p className="text-[#6B7280] dark:text-white/40 font-medium mb-4">No trips yet.</p>
          <Link
            href="/dashboard/trips/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A2B3C] dark:bg-[#e8834a] text-white rounded-full text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Create your first trip
          </Link>
        </div>
      )}
    </div>
  );
}
