"use client";

import { useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";

const initialChecklist = [
  { id: 1, category: "Clothing", items: [{ id: 11, text: "T-Shirts (x5)", checked: true }, { id: 12, text: "Jeans/Pants (x2)", checked: true }, { id: 13, text: "Light Jacket", checked: false }, { id: 14, text: "Comfortable Walking Shoes", checked: false }] },
  { id: 2, category: "Documents", items: [{ id: 21, text: "Passport", checked: true }, { id: 22, text: "Travel Insurance", checked: false }, { id: 23, text: "Flight Tickets", checked: true }] },
  { id: 3, category: "Electronics", items: [{ id: 31, text: "Universal Adapter", checked: false }, { id: 32, text: "Power Bank", checked: true }, { id: 33, text: "Camera & Charger", checked: false }] }
];

export default function ChecklistPage() {
  const [checklist, setChecklist] = useState(initialChecklist);
  const toggleItem = (categoryId: number, itemId: number) => {
    setChecklist(prev => prev.map(cat => cat.id === categoryId ? { ...cat, items: cat.items.map(item => item.id === itemId ? { ...item, checked: !item.checked } : item) } : cat));
  };
  const totalItems = checklist.reduce((acc, cat) => acc + cat.items.length, 0);
  const packedItems = checklist.reduce((acc, cat) => acc + cat.items.filter(i => i.checked).length, 0);
  const progress = Math.round((packedItems / totalItems) * 100) || 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-4">
      <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm dark:shadow-none">
        <div>
          <h2 className="text-2xl font-bold text-[#1A2B3C] dark:text-white mb-2">Packing Checklist</h2>
          <p className="text-gray-500 dark:text-white/40 font-medium text-sm">Don't forget anything essential.</p>
        </div>
        <div className="w-full md:w-64">
          <div className="flex justify-between text-sm font-bold mb-2"><span className="text-gray-500 dark:text-white/40">Progress</span><span className="text-[#1A2B3C] dark:text-[#e8834a]">{progress}%</span></div>
          <div className="h-2 w-full bg-gray-100 dark:bg-white/[0.05] rounded-full overflow-hidden"><div className="h-full bg-blue-500 dark:bg-[#e8834a]" style={{ width: `${progress}%` }} /></div>
          <div className="text-right text-xs text-gray-400 dark:text-white/30 font-medium mt-2">{packedItems} of {totalItems} packed</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {checklist.map((category) => (
          <div key={category.id} className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] rounded-3xl p-6 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#1A2B3C] dark:text-white">{category.category}</h3>
              <span className="text-xs text-gray-600 dark:text-white/40 font-bold bg-gray-100 dark:bg-white/[0.05] px-3 py-1 rounded-lg">{category.items.filter(i => i.checked).length}/{category.items.length}</span>
            </div>
            <div className="space-y-2">
              {category.items.map((item) => (
                <div key={item.id} onClick={() => toggleItem(category.id, item.id)}
                  className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-white/[0.04]">
                  <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${item.checked ? 'bg-blue-500 dark:bg-[#e8834a] border-blue-500 dark:border-[#e8834a]' : 'bg-white dark:bg-transparent border-gray-300 dark:border-white/20 group-hover:border-gray-400 dark:group-hover:border-white/40'}`}>
                    {item.checked && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`text-sm font-bold transition-colors ${item.checked ? 'text-gray-400 dark:text-white/30 line-through' : 'text-[#1A2B3C] dark:text-white/80'}`}>{item.text}</span>
                  <button className="ml-auto text-gray-300 dark:text-white/20 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button className="w-full flex items-center justify-center gap-2 p-3 text-sm font-bold text-gray-500 dark:text-white/30 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/[0.03] rounded-xl transition-colors mt-4 border border-dashed border-gray-200 dark:border-white/[0.06]"><Plus className="w-4 h-4" /> Add Item</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
