"use client";

import { useState } from "react";
import { Calendar, Image as ImageIcon, Users, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CreateTripPage() {
  const [tripName, setTripName] = useState("");
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard/trips" className="text-sm font-bold text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors mb-4 inline-block">← Back to Trips</Link>
        <h1 className="text-4xl font-bold text-[#1A2B3C] dark:text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Plan a New Trip</h1>
        <p className="text-gray-500 dark:text-white/40 font-medium mt-2">Start your next adventure by setting up the basics.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#0d1117] rounded-3xl border border-gray-200 dark:border-white/[0.04] p-8 shadow-sm dark:shadow-none">
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-3">Trip Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Globe className="w-5 h-5 text-gray-400 dark:text-white/30" /></div>
                  <input type="text" placeholder="e.g., Summer in Europe" value={tripName} onChange={(e) => setTripName(e.target.value)} className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-[#1A2B3C] dark:text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#1A2B3C] dark:focus:border-[#e8834a] transition-all font-medium shadow-sm dark:shadow-none placeholder:text-gray-400 dark:placeholder:text-white/20" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["Start Date", "End Date"].map(label => (
                  <div key={label}>
                    <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-3">{label}</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Calendar className="w-5 h-5 text-gray-400 dark:text-white/30" /></div>
                      <input type="date" className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-[#1A2B3C] dark:text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#1A2B3C] dark:focus:border-[#e8834a] transition-all font-medium shadow-sm dark:shadow-none" />
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-3">Who is traveling?</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Users className="w-5 h-5 text-gray-400 dark:text-white/30" /></div>
                  <select className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-[#1A2B3C] dark:text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#1A2B3C] dark:focus:border-[#e8834a] transition-all font-medium appearance-none shadow-sm dark:shadow-none cursor-pointer">
                    <option>Solo Trip</option><option>Couple</option><option>Family</option><option>Friends Group</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-3">Cover Photo</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02] rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-all cursor-pointer">
                  <ImageIcon className="w-6 h-6 text-gray-400 dark:text-white/30 mb-4" />
                  <div className="text-sm font-bold text-[#1A2B3C] dark:text-white/60 mb-1">Click to upload</div>
                  <div className="text-xs text-gray-500 dark:text-white/30">PNG, JPG or GIF (max 5MB)</div>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-100 dark:border-white/[0.04] flex justify-end">
                <Link href="/dashboard/trips/1/build" className="px-8 py-4 bg-[#1A2B3C] dark:bg-[#e8834a] text-white font-bold rounded-2xl hover:bg-gray-800 dark:hover:bg-[#d4713b] transition-all flex items-center gap-2 shadow-md">Continue to Builder<ArrowRight className="w-5 h-5" /></Link>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <h3 className="text-sm font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider mb-4">Preview</h3>
            <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] rounded-3xl overflow-hidden shadow-md dark:shadow-none">
              <div className="relative h-48 bg-gray-100 dark:bg-white/[0.03] flex items-center justify-center border-b border-gray-200 dark:border-white/[0.04]"><Globe className="w-12 h-12 text-gray-300 dark:text-white/10" /></div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-[#1A2B3C] dark:text-white mb-2">{tripName || "Trip Name"}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/40 font-medium mb-4"><Calendar className="w-4 h-4" />Select dates</div>
                <div className="flex -space-x-2"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center border-2 border-white dark:border-[#0d1117] shadow-sm"><span className="text-[10px] font-bold text-blue-700 dark:text-blue-400">AM</span></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
