"use client";

import { useEffect, useState } from "react";
import { CheckSquare, X, ChevronRight } from "lucide-react";
import Link from "next/link";

type UpcomingTrip = {
  id: string;
  title: string;
  daysAway: number;
};

export default function ChecklistWidget() {
  const [trip, setTrip] = useState<UpcomingTrip | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetch("/api/trips")
      .then((r) => r.json())
      .then((data) => {
        const trips = data.trips ?? [];
        const now = new Date();
        const nowUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

        let closest: UpcomingTrip | null = null;
        for (const t of trips) {
          const start = new Date(t.startDate);
          const startUTC = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
          const diff = Math.ceil((startUTC - nowUTC) / 86400000);
          if (diff > 0 && diff <= 5) {
            if (!closest || diff < closest.daysAway) {
              closest = { id: t.id, title: t.title, daysAway: diff };
            }
          }
        }
        setTrip(closest);
      })
      .catch(() => {});
  }, []);

  if (!trip || dismissed) return null;

  return (
    <div className="fixed bottom-6 left-24 z-50 animate-in slide-in-from-bottom-4 duration-500">
      <div className="relative bg-white dark:bg-[#161b22] border border-gray-200 dark:border-white/[0.08] rounded-2xl shadow-2xl dark:shadow-black/40 p-5 pr-10 max-w-sm">
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-100 dark:bg-white/[0.08] flex items-center justify-center text-gray-400 dark:text-white/40 hover:text-gray-700 dark:hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/15 flex items-center justify-center flex-shrink-0">
            <CheckSquare className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1A2B3C] dark:text-white mb-0.5">
              Packing checklist reminder
            </p>
            <p className="text-xs text-gray-500 dark:text-white/40 mb-3 leading-relaxed">
              <span className="font-semibold text-[#1A2B3C] dark:text-white">{trip.title}</span> is{" "}
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                {trip.daysAway === 1 ? "tomorrow" : `${trip.daysAway} days away`}
              </span>
              ! Have you packed everything?
            </p>
            <Link
              href={`/dashboard/trips/${trip.id}/checklist`}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#e8834a] hover:text-[#d4713b] transition-colors"
            >
              Open checklist
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Pulse dot */}
        <div className="absolute -top-1.5 -right-1.5 w-4 h-4">
          <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-75" />
          <div className="absolute inset-0.5 bg-amber-500 rounded-full" />
        </div>
      </div>
    </div>
  );
}
