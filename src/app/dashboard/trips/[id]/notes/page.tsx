"use client";

import { motion } from "framer-motion";
import { Plus, Clock, FileText } from "lucide-react";

const notes = [
  { title: "Hotel Check-in Details", content: "Confirmation number: 8XF29A. Need to show passport.", date: "Oct 1, 2026", accent: "bg-orange-500" },
  { title: "Kyoto Pass Info", content: "Buy the 2-day pass at the station. Covers bus and subway.", date: "Sep 28, 2026", accent: "bg-blue-500" },
  { title: "Food to try", content: "1. Matcha ice cream\n2. Okonomiyaki\n3. Kaiseki dinner", date: "Sep 15, 2026", accent: "bg-emerald-500" }
];

export default function NotesPage() {
  return (
    <div className="max-w-4xl mx-auto mt-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#1A2B3C] dark:text-white">Trip Notes</h2>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1A2B3C] dark:bg-[#e8834a] text-white text-sm font-bold rounded-xl">
          <Plus className="w-4 h-4" />Add Note
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notes.map((note, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-6 rounded-3xl border border-gray-200 dark:border-white/[0.04] bg-white dark:bg-[#0d1117] hover:shadow-md transition-all relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1.5 h-full ${note.accent}`} />
            <h3 className="text-lg font-bold text-[#1A2B3C] dark:text-white mb-3">{note.title}</h3>
            <p className="text-gray-600 dark:text-white/50 text-sm whitespace-pre-line leading-relaxed mb-6">{note.content}</p>
            <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-white/30 font-bold"><Clock className="w-3.5 h-3.5" />{note.date}</div>
          </motion.div>
        ))}
        <div className="p-6 rounded-3xl border-2 border-dashed border-gray-300 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-all min-h-[200px]">
          <FileText className="w-5 h-5 text-gray-400 dark:text-white/30 mb-4" />
          <p className="text-gray-600 dark:text-white/60 font-bold text-sm">Create new note</p>
        </div>
      </div>
    </div>
  );
}
