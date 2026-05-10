"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GripVertical, Plus, Save, Trash2 } from "lucide-react";
import Image from "next/image";
import Container from "./Container";

type ActivityRow = {
  id?: string;
  time: string;
  title: string;
  type: string;
  duration: string;
  image: string;
  costCents: number | null;
  completed: boolean;
};

type DayRow = {
  id?: string;
  dayIndex: number;
  date: string;
  title: string;
  activities: ActivityRow[];
};

function toDayRows(trip: {
  days: Array<{
    dayIndex: number;
    date: string;
    title: string | null;
    activities: Array<{
      time: string;
      title: string;
      type: string;
      duration: string | null;
      image: string | null;
      costCents: number | null;
      completed: boolean;
      sortOrder: number;
    }>;
  }>;
}): DayRow[] {
  return trip.days.map((d) => ({
    dayIndex: d.dayIndex,
    date: d.date.slice(0, 10),
    title: d.title || `Day ${d.dayIndex + 1}`,
    activities: d.activities.map((a) => ({
      id: undefined,
      time: a.time,
      title: a.title,
      type: a.type,
      duration: a.duration || "–",
      image: a.image || "/santorini.png",
      costCents: a.costCents,
      completed: a.completed,
    })),
  }));
}

export default function TripItineraryEditor({ tripId }: { tripId: string }) {
  const [days, setDays] = useState<DayRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const res = await fetch(`/api/trips/${tripId}`);
    if (!res.ok) {
      setError("Could not load itinerary");
      return;
    }
    const data = await res.json();
    setDays(toDayRows(data.trip));
    setError(null);
  }, [tripId]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        await refresh();
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  const save = async () => {
    setSaving(true);
    setError(null);
    const payload = {
      days: days.map((d) => ({
        dayIndex: d.dayIndex,
        date: new Date(d.date + "T12:00:00.000Z").toISOString(),
        title: d.title,
        activities: d.activities.map((a, i) => ({
          time: a.time,
          title: a.title,
          type: a.type,
          duration: a.duration === "–" ? undefined : a.duration,
          image: a.image || undefined,
          costCents: a.costCents ?? undefined,
          completed: a.completed,
          sortOrder: i,
        })),
      })),
    };
    const res = await fetch(`/api/trips/${tripId}/itinerary`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setError((err as { error?: string }).error ?? "Save failed");
      setSaving(false);
      return;
    }
    await refresh();
    setSaving(false);
  };

  const addActivity = (di: number) => {
    setDays((prev) =>
      prev.map((d, i) =>
        i === di
          ? {
              ...d,
              activities: [
                ...d.activities,
                {
                  time: "09:00 AM",
                  title: "New activity",
                  type: "Activity",
                  duration: "1 hr",
                  image: "/bali.png",
                  costCents: null,
                  completed: false,
                },
              ],
            }
          : d,
      ),
    );
  };

  const removeActivity = (di: number, ai: number) => {
    setDays((prev) =>
      prev.map((d, i) =>
        i === di ? { ...d, activities: d.activities.filter((_, j) => j !== ai) } : d,
      ),
    );
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500 dark:text-white/40 text-sm font-medium">Loading itinerary…</div>
    );
  }

  return (
    <section className="py-10 lg:py-14 bg-white dark:bg-[#0d1117] rounded-[2rem] border border-gray-200 dark:border-white/[0.04] overflow-hidden -mt-8 shadow-sm dark:shadow-none">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 px-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-[#e8834a] mb-2">
              Trip builder
            </p>
            <h2
              className="text-2xl lg:text-3xl font-bold text-[#1A2B3C] dark:text-white tracking-tight"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Shape your days
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {error && <span className="text-red-400 text-xs font-medium">{error}</span>}
            <button
              type="button"
              onClick={() => save()}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e8834a] text-sm font-semibold text-white hover:bg-[#d4713b] transition-colors disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving…" : "Save itinerary"}
            </button>
          </div>
        </div>

        <div className="space-y-10">
          {days.length === 0 && (
            <p className="text-gray-500 dark:text-white/40 text-sm text-center py-8">
              No days found for this trip. Check your start and end dates on create trip.
            </p>
          )}
          {days.map((day, dayIndex) => (
            <motion.div
              key={day.dayIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: dayIndex * 0.05 }}
            >
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#e8834a] to-[#f0a060] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">{day.dayIndex + 1}</span>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="text-[10px] font-bold text-gray-500 dark:text-white/30 uppercase tracking-wider">
                    Day title
                  </label>
                  <input
                    value={day.title}
                    onChange={(e) =>
                      setDays((prev) =>
                        prev.map((d, i) => (i === dayIndex ? { ...d, title: e.target.value } : d)),
                      )
                    }
                    className="w-full mt-1 bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] rounded-xl px-3 py-2 text-sm text-[#1A2B3C] dark:text-white outline-none focus:border-blue-500 dark:focus:border-[#e8834a]/50"
                  />
                </div>
                <div className="w-full sm:w-auto">
                  <label className="text-[10px] font-bold text-gray-500 dark:text-white/30 uppercase tracking-wider">
                    Date
                  </label>
                  <input
                    type="date"
                    value={day.date}
                    onChange={(e) =>
                      setDays((prev) =>
                        prev.map((d, i) => (i === dayIndex ? { ...d, date: e.target.value } : d)),
                      )
                    }
                    className="w-full mt-1 bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] rounded-xl px-3 py-2 text-sm text-[#1A2B3C] dark:text-white outline-none focus:border-blue-500 dark:focus:border-[#e8834a]/50"
                  />
                </div>
              </div>

              <div className="space-y-3 ml-4 pl-6 border-l border-gray-200 dark:border-white/[0.06]">
                {day.activities.map((activity, actIndex) => (
                  <div
                    key={`${day.dayIndex}-${actIndex}`}
                    className="group flex flex-wrap gap-3 bg-gray-50 dark:bg-[#161b22] rounded-2xl p-4 border border-gray-200 dark:border-white/[0.03] hover:border-gray-300 dark:hover:border-white/[0.08] transition-all"
                  >
                    <div className="pt-1 text-gray-400 dark:text-white/20 flex-shrink-0">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <div className="w-12 h-12 rounded-xl overflow-hidden relative flex-shrink-0 hidden sm:block">
                      <Image src={activity.image} alt="" fill className="object-cover" />
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 min-w-0">
                        <input
                        value={activity.title}
                        onChange={(e) =>
                          setDays((prev) =>
                            prev.map((d, i) =>
                              i === dayIndex
                                ? {
                                    ...d,
                                    activities: d.activities.map((a, j) =>
                                      j === actIndex ? { ...a, title: e.target.value } : a,
                                    ),
                                  }
                                : d,
                            ),
                          )
                        }
                        className="bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] rounded-lg px-3 py-2 text-sm text-[#1A2B3C] dark:text-white font-semibold outline-none focus:border-blue-500 dark:focus:border-[#e8834a]/50 shadow-sm dark:shadow-none"
                        placeholder="Activity title"
                      />
                      <input
                        value={activity.type}
                        onChange={(e) =>
                          setDays((prev) =>
                            prev.map((d, i) =>
                              i === dayIndex
                                ? {
                                    ...d,
                                    activities: d.activities.map((a, j) =>
                                      j === actIndex ? { ...a, type: e.target.value } : a,
                                    ),
                                  }
                                : d,
                            ),
                          )
                        }
                        className="bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] rounded-lg px-3 py-2 text-xs text-gray-600 dark:text-white/80 uppercase tracking-wide outline-none focus:border-blue-500 dark:focus:border-[#e8834a]/50 shadow-sm dark:shadow-none"
                        placeholder="Type"
                      />
                      <input
                        value={activity.time}
                        onChange={(e) =>
                          setDays((prev) =>
                            prev.map((d, i) =>
                              i === dayIndex
                                ? {
                                    ...d,
                                    activities: d.activities.map((a, j) =>
                                      j === actIndex ? { ...a, time: e.target.value } : a,
                                    ),
                                  }
                                : d,
                            ),
                          )
                        }
                        className="bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] rounded-lg px-3 py-2 text-xs text-blue-600 dark:text-[#e8834a] font-bold outline-none focus:border-blue-500 dark:focus:border-[#e8834a]/50 shadow-sm dark:shadow-none"
                        placeholder="Time"
                      />
                      <input
                        value={activity.duration}
                        onChange={(e) =>
                          setDays((prev) =>
                            prev.map((d, i) =>
                              i === dayIndex
                                ? {
                                    ...d,
                                    activities: d.activities.map((a, j) =>
                                      j === actIndex ? { ...a, duration: e.target.value } : a,
                                    ),
                                  }
                                : d,
                            ),
                          )
                        }
                        className="bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] rounded-lg px-3 py-2 text-xs text-gray-500 dark:text-white/40 outline-none focus:border-blue-500 dark:focus:border-[#e8834a]/50 shadow-sm dark:shadow-none"
                        placeholder="Duration"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeActivity(dayIndex, actIndex)}
                      className="self-start p-2 text-gray-400 dark:text-white/20 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      aria-label="Remove activity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addActivity(dayIndex)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-dashed border-gray-300 dark:border-white/[0.08] text-gray-500 dark:text-white/35 hover:text-gray-900 dark:hover:text-white/60 hover:border-gray-400 dark:hover:border-white/[0.15] transition-all text-xs font-bold"
                >
                  <Plus className="w-4 h-4" />
                  Add activity
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
