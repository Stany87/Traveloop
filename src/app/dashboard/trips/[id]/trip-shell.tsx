"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, CheckSquare, DollarSign, Globe, Map, ReceiptText, Settings, ListTree, StickyNote } from "lucide-react";
import { getCoverImage } from "@/lib/images";

export type TripShellData = {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: string;
  coverImage: string | null;
  isPublic: boolean;
};

function formatRange(startIso: string, endIso: string) {
  const s = new Date(startIso);
  const e = new Date(endIso);
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  return `${s.toLocaleDateString(undefined, opts)} → ${e.toLocaleDateString(undefined, opts)}`;
}

function daysUntil(iso: string) {
  const target = new Date(iso);
  const now = new Date();
  const t = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate());
  const n = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.ceil((t - n) / 86400000);
  if (diff > 1) return `${diff} days away`;
  if (diff === 1) return "Tomorrow";
  if (diff === 0) return "Starts today";
  return "Trip started";
}

function statusStyle(status: string) {
  switch (status) {
    case "PLANNING":
      return "bg-amber-500/20 backdrop-blur-md text-amber-200 border border-amber-500/30";
    case "UPCOMING":
      return "bg-sky-500/20 backdrop-blur-md text-sky-200 border border-sky-500/30";
    case "COMPLETED":
      return "bg-emerald-500/20 backdrop-blur-md text-emerald-200 border border-emerald-500/30";
    default:
      return "bg-white/20 backdrop-blur-md text-white border border-white/30";
  }
}

export default function TripShell({
  trip,
  children,
}: {
  trip: TripShellData;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isPublic, setIsPublic] = useState(trip.isPublic);
  const [publishing, setPublishing] = useState(false);
  const base = `/dashboard/trips/${trip.id}`;
  const tabs = [
    { name: "Itinerary", href: base, icon: Map },
    { name: "Builder", href: `${base}/build`, icon: ListTree },
    { name: "Budget", href: `${base}/budget`, icon: DollarSign },
    { name: "Checklist", href: `${base}/checklist`, icon: CheckSquare },
    { name: "Notes", href: `${base}/notes`, icon: StickyNote },
    { name: "Invoice", href: `${base}/invoice`, icon: ReceiptText },
  ];

  const cover = getCoverImage(trip.destination, trip.coverImage);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="relative h-64 sm:h-80 rounded-[2rem] overflow-hidden shadow-lg group">
        <Image src={cover} alt={trip.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-wider border border-white/30">
                {daysUntil(trip.startDate)}
              </span>
              <span
                className={`px-3 py-1 backdrop-blur-md rounded-lg text-[10px] font-bold uppercase tracking-wider ${statusStyle(trip.status)}`}
              >
                {trip.status}
              </span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold text-white mb-2"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {trip.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-200 text-sm font-semibold">
              <span>{trip.destination}</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatRange(trip.startDate, trip.endDate)}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              disabled={publishing}
              onClick={async () => {
                setPublishing(true);
                const next = !isPublic;
                const res = await fetch(`/api/trips/${trip.id}/publish`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ isPublic: next }),
                });
                if (res.ok) {
                  setIsPublic(next);
                }
                setPublishing(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-md ${
                isPublic
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-white text-[#1F2937] hover:bg-gray-100"
              } disabled:opacity-60`}
            >
              <Globe className="w-4 h-4" />
              {publishing ? "Saving..." : isPublic ? "Public" : "Private"}
            </button>
            {isPublic && (
              <button
                type="button"
                onClick={async () => {
                  const url = `${window.location.origin}/shared/${trip.id}`;
                  await navigator.clipboard.writeText(url);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#1F2937] rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors shadow-md"
              >
                Copy Link
              </button>
            )}
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#1F2937] rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors shadow-md"
            >
              <Settings className="w-4 h-4" />
              Account
            </Link>
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-200 dark:border-white/[0.04] bg-white dark:bg-[#0d1117] rounded-t-3xl px-4 pt-2 shadow-sm dark:shadow-none">
        <div className="flex gap-8">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`relative flex items-center gap-2 py-4 px-2 text-sm font-bold whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-[#1A2B3C] dark:text-white"
                    : "text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A2B3C] dark:bg-[#e8834a]" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="pt-2">{children}</div>
    </div>
  );
}
