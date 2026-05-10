"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Plane, Home, Activity, Utensils, AlertTriangle, Plus } from "lucide-react";
import { fmtCurrency } from "@/lib/currency";

type Expense = { id: string; category: string; amountCents: number; label: string | null };

type TripBudget = {
  budgetTotal: number | null;
  currency: string;
  expenses: Expense[];
};

const categoryMeta: Record<string, { icon: typeof Plane; color: string }> = {
  Flights: { icon: Plane, color: "bg-blue-500" },
  Transport: { icon: Plane, color: "bg-blue-500" },
  Accommodation: { icon: Home, color: "bg-emerald-500" },
  Activities: { icon: Activity, color: "bg-amber-500" },
  Food: { icon: Utensils, color: "bg-purple-500" },
  Other: { icon: Activity, color: "bg-gray-500" },
};

export default function BudgetPage() {
  const params = useParams();
  const id = params.id as string;
  const [trip, setTrip] = useState<TripBudget | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cat, setCat] = useState("Food");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [adding, setAdding] = useState(false);

  const refreshTrip = useCallback(() => {
    return fetch(`/api/trips/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => setTrip(d.trip))
      .catch(() => setError("Could not load budget."));
  }, [id]);

  useEffect(() => {
    refreshTrip();
  }, [refreshTrip]);

  const totalBudget = trip?.budgetTotal ?? 0;
  const totalSpent = useMemo(
    () => (trip?.expenses ?? []).reduce((s, e) => s + e.amountCents, 0),
    [trip],
  );
  const remaining = totalBudget - totalSpent;

  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of trip?.expenses ?? []) {
      map.set(e.category, (map.get(e.category) ?? 0) + e.amountCents);
    }
    return Array.from(map.entries()).map(([category, amountCents]) => ({
      category,
      amountCents,
    }));
  }, [trip]);

  const percentages = useMemo(() => {
    if (totalSpent <= 0) return byCategory.map((c) => ({ ...c, percentage: 0 }));
    return byCategory.map((c) => ({
      ...c,
      percentage: Math.round((c.amountCents / totalSpent) * 100),
    }));
  }, [byCategory, totalSpent]);

  const addExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const usd = parseFloat(amount);
    if (Number.isNaN(usd) || usd <= 0) return;
    setAdding(true);
    await fetch(`/api/trips/${id}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: cat,
        label: label.trim() || undefined,
        amountCents: Math.round(usd * 100),
      }),
    });
    setAmount("");
    setLabel("");
    await refreshTrip();
    setAdding(false);
  };

  if (error) {
    return <p className="text-red-500 py-8">{error}</p>;
  }
  if (!trip) {
    return <div className="py-20 text-center text-gray-500 dark:text-white/40">Loading…</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] rounded-3xl p-8 shadow-sm dark:shadow-none">
          <h3 className="text-lg font-bold text-[#1A2B3C] dark:text-white mb-8">Budget Overview</h3>
          <div className="text-center mb-8 space-y-2">
            <div className="text-gray-400 dark:text-white/40 text-[10px] font-bold uppercase tracking-widest">Total budget</div>
            <div className="text-3xl font-bold text-[#1A2B3C] dark:text-white">
              {fmtCurrency(totalBudget, trip.currency)}
            </div>
            <div className="text-gray-500 dark:text-white/40 text-sm">Recorded spend</div>
            <div className="text-2xl font-bold text-[#1A2B3C] dark:text-white">
              {fmtCurrency(totalSpent, trip.currency)}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-white/40 font-medium">Remaining</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                {fmtCurrency(remaining, trip.currency)}
              </span>
            </div>
          </div>
        </div>
        {totalBudget > 0 && remaining < totalBudget * 0.15 && remaining >= 0 && (
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-800 dark:text-amber-400 mb-1">Budget heads up</h4>
              <p className="text-xs text-amber-700 dark:text-amber-400/70 leading-relaxed font-medium">
                You have less than 15% of your planned budget left.
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] rounded-3xl p-8 h-full shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h3 className="text-lg font-bold text-[#1A2B3C] dark:text-white">Expense log</h3>
          </div>
          <form onSubmit={addExpense} className="flex flex-wrap gap-3 mb-8 p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06]">
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-sm font-medium"
            >
              {["Food", "Flights", "Accommodation", "Activities", "Transport", "Other"].map((c) => (
                <option className="bg-white dark:bg-[#0d1117]" key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              placeholder="Label (optional)"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="flex-1 min-w-[120px] bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-sm"
            />
            <input
              type="number"
              min={0}
              step="0.01"
              placeholder={trip.currency}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-28 bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-sm"
              required
            />
            <button
              type="submit"
              disabled={adding}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A2B3C] dark:bg-[#e8834a] text-white text-sm font-bold hover:opacity-90 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </form>
          <div className="space-y-4">
            {percentages.length === 0 && <p className="text-sm text-gray-500 dark:text-white/40">No expenses logged.</p>}
            {percentages.map((expense, i) => {
              const meta = categoryMeta[expense.category] ?? categoryMeta.Other;
              const Icon = meta.icon;
              return (
                <motion.div
                  key={expense.category + i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group p-5 rounded-2xl border border-gray-100 dark:border-white/[0.04] bg-gray-50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.04] hover:border-gray-200 dark:hover:border-white/[0.08] hover:shadow-sm dark:hover:shadow-none transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.06] shadow-sm dark:shadow-none">
                      <Icon className="w-5 h-5 text-gray-600 dark:text-white/60" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#1A2B3C] dark:text-white font-bold mb-1">{expense.category}</h4>
                      <div className="text-xs text-gray-500 dark:text-white/30 font-medium">
                        {expense.percentage}% of logged spend
                      </div>
                    </div>
                    <div className="text-xl font-bold text-[#1A2B3C] dark:text-white">
                      {fmtCurrency(expense.amountCents, trip.currency)}
                    </div>
                  </div>
                  <div className="h-2 w-full bg-gray-200 dark:bg-white/[0.05] rounded-full overflow-hidden">
                    <div className={`h-full ${meta.color} rounded-full`} style={{ width: `${expense.percentage}%` }} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
