"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Download, ReceiptText } from "lucide-react";
import { fmtCurrency } from "@/lib/currency";

type Expense = {
  id: string;
  category: string;
  label: string | null;
  amountCents: number;
  createdAt: string;
};

type Trip = {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  currency: string;
  expenses: Expense[];
};

const money = (cents: number, currency: string = "INR") =>
  fmtCurrency(cents, currency);

export default function InvoicePage() {
  const params = useParams();
  const id = params.id as string;
  const [trip, setTrip] = useState<Trip | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/trips/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((d) => {
        if (!cancelled) setTrip(d.trip);
      })
      .catch(() => {
        if (!cancelled) setError("Unable to load invoice.");
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const subtotal = useMemo(
    () => (trip?.expenses ?? []).reduce((sum, x) => sum + x.amountCents, 0),
    [trip],
  );
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;
  const paymentStatus = total > 0 ? "Pending" : "Paid";

  if (error) return <p className="text-red-500 py-8">{error}</p>;
  if (!trip) return <div className="py-20 text-center text-gray-500 dark:text-white/40">Loading invoice…</div>;

  return (
    <div className="max-w-5xl mx-auto mt-4 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#1A2B3C] dark:text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Expense Invoice
          </h2>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-2">
            {trip.title} · {trip.destination}
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1A2B3C] dark:bg-[#e8834a] text-white rounded-xl text-sm font-bold hover:opacity-90"
        >
          <Download className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      <div className="rounded-3xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#0d1117] overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#1A2B3C] dark:text-white font-bold">
            <ReceiptText className="w-4 h-4" />
            Invoice #{trip.id.slice(0, 8).toUpperCase()}
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold ${
              paymentStatus === "Paid"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
            }`}
          >
            {paymentStatus}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-white/[0.03]">
              <tr className="text-left text-gray-500 dark:text-white/40">
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Category</th>
                <th className="px-6 py-3 font-semibold">Description</th>
                <th className="px-6 py-3 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {trip.expenses.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500 dark:text-white/35">
                    No expenses yet.
                  </td>
                </tr>
              )}
              {trip.expenses.map((expense) => (
                <tr key={expense.id} className="border-t border-gray-100 dark:border-white/[0.04]">
                  <td className="px-6 py-4 text-gray-500 dark:text-white/40">
                    {new Date(expense.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-[#1A2B3C] dark:text-white">{expense.category}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-white/50">{expense.label || "—"}</td>
                  <td className="px-6 py-4 text-right font-semibold text-[#1A2B3C] dark:text-white">
                    {money(expense.amountCents, trip.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-200 dark:border-white/[0.06] p-6 flex justify-end">
          <div className="w-full sm:w-80 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600 dark:text-white/50">
              <span>Subtotal</span>
              <span>{money(subtotal, trip.currency)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-white/50">
              <span>Tax (8%)</span>
              <span>{money(tax, trip.currency)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#1A2B3C] dark:text-white pt-2 border-t border-gray-200 dark:border-white/[0.06]">
              <span>Total</span>
              <span>{money(total, trip.currency)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
