"use client";

import { useState } from "react";
import { User, Bell, Shield, Globe, LogOut, Save } from "lucide-react";
import Image from "next/image";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#1A2B3C] dark:text-white mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Settings</h1>
        <p className="text-gray-500 dark:text-white/40 font-medium">Manage your account preferences.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-2">
          {[{ name: "Profile", icon: User }, { name: "Notifications", icon: Bell }, { name: "Privacy", icon: Shield }, { name: "Preferences", icon: Globe }].map(tab => (
            <button key={tab.name} onClick={() => setActiveTab(tab.name)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.name ? "bg-blue-50 dark:bg-[#e8834a]/10 text-blue-700 dark:text-[#e8834a] border border-blue-100 dark:border-[#e8834a]/20" : "text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.03] border border-transparent"}`}>
              <tab.icon className="w-4 h-4" />{tab.name}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/[0.04]">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 text-sm font-bold"><LogOut className="w-4 h-4" />Sign Out</button>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] rounded-3xl p-8 shadow-sm dark:shadow-none">
            <h2 className="text-2xl font-bold text-[#1A2B3C] dark:text-white mb-8">{activeTab}</h2>
            {activeTab === "Profile" && (
              <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.06] overflow-hidden"><Image src="/santorini.png" alt="Profile" width={96} height={96} className="object-cover" /></div>
                  <div>
                    <button type="button" className="px-5 py-2.5 bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] rounded-xl text-sm font-bold text-[#1A2B3C] dark:text-white hover:bg-gray-50 dark:hover:bg-white/[0.08] shadow-sm dark:shadow-none mb-2">Change Photo</button>
                    <p className="text-xs text-gray-500 dark:text-white/30">JPG, GIF or PNG. Max 2MB.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[{ label: "First Name", value: "Alex" }, { label: "Last Name", value: "Morgan" }].map(f => (
                    <div key={f.label}>
                      <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-2">{f.label}</label>
                      <input type="text" defaultValue={f.value} className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-3 text-[#1A2B3C] dark:text-white font-medium focus:border-blue-500 dark:focus:border-[#e8834a] outline-none transition-all shadow-sm dark:shadow-none" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-2">Email</label>
                  <input type="email" defaultValue="alex.morgan@example.com" className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-3 text-[#1A2B3C] dark:text-white font-medium focus:border-blue-500 dark:focus:border-[#e8834a] outline-none transition-all shadow-sm dark:shadow-none" />
                </div>
                <div className="pt-6 border-t border-gray-100 dark:border-white/[0.04] flex justify-end">
                  <button className="flex items-center gap-2 px-6 py-3 bg-[#1A2B3C] dark:bg-[#e8834a] text-white font-bold rounded-xl shadow-md"><Save className="w-4 h-4" />Save Changes</button>
                </div>
              </form>
            )}
            {activeTab !== "Profile" && (
              <div className="text-center py-16 bg-gray-50 dark:bg-white/[0.02] rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/[0.04]">
                <Globe className="w-12 h-12 text-gray-300 dark:text-white/10 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-white/40 font-bold">Coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
