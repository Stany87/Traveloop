"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3, Globe, MapPin, Receipt, Users } from "lucide-react";
import { fmtCurrency } from "@/lib/currency";

type Overview = {
  summary: {
    usersCount: number;
    tripsCount: number;
    publicTrips: number;
    expensesCount: number;
    totalExpensesCents: number;
  };
  topDestinations: { destination: string; count: number }[];
  monthlyTrips: { label: string; trips: number }[];
};

export default function AdminPage() {
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/overview")
      .then((r) => {
        if (!r.ok) throw new Error("forbidden");
        return r.json();
      })
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch(() => {
        if (!cancelled) setError("Admin access is restricted. Add ADMIN_EMAILS in env to grant access.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const maxTrips = useMemo(
    () => Math.max(1, ...(data?.monthlyTrips.map((x) => x.trips) ?? [1])),
    [data],
  );

  if (error) {
    return (
      <div className="max-w-5xl mx-auto py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  if (!data) {
    return <div className="max-w-5xl mx-auto py-10 text-gray-500 dark:text-white/40">Loading admin dashboard…</div>;
  }

  const money = fmtCurrency(data.summary.totalExpensesCents, "USD");

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#1A2B3C] dark:text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Admin Dashboard
        </h1>
        <p className="text-gray-500 dark:text-white/40 mt-2">Platform analytics and operational insights.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {[
          { label: "Users", value: data.summary.usersCount, icon: Users },
          { label: "Trips", value: data.summary.tripsCount, icon: MapPin },
          { label: "Public Trips", value: data.summary.publicTrips, icon: Globe },
          { label: "Expenses", value: data.summary.expensesCount, icon: Receipt },
          { label: "Volume", value: money, icon: BarChart3 },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#0d1117] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-white/40 font-semibold">{card.label}</span>
              <card.icon className="w-4 h-4 text-gray-400 dark:text-white/30" />
            </div>
            <div className="text-2xl font-bold text-[#1A2B3C] dark:text-white">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#0d1117] p-6">
          <h2 className="text-lg font-semibold text-[#1A2B3C] dark:text-white mb-4">Trips by month</h2>
          <div className="space-y-3">
            {data.monthlyTrips.map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-500 dark:text-white/40">{m.label}</span>
                  <span className="font-semibold text-[#1A2B3C] dark:text-white">{m.trips}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-white/[0.05] overflow-hidden">
                  <div className="h-full bg-[#1A2B3C] dark:bg-[#e8834a]" style={{ width: `${(m.trips / maxTrips) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#0d1117] p-6">
          <h2 className="text-lg font-semibold text-[#1A2B3C] dark:text-white mb-4">Popular destinations</h2>
          <div className="space-y-3">
            {data.topDestinations.length === 0 && <p className="text-sm text-gray-500 dark:text-white/40">No destination data yet.</p>}
            {data.topDestinations.map((d) => (
              <div key={d.destination} className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.04] px-4 py-3">
                <span className="font-medium text-[#1A2B3C] dark:text-white">{d.destination}</span>
                <span className="text-sm text-gray-500 dark:text-white/40">{d.count} trips</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
