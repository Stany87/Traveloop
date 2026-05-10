"use client";

import { useState } from "react";
import { Search as SearchIcon, MapPin, Compass, Star, Filter, TrendingUp } from "lucide-react";
import Image from "next/image";

const popularCities = [
  { name: "Tokyo", country: "Japan", image: "/kyoto.png", rating: 4.9, costIndex: "$$$" },
  { name: "Paris", country: "France", image: "/santorini.png", rating: 4.8, costIndex: "$$$$" },
  { name: "Bali", country: "Indonesia", image: "/bali.png", rating: 4.7, costIndex: "$$" },
  { name: "Zermatt", country: "Switzerland", image: "/swiss.png", rating: 4.9, costIndex: "$$$$" },
];

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState("Cities");
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#1A2B3C] dark:text-white mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Explore the World</h1>
          <p className="text-gray-500 dark:text-white/40 font-medium">Discover cities, activities, and hidden gems.</p>
        </div>
        <div className="flex bg-white dark:bg-white/[0.03] p-1 rounded-xl border border-gray-200 dark:border-white/[0.06] shadow-sm dark:shadow-none">
          {["Cities", "Activities", "Hotels"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === tab ? "bg-[#1A2B3C] dark:bg-[#e8834a] text-white" : "text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white"}`}>{tab}</button>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none"><SearchIcon className="w-5 h-5 text-gray-400 dark:text-white/30" /></div>
          <input type="text" placeholder={`Search for ${activeTab.toLowerCase()}...`} className="w-full bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-[#1A2B3C] dark:text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#1A2B3C] dark:focus:border-[#e8834a] transition-all text-lg shadow-sm dark:shadow-none font-medium placeholder:text-gray-400 dark:placeholder:text-white/20" />
        </div>
        <button className="px-6 bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-2xl flex items-center gap-2 text-gray-600 dark:text-white/40 font-bold hover:text-gray-900 dark:hover:text-white transition-all shadow-sm dark:shadow-none"><Filter className="w-5 h-5" /><span className="hidden sm:block">Filters</span></button>
      </div>
      <div className="pt-4">
        <div className="flex items-center gap-2 mb-6"><TrendingUp className="w-5 h-5 text-blue-600 dark:text-[#e8834a]" /><h2 className="text-xl font-bold text-[#1A2B3C] dark:text-white">Trending {activeTab}</h2></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCities.map((city, i) => (
            <div key={i} className="group bg-white dark:bg-[#0d1117] rounded-3xl border border-gray-200 dark:border-white/[0.04] overflow-hidden hover:shadow-xl dark:hover:shadow-none shadow-sm dark:shadow-none transition-all cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <Image src={city.image} alt={city.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                <div className="absolute top-4 left-4"><span className="px-3 py-1 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-[#1A2B3C] dark:text-white tracking-wider shadow-sm">{city.costIndex}</span></div>
                <button className="absolute bottom-4 right-4 w-10 h-10 bg-white dark:bg-[#e8834a] text-[#1A2B3C] dark:text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"><Compass className="w-5 h-5" /></button>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-[#1A2B3C] dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#e8834a] transition-colors">{city.name}</h3>
                  <div className="flex items-center gap-1 text-sm font-bold text-[#1A2B3C] dark:text-white"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{city.rating}</div>
                </div>
                <p className="text-sm text-gray-500 dark:text-white/40 font-medium flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{city.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
