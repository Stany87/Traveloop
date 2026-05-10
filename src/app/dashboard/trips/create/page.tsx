"use client";

import { useState } from "react";
import { Calendar, Image as ImageIcon, Users, Globe, ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { destinationImages } from "@/lib/images";

export default function CreateTripPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelerType, setTravelerType] = useState("Solo Trip");
  const [budgetUsd, setBudgetUsd] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [coverImage, setCoverImage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user?.baseCurrency) {
          setCurrency(d.user.baseCurrency);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const budgetTrim = budgetUsd.trim();
    const budgetTotal =
      budgetTrim === "" ? null : Math.max(0, Math.round(parseFloat(budgetTrim) * 100));

    if (budgetTrim !== "" && (Number.isNaN(budgetTotal) || budgetTotal! <= 0)) {
      setError("Enter a valid budget amount.");
      setSubmitting(false);
      return;
    }

    const res = await fetch("/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        destination: destination.trim(),
        startDate,
        endDate,
        travelerType,
        budgetTotal,
        currency,
        coverImage: coverImage.trim() || undefined,
      }),
    });

    const data = await res.json().catch(() => ({}));
    setSubmitting(false);
    if (!res.ok) {
      setError((data as { error?: string }).error ?? "Could not create trip.");
      return;
    }

    const trip = data.trip as { id: string };
    router.push(`/dashboard/trips/${trip.id}/build`);
    router.refresh();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <Link
          href="/dashboard/trips"
          className="text-sm font-bold text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors mb-4 inline-block"
        >
          ← Back to Trips
        </Link>
        <h1
          className="text-4xl font-bold text-[#1A2B3C] dark:text-white"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Plan a New Trip
        </h1>
        <p className="text-gray-500 dark:text-white/40 font-medium mt-2">
          Set the basics — you can refine the itinerary next.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#0d1117] rounded-3xl border border-gray-200 dark:border-white/[0.04] p-8 shadow-sm dark:shadow-none">
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-300 text-sm">
                {error}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-3">
                  Trip name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Globe className="w-5 h-5 text-gray-400 dark:text-white/30" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Summer in Europe"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-[#1A2B3C] dark:text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#1A2B3C] dark:focus:border-[#e8834a] transition-all font-medium shadow-sm dark:shadow-none placeholder:text-gray-400 dark:placeholder:text-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-3">
                  Destination
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="w-5 h-5 text-gray-400 dark:text-white/30" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Kyoto, Japan"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-[#1A2B3C] dark:text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#1A2B3C] dark:focus:border-[#e8834a] transition-all font-medium shadow-sm dark:shadow-none placeholder:text-gray-400 dark:placeholder:text-white/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-3">
                    Start date
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Calendar className="w-5 h-5 text-gray-400 dark:text-white/30" />
                    </div>
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-[#1A2B3C] dark:text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#1A2B3C] dark:focus:border-[#e8834a] transition-all font-medium shadow-sm dark:shadow-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-3">
                    End date
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Calendar className="w-5 h-5 text-gray-400 dark:text-white/30" />
                    </div>
                    <input
                      type="date"
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-[#1A2B3C] dark:text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#1A2B3C] dark:focus:border-[#e8834a] transition-all font-medium shadow-sm dark:shadow-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-3">
                    Trip budget (optional)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step="1"
                    placeholder="e.g. 3500"
                    value={budgetUsd}
                    onChange={(e) => setBudgetUsd(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-[#1A2B3C] dark:text-white rounded-2xl py-4 px-4 outline-none focus:border-[#1A2B3C] dark:focus:border-[#e8834a] transition-all font-medium shadow-sm dark:shadow-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-3">
                    Trip Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-[#1A2B3C] dark:text-white rounded-2xl py-4 px-4 outline-none focus:border-[#1A2B3C] dark:focus:border-[#e8834a] transition-all font-medium appearance-none shadow-sm dark:shadow-none cursor-pointer"
                  >
                    <option className="bg-white dark:bg-[#0d1117]" value="USD">USD ($)</option>
                    <option className="bg-white dark:bg-[#0d1117]" value="EUR">EUR (€)</option>
                    <option className="bg-white dark:bg-[#0d1117]" value="GBP">GBP (£)</option>
                    <option className="bg-white dark:bg-[#0d1117]" value="INR">INR (₹)</option>
                    <option className="bg-white dark:bg-[#0d1117]" value="JPY">JPY (¥)</option>
                    <option className="bg-white dark:bg-[#0d1117]" value="AUD">AUD (A$)</option>
                    <option className="bg-white dark:bg-[#0d1117]" value="CAD">CAD (C$)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-3">
                  Who is traveling?
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Users className="w-5 h-5 text-gray-400 dark:text-white/30" />
                  </div>
                  <select
                    value={travelerType}
                    onChange={(e) => setTravelerType(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-[#1A2B3C] dark:text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#1A2B3C] dark:focus:border-[#e8834a] transition-all font-medium appearance-none shadow-sm dark:shadow-none cursor-pointer"
                  >
                    <option className="bg-white dark:bg-[#0d1117]">Solo Trip</option>
                    <option className="bg-white dark:bg-[#0d1117]">Couple</option>
                    <option className="bg-white dark:bg-[#0d1117]">Family</option>
                    <option className="bg-white dark:bg-[#0d1117]">Friends Group</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-3">
                  Cover image
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {destinationImages.map((img) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setCoverImage(img.src)}
                      className={`relative h-24 rounded-xl overflow-hidden border-2 transition-all ${
                        coverImage === img.src
                          ? "border-[#e8834a] ring-2 ring-[#e8834a]/30 scale-[1.02]"
                          : "border-gray-200 dark:border-white/[0.06] hover:border-gray-400 dark:hover:border-white/20"
                      }`}
                    >
                      <Image src={img.src} alt={img.label} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-1 left-1 right-1 text-[9px] text-white font-bold truncate">{img.label}</span>
                      {coverImage === img.src && (
                        <div className="absolute top-1 right-1 w-5 h-5 bg-[#e8834a] rounded-full flex items-center justify-center text-white text-[10px] font-bold">✓</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-6 border-t border-gray-100 dark:border-white/[0.04] flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-4 bg-[#1A2B3C] dark:bg-[#e8834a] text-white font-bold rounded-2xl hover:bg-gray-800 dark:hover:bg-[#d4713b] transition-all flex items-center gap-2 shadow-md disabled:opacity-60"
                >
                  {submitting ? "Creating…" : "Continue to builder"}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <h3 className="text-sm font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider mb-4">Preview</h3>
            <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] rounded-3xl overflow-hidden shadow-md dark:shadow-none">
              <div className="relative h-48 bg-gray-100 dark:bg-white/[0.03] flex items-center justify-center border-b border-gray-200 dark:border-white/[0.04]">
                <Globe className="w-12 h-12 text-gray-300 dark:text-white/10" />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-[#1A2B3C] dark:text-white mb-2">{title || "Trip name"}</h4>
                <p className="text-sm text-gray-500 dark:text-white/50 mb-1">{destination || "Destination"}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/40 font-medium mb-4">
                  <Calendar className="w-4 h-4" />
                  {startDate && endDate ? `${startDate} → ${endDate}` : "Select dates"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
