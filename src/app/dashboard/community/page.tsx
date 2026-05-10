"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Share2, Users } from "lucide-react";
import { getCoverImage } from "@/lib/images";

type FeedCard = {
  id: string;
  title: string;
  destination: string;
  coverImage: string | null;
  status: string;
  startDate: string;
  endDate: string;
  likesCount: number;
  likedByMe: boolean;
  daysCount: number;
  author: {
    name: string;
    image: string | null;
    city: string | null;
    country: string | null;
  };
};

export default function CommunityPage() {
  const [feed, setFeed] = useState<FeedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/community/feed")
      .then((r) => {
        if (!r.ok) throw new Error("fail");
        return r.json();
      })
      .then((d) => {
        if (!cancelled) setFeed(d.feed ?? []);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load community feed.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#1A2B3C] dark:text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Community
          </h1>
          <p className="text-gray-500 dark:text-white/40 mt-2">Explore public itineraries and save inspiration for your next journey.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-white/40">
          <Users className="w-4 h-4" />
          Public feed
        </div>
      </div>

      {loading && <div className="text-sm text-gray-500 dark:text-white/40">Loading feed…</div>}
      {error && <div className="text-sm text-red-500">{error}</div>}
      {!loading && !error && feed.length === 0 && (
        <div className="rounded-3xl border border-dashed border-gray-300 dark:border-white/[0.08] p-12 text-center text-gray-500 dark:text-white/40">
          No public trips yet. Publish one from a trip page to start the community feed.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {feed.map((item) => (
          <article
            key={item.id}
            className="group bg-white dark:bg-[#0d1117] rounded-3xl border border-gray-200 dark:border-white/[0.06] overflow-hidden shadow-sm"
          >
            <div className="relative h-64">
              <Image src={getCoverImage(item.destination, item.coverImage)} alt={item.title} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl text-white font-semibold">{item.title}</h2>
                  <p className="text-white/80 text-sm flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.destination}
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-white/20 text-white font-semibold">
                  {item.status}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Image src={item.author.image || "/santorini.png"} alt={item.author.name} width={24} height={24} className="rounded-full object-cover" />
                  <span className="font-medium text-[#1A2B3C] dark:text-white">{item.author.name}</span>
                </div>
                <span className="text-gray-500 dark:text-white/40">{item.daysCount} days</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={async () => {
                      const res = await fetch("/api/community/interactions", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ tripId: item.id, type: "like" }),
                      });
                      if (!res.ok) return;
                      const data = await res.json();
                      setFeed((prev) =>
                        prev.map((x) =>
                          x.id === item.id ? { ...x, likedByMe: data.likedByMe, likesCount: data.likesCount } : x,
                        ),
                      );
                    }}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${
                      item.likedByMe
                        ? "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/25"
                        : "bg-transparent text-gray-600 border-gray-200 dark:text-white/50 dark:border-white/[0.08]"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${item.likedByMe ? "fill-current" : ""}`} />
                    {item.likesCount}
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await navigator.clipboard.writeText(`${window.location.origin}/shared/${item.id}`);
                    }}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-white/50"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
                <Link href={`/shared/${item.id}`} className="text-sm font-semibold text-[#1A2B3C] dark:text-[#e8834a] hover:underline">
                  Open trip
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
