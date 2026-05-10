"use client";

import { useEffect, useMemo, useState } from "react";
import { Search as SearchIcon, MapPin, Compass, Star, Filter, TrendingUp, Info, Clock, Globe } from "lucide-react";
import Image from "next/image";
import { getCoverImage } from "@/lib/images";

type CityInfo = {
  name: string;
  country: string;
  image: string;
  rating: number;
  costIndex: "$" | "$$" | "$$$" | "$$$$";
  description: string;
  bestTime: string;
  language: string;
  category?: string;
};

const baseCities: CityInfo[] = [
  {
    name: "Tokyo",
    country: "Japan",
    image: "/kyoto.png",
    rating: 4.9,
    costIndex: "$$$",
    description: "A vibrant metropolis blending ultramodern skyscrapers with historic temples. Known for world-class cuisine, cherry blossoms, and cutting-edge technology.",
    bestTime: "Mar – May, Oct – Nov",
    language: "Japanese",
  },
  {
    name: "Paris",
    country: "France",
    image: "/santorini.png",
    rating: 4.8,
    costIndex: "$$$$",
    description: "The City of Lights captivates with iconic landmarks like the Eiffel Tower, world-renowned museums, charming cafés, and exquisite French cuisine.",
    bestTime: "Apr – Jun, Sep – Oct",
    language: "French",
  },
  {
    name: "Bali",
    country: "Indonesia",
    image: "/bali.png",
    rating: 4.7,
    costIndex: "$$",
    description: "A tropical paradise with lush rice terraces, ancient Hindu temples, stunning beaches, and a warm, welcoming culture centered around art and spirituality.",
    bestTime: "Apr – Oct",
    language: "Bahasa Indonesian",
  },
  {
    name: "Zermatt",
    country: "Switzerland",
    image: "/swiss.png",
    rating: 4.9,
    costIndex: "$$$$",
    description: "A car-free alpine village nestled beneath the iconic Matterhorn peak. Offers world-class skiing, scenic hiking trails, and pristine mountain air.",
    bestTime: "Dec – Mar (ski), Jun – Sep (hike)",
    language: "German / French",
  },
  {
    name: "Jaipur",
    country: "India",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    costIndex: "$",
    description: "The Pink City enchants with majestic forts like Amber Palace, vibrant bazaars, colourful architecture, and rich Rajasthani culture and cuisine.",
    bestTime: "Oct – Mar",
    language: "Hindi / Rajasthani",
  },
  {
    name: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    costIndex: "$$$$",
    description: "A futuristic desert city with the tallest buildings, luxury shopping, gold souks, thrilling desert safaris, and stunning man-made islands.",
    bestTime: "Nov – Mar",
    language: "Arabic / English",
  },
  {
    name: "London",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    costIndex: "$$$",
    description: "A dynamic capital steeped in history — from Buckingham Palace to the British Museum — with world-class theatre, diverse food scenes, and iconic red buses.",
    bestTime: "May – Sep",
    language: "English",
  },
  {
    name: "Sydney",
    country: "Australia",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    costIndex: "$$$",
    description: "A harbour city famous for its Opera House, Bondi Beach, stunning coastal walks, and a laid-back lifestyle with year-round sunshine.",
    bestTime: "Sep – Nov, Mar – May",
    language: "English",
  },
];

type ExploreCard = {
  name: string;
  country: string;
  image: string;
  rating: number;
  costIndex: "$" | "$$" | "$$$" | "$$$$";
  category?: string;
};

const baseActivities: ExploreCard[] = [
  { name: "Temple Sunrise Walk", country: "Kyoto", image: "/kyoto.png", rating: 4.8, costIndex: "$", category: "Culture" },
  { name: "Sunset Catamaran Cruise", country: "Santorini", image: "/santorini.png", rating: 4.9, costIndex: "$$$", category: "Water" },
  { name: "Volcano Jeep Tour", country: "Bali", image: "/bali.png", rating: 4.7, costIndex: "$$", category: "Adventure" },
  { name: "Alpine Ski Session", country: "Zermatt", image: "/swiss.png", rating: 4.8, costIndex: "$$$$", category: "Snow" },
  { name: "Night Food Street Crawl", country: "Tokyo", image: "/kyoto.png", rating: 4.9, costIndex: "$$", category: "Food" },
  { name: "Hawa Mahal Heritage Walk", country: "Jaipur", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800", rating: 4.7, costIndex: "$", category: "Culture" },
  { name: "Desert Safari & BBQ", country: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800", rating: 4.8, costIndex: "$$$", category: "Adventure" },
];

const baseHotels: ExploreCard[] = [
  { name: "Cliffside Ocean Villa", country: "Santorini", image: "/santorini.png", rating: 4.9, costIndex: "$$$$" },
  { name: "Zen Courtyard Ryokan", country: "Kyoto", image: "/kyoto.png", rating: 4.8, costIndex: "$$$" },
  { name: "Nomad Beach Loft", country: "Bali", image: "/bali.png", rating: 4.7, costIndex: "$$" },
  { name: "Summit Peak Lodge", country: "Zermatt", image: "/swiss.png", rating: 4.9, costIndex: "$$$$" },
  { name: "Rambagh Palace", country: "Jaipur", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800", rating: 4.9, costIndex: "$$$" },
];

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState("Cities");
  const [query, setQuery] = useState("");
  const [budgetFilter, setBudgetFilter] = useState<"all" | "$$-" | "$$$$">("all");
  const [cities, setCities] = useState<CityInfo[]>(baseCities);
  const [category, setCategory] = useState("All");
  const [expandedCity, setExpandedCity] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/trips")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (!data || cancelled) return;
        const dynamic: CityInfo[] = (data.trips ?? []).map((t: { destination: string; coverImage: string | null }) => {
          const parts = String(t.destination).split(",");
          const city = parts[0]?.trim() || t.destination;
          const country = parts[1]?.trim() || "Saved trip";
          return {
            name: city,
            country,
            image: getCoverImage(t.destination, t.coverImage),
            rating: 4.6,
            costIndex: "$$$" as const,
            description: `A destination from your saved trips. Explore and discover what ${city} has to offer!`,
            bestTime: "Year-round",
            language: "—",
          };
        });

        const unique = new Map<string, CityInfo>();
        [...baseCities, ...dynamic].forEach((c) => {
          unique.set(`${c.name}|${c.country}`.toLowerCase(), c);
        });
        setCities(Array.from(unique.values()));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredCities = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cities.filter((item) => {
      if (budgetFilter === "$$-" && item.costIndex !== "$" && item.costIndex !== "$$") return false;
      if (budgetFilter === "$$$$" && item.costIndex !== "$$$" && item.costIndex !== "$$$$") return false;
      if (!q) return true;
      return item.name.toLowerCase().includes(q) || item.country.toLowerCase().includes(q);
    });
  }, [cities, query, budgetFilter]);

  const filteredOther = useMemo(() => {
    const source = activeTab === "Activities" ? baseActivities : baseHotels;
    const q = query.trim().toLowerCase();
    return source.filter((item) => {
      if (budgetFilter === "$$-" && item.costIndex !== "$" && item.costIndex !== "$$") return false;
      if (budgetFilter === "$$$$" && item.costIndex !== "$$$" && item.costIndex !== "$$$$") return false;
      if (activeTab === "Activities" && category !== "All" && item.category !== category) return false;
      if (!q) return true;
      return item.name.toLowerCase().includes(q) || item.country.toLowerCase().includes(q);
    });
  }, [activeTab, query, budgetFilter, category]);

  const activityCategories = useMemo(() => ["All", ...Array.from(new Set(baseActivities.map((a) => a.category ?? "Other")))], []);

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
          <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder={`Search for ${activeTab.toLowerCase()}...`} className="w-full bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-[#1A2B3C] dark:text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#1A2B3C] dark:focus:border-[#e8834a] transition-all text-lg shadow-sm dark:shadow-none font-medium placeholder:text-gray-400 dark:placeholder:text-white/20" />
        </div>
        <div className="px-4 bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-2xl flex items-center gap-2 text-gray-600 dark:text-white/40 font-bold shadow-sm dark:shadow-none">
          <Filter className="w-5 h-5" />
          <select value={budgetFilter} onChange={(e) => setBudgetFilter(e.target.value as "all" | "$$-" | "$$$$")} className="bg-transparent py-3 outline-none text-sm">
            <option value="all">All budgets</option>
            <option value="$$-">Budget-friendly</option>
            <option value="$$$$">Premium</option>
          </select>
        </div>
      </div>
      {activeTab === "Activities" && (
        <div className="flex flex-wrap gap-2">
          {activityCategories.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${category === c ? "bg-[#1A2B3C] dark:bg-[#e8834a] text-white border-transparent" : "bg-white dark:bg-white/[0.03] text-gray-600 dark:text-white/50 border-gray-200 dark:border-white/[0.08]"}`}>
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="pt-4">
        <div className="flex items-center gap-2 mb-6"><TrendingUp className="w-5 h-5 text-blue-600 dark:text-[#e8834a]" /><h2 className="text-xl font-bold text-[#1A2B3C] dark:text-white">Trending {activeTab}</h2></div>

        {/* Cities tab — with rich info */}
        {activeTab === "Cities" && (
          <>
            {filteredCities.length === 0 && (
              <div className="text-sm text-gray-500 dark:text-white/40 border border-dashed border-gray-200 dark:border-white/[0.08] rounded-2xl p-8 text-center">No results match your filters.</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCities.map((city, i) => (
                <div
                  key={`${city.name}-${i}`}
                  className="group bg-white dark:bg-[#0d1117] rounded-3xl border border-gray-200 dark:border-white/[0.04] overflow-hidden hover:shadow-xl dark:hover:shadow-none shadow-sm dark:shadow-none transition-all cursor-pointer"
                  onClick={() => setExpandedCity(expandedCity === city.name ? null : city.name)}
                >
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
                    <p className="text-sm text-gray-500 dark:text-white/40 font-medium flex items-center gap-1.5 mb-2"><MapPin className="w-3.5 h-3.5" />{city.country}</p>

                    {/* Expandable info section */}
                    <div className={`overflow-hidden transition-all duration-300 ${expandedCity === city.name ? "max-h-60 opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                      <div className="pt-3 border-t border-gray-100 dark:border-white/[0.06] space-y-2.5">
                        <p className="text-xs text-gray-600 dark:text-white/50 leading-relaxed">{city.description}</p>
                        <div className="flex items-center gap-4 text-[11px]">
                          <span className="flex items-center gap-1 text-gray-500 dark:text-white/40"><Clock className="w-3 h-3" />{city.bestTime}</span>
                          <span className="flex items-center gap-1 text-gray-500 dark:text-white/40"><Globe className="w-3 h-3" />{city.language}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-400 dark:text-white/25 mt-2 font-semibold">{expandedCity === city.name ? "Click to collapse" : "Click for details"}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Activities & Hotels tabs */}
        {activeTab !== "Cities" && (
          <>
            {filteredOther.length === 0 && (
              <div className="text-sm text-gray-500 dark:text-white/40 border border-dashed border-gray-200 dark:border-white/[0.08] rounded-2xl p-8 text-center">No results match your filters.</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredOther.map((item, i) => (
                <div key={`${item.name}-${i}`} className="group bg-white dark:bg-[#0d1117] rounded-3xl border border-gray-200 dark:border-white/[0.04] overflow-hidden hover:shadow-xl dark:hover:shadow-none shadow-sm dark:shadow-none transition-all cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                    <div className="absolute top-4 left-4"><span className="px-3 py-1 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-[#1A2B3C] dark:text-white tracking-wider shadow-sm">{item.costIndex}</span></div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-[#1A2B3C] dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#e8834a] transition-colors">{item.name}</h3>
                      <div className="flex items-center gap-1 text-sm font-bold text-[#1A2B3C] dark:text-white"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{item.rating}</div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-white/40 font-medium flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{item.country}</p>
                    {item.category && <p className="mt-2 text-[11px] font-semibold text-gray-400 dark:text-white/30 uppercase tracking-wide">{item.category}</p>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
