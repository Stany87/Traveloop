"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Plus, Clock, FileText } from "lucide-react";

type Note = { id: string; title: string; content: string; createdAt: string };

const accents = ["bg-orange-500", "bg-blue-500", "bg-emerald-500", "bg-purple-500"];

export default function NotesPage() {
  const params = useParams();
  const id = params.id as string;
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const refreshNotes = useCallback(() => {
    return fetch(`/api/trips/${id}`)
      .then((r) => r.json())
      .then((d) => setNotes(d.trip?.notes ?? []));
  }, [id]);

  useEffect(() => {
    refreshNotes().finally(() => setLoading(false));
  }, [refreshNotes]);

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSaving(true);
    const res = await fetch(`/api/trips/${id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim(), content: content.trim() }),
    });
    if (res.ok) {
      setTitle("");
      setContent("");
      await refreshNotes();
    }
    setSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 space-y-8">
      <form
        onSubmit={addNote}
        className="p-6 rounded-3xl border border-gray-200 dark:border-white/[0.04] bg-white dark:bg-[#0d1117] space-y-4"
      >
        <h3 className="text-lg font-bold text-[#1A2B3C] dark:text-white">New note</h3>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-3 text-sm font-medium"
        />
        <textarea
          placeholder="Write your note…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-3 text-sm"
        />
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1A2B3C] dark:bg-[#e8834a] text-white text-sm font-bold rounded-xl disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          {saving ? "Saving…" : "Save note"}
        </button>
      </form>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-[#1A2B3C] dark:text-white">Trip notes</h2>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-2 text-sm text-[#1A2B3C] dark:text-white outline-none focus:border-[#1A2B3C] dark:focus:border-[#e8834a] transition-all"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
            className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-2 text-sm text-[#1A2B3C] dark:text-white outline-none cursor-pointer"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      {loading && <p className="text-gray-500 dark:text-white/40 text-sm">Loading…</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notes
          .filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase()))
          .sort((a, b) => {
            const d1 = new Date(a.createdAt).getTime();
            const d2 = new Date(b.createdAt).getTime();
            return sortOrder === "newest" ? d2 - d1 : d1 - d2;
          })
          .map((note, i) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-6 rounded-3xl border border-gray-200 dark:border-white/[0.04] bg-white dark:bg-[#0d1117] hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-1.5 h-full ${accents[i % accents.length]}`} />
            <h3 className="text-lg font-bold text-[#1A2B3C] dark:text-white mb-3">{note.title}</h3>
            <p className="text-gray-600 dark:text-white/50 text-sm whitespace-pre-line leading-relaxed mb-6">{note.content}</p>
            <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-white/30 font-bold">
              <Clock className="w-3.5 h-3.5" />
              {new Date(note.createdAt).toLocaleDateString()}
            </div>
          </motion.div>
        ))}
        {!loading && notes.length === 0 && (
          <div className="p-6 rounded-3xl border-2 border-dashed border-gray-300 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02] flex flex-col items-center justify-center text-center min-h-[160px]">
            <FileText className="w-5 h-5 text-gray-400 dark:text-white/30 mb-4" />
            <p className="text-gray-600 dark:text-white/60 font-bold text-sm">No notes yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
