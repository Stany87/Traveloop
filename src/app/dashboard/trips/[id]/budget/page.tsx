"use client";

import { motion } from "framer-motion";
import { Plane, Home, Activity, Utensils, AlertTriangle } from "lucide-react";

const expenses = [
  { category: "Flights & Transport", amount: 1200, icon: Plane, color: "bg-blue-500", percentage: 38 },
  { category: "Accommodation", amount: 1000, icon: Home, color: "bg-emerald-500", percentage: 31 },
  { category: "Activities & Tours", amount: 600, icon: Activity, color: "bg-amber-500", percentage: 19 },
  { category: "Food & Dining", amount: 400, icon: Utensils, color: "bg-purple-500", percentage: 12 },
];

export default function BudgetPage() {
  const totalBudget = 3500, totalSpent = 3200, remaining = totalBudget - totalSpent;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] rounded-3xl p-8 shadow-sm dark:shadow-none">
          <h3 className="text-lg font-bold text-[#1A2B3C] dark:text-white mb-8">Budget Overview</h3>
          <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-gray-100 dark:text-white/[0.05]" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.38)} />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.31)} style={{ transformOrigin: 'center', transform: `rotate(${360 * 0.38}deg)` }} />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.19)} style={{ transformOrigin: 'center', transform: `rotate(${360 * (0.38 + 0.31)}deg)` }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-gray-400 dark:text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Total Spent</div>
              <div className="text-2xl font-bold text-[#1A2B3C] dark:text-white">${totalSpent}</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm"><span className="text-gray-500 dark:text-white/40 font-medium">Total Budget</span><span className="text-[#1A2B3C] dark:text-white font-bold">${totalBudget}</span></div>
            <div className="flex justify-between items-center text-sm"><span className="text-gray-500 dark:text-white/40 font-medium">Remaining</span><span className="text-emerald-600 dark:text-emerald-400 font-bold">${remaining}</span></div>
          </div>
        </div>
        {remaining < 500 && (
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center flex-shrink-0"><AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" /></div>
            <div>
              <h4 className="text-sm font-bold text-amber-800 dark:text-amber-400 mb-1">Nearing Budget Limit</h4>
              <p className="text-xs text-amber-700 dark:text-amber-400/70 leading-relaxed font-medium">You have less than $500 remaining.</p>
            </div>
          </div>
        )}
      </div>
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] rounded-3xl p-8 h-full shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-[#1A2B3C] dark:text-white">Expense Breakdown</h3>
            <button className="text-sm text-white bg-[#1A2B3C] dark:bg-[#e8834a] px-4 py-2 rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-[#d4713b] transition-colors">Add Expense</button>
          </div>
          <div className="space-y-4">
            {expenses.map((expense, i) => (
              <motion.div key={expense.category} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="group p-5 rounded-2xl border border-gray-100 dark:border-white/[0.04] bg-gray-50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.04] hover:border-gray-200 dark:hover:border-white/[0.08] hover:shadow-sm dark:hover:shadow-none transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.06] shadow-sm dark:shadow-none"><expense.icon className="w-5 h-5 text-gray-600 dark:text-white/60" /></div>
                  <div className="flex-1">
                    <h4 className="text-[#1A2B3C] dark:text-white font-bold mb-1">{expense.category}</h4>
                    <div className="text-xs text-gray-500 dark:text-white/30 font-medium">{expense.percentage}% of total</div>
                  </div>
                  <div className="text-xl font-bold text-[#1A2B3C] dark:text-white">${expense.amount}</div>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-white/[0.05] rounded-full overflow-hidden"><div className={`h-full ${expense.color} rounded-full`} style={{ width: `${expense.percentage}%` }} /></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
