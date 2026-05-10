"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Plus } from "lucide-react";
import { useParams } from "next/navigation";

type Item = { id: string; text: string; checked: boolean };
type Category = { id: string; name: string; items: Item[] };

export default function ChecklistPage() {
  const params = useParams();
  const tripId = params.id as string;
  const [checklist, setChecklist] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void fetch(`/api/trips/${tripId}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const cats = (data.trip?.packingCategories ?? []) as Category[];
        setChecklist(cats);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tripId]);

  const toggleItem = async (categoryId: string, itemId: string, checked: boolean) => {
    setChecklist((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((it) => (it.id === itemId ? { ...it, checked } : it)),
            }
          : cat,
      ),
    );
    await fetch(`/api/trips/${tripId}/packing/items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked }),
    });
  };

  const totalItems = useMemo(
    () => checklist.reduce((acc, cat) => acc + cat.items.length, 0),
    [checklist],
  );
  const packedItems = useMemo(
    () => checklist.reduce((acc, cat) => acc + cat.items.filter((i) => i.checked).length, 0),
    [checklist],
  );
  const progress = totalItems ? Math.round((packedItems / totalItems) * 100) : 0;

  const resetAll = async () => {
    setChecklist((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.map((it) => ({ ...it, checked: false })),
      }))
    );
    await fetch(`/api/trips/${tripId}/packing/reset`, { method: "PATCH" });
  };

  const [newItemText, setNewItemText] = useState<Record<string, string>>({});
  const addItem = async (e: React.FormEvent, categoryId: string) => {
    e.preventDefault();
    const text = newItemText[categoryId]?.trim();
    if (!text) return;

    const res = await fetch(`/api/trips/${tripId}/packing/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryId, text }),
    });
    if (res.ok) {
      const data = await res.json();
      setChecklist((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? { ...cat, items: [...cat.items, { id: data.item.id, text: data.item.text, checked: false }] }
            : cat
        )
      );
      setNewItemText((prev) => ({ ...prev, [categoryId]: "" }));
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-gray-500 dark:text-white/40">Loading checklist…</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-4">
      <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm dark:shadow-none">
        <div>
          <h2 className="text-2xl font-bold text-[#1A2B3C] dark:text-white mb-2">Packing Checklist</h2>
          <div className="flex items-center gap-4">
            <p className="text-gray-500 dark:text-white/40 font-medium text-sm">Synced from your default trip categories.</p>
            <button onClick={resetAll} className="text-xs font-bold text-[#1A2B3C] dark:text-[#e8834a] hover:underline">
              Reset all
            </button>
          </div>
        </div>
        <div className="w-full md:w-64">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span className="text-gray-500 dark:text-white/40">Progress</span>
            <span className="text-[#1A2B3C] dark:text-[#e8834a]">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 dark:bg-white/[0.05] rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 dark:bg-[#e8834a]" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-right text-xs text-gray-400 dark:text-white/30 font-medium mt-2">
            {packedItems} of {totalItems} packed
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {checklist.map((category) => (
          <div
            key={category.id}
            className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] rounded-3xl p-6 shadow-sm dark:shadow-none"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#1A2B3C] dark:text-white">{category.name}</h3>
              <span className="text-xs text-gray-600 dark:text-white/40 font-bold bg-gray-100 dark:bg-white/[0.05] px-3 py-1 rounded-lg">
                {category.items.filter((i) => i.checked).length}/{category.items.length}
              </span>
            </div>
            <div className="space-y-2">
              {category.items.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-white/30">No items. (Add-from-library coming soon.)</p>
              )}
              {category.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleItem(category.id, item.id, !item.checked)}
                  className="group w-full flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-white/[0.04] text-left"
                >
                  <div
                    className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                      item.checked
                        ? "bg-blue-500 dark:bg-[#e8834a] border-blue-500 dark:border-[#e8834a]"
                        : "bg-white dark:bg-transparent border-gray-300 dark:border-white/20 group-hover:border-gray-400 dark:group-hover:border-white/40"
                    }`}
                  >
                    {item.checked && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span
                    className={`text-sm font-bold transition-colors flex-1 ${
                      item.checked ? "text-gray-400 dark:text-white/30 line-through" : "text-[#1A2B3C] dark:text-white/80"
                    }`}
                  >
                    {item.text}
                  </span>
                </button>
              ))}
              <form onSubmit={(e) => addItem(e, category.id)} className="w-full flex items-center gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Add custom item..."
                  value={newItemText[category.id] || ""}
                  onChange={(e) => setNewItemText(prev => ({ ...prev, [category.id]: e.target.value }))}
                  className="flex-1 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-[#1A2B3C] dark:text-white outline-none focus:border-[#1A2B3C] dark:focus:border-[#e8834a] transition-all"
                />
                <button
                  type="submit"
                  disabled={!newItemText[category.id]?.trim()}
                  className="p-2.5 rounded-xl bg-[#1A2B3C] dark:bg-[#e8834a] text-white disabled:opacity-50 transition-all hover:bg-gray-800 dark:hover:bg-[#d4713b]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
