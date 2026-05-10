"use client";

import { useEffect, useState } from "react";
import { User, Bell, Shield, Globe, LogOut, Save, Loader2, Camera } from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";

type ProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  image: string;
  baseCurrency: string;
};

const defaultForm: ProfileForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  country: "",
  image: "",
  baseCurrency: "INR",
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [form, setForm] = useState<ProfileForm>(defaultForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/me")
      .then((r) => {
        if (!r.ok) throw new Error("Could not load profile");
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        const user = data.user;
        setForm({
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          email: user.email ?? "",
          phone: user.phone ?? "",
          city: user.city ?? "",
          country: user.country ?? "",
          image: user.image ?? "",
          baseCurrency: user.baseCurrency ?? "INR",
        });
      })
      .catch(() => {
        if (!cancelled) setError("Could not load your profile.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/me/avatar", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        setForm((prev) => ({ ...prev, image: data.url }));
      }
    } catch {
      // silent
    }
    setUploading(false);
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    setError(null);
    const res = await fetch("/api/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError((data as { error?: string }).error ?? "Unable to save profile.");
      setSaving(false);
      return;
    }
    setStatus("Profile saved.");
    setSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#1A2B3C] dark:text-white mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Settings
        </h1>
        <p className="text-gray-500 dark:text-white/40 font-medium">Manage your account preferences.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-2">
          {[{ name: "Profile", icon: User }, { name: "Notifications", icon: Bell }, { name: "Privacy", icon: Shield }, { name: "Preferences", icon: Globe }].map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.name ? "bg-blue-50 dark:bg-[#e8834a]/10 text-blue-700 dark:text-[#e8834a] border border-blue-100 dark:border-[#e8834a]/20" : "text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.03] border border-transparent"}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/[0.04]">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 text-sm font-bold"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.04] rounded-3xl p-8 shadow-sm dark:shadow-none">
            <h2 className="text-2xl font-bold text-[#1A2B3C] dark:text-white mb-8">{activeTab}</h2>
            {activeTab === "Profile" && (
              <form className="space-y-8" onSubmit={onSave}>
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 rounded-full bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.06] overflow-hidden group">
                    <Image src={form.image || "/santorini.png"} alt="Profile" fill className="object-cover" />
                    <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      {uploading ? (
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                      ) : (
                        <Camera className="w-6 h-6 text-white" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A2B3C] dark:text-white">Profile Photo</p>
                    <p className="text-xs text-gray-500 dark:text-white/30 mt-1">Hover and click to upload a new photo</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { key: "firstName", label: "First Name" },
                    { key: "lastName", label: "Last Name" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-2">{f.label}</label>
                      <input
                        value={form[f.key as keyof ProfileForm] as string}
                        onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                        className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-3 text-[#1A2B3C] dark:text-white font-medium focus:border-blue-500 dark:focus:border-[#e8834a] outline-none transition-all shadow-sm dark:shadow-none"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-3 text-[#1A2B3C] dark:text-white font-medium focus:border-blue-500 dark:focus:border-[#e8834a] outline-none transition-all shadow-sm dark:shadow-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-2">Currency</label>
                    <select
                      value={form.baseCurrency}
                      onChange={(e) => setForm((prev) => ({ ...prev, baseCurrency: e.target.value }))}
                      className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-3 text-[#1A2B3C] dark:text-white font-medium outline-none transition-all shadow-sm dark:shadow-none appearance-none"
                    >
                      <option className="bg-white dark:bg-[#0d1117]" value="USD">USD ($)</option>
                      <option className="bg-white dark:bg-[#0d1117]" value="EUR">EUR (€)</option>
                      <option className="bg-white dark:bg-[#0d1117]" value="GBP">GBP (£)</option>
                      <option className="bg-white dark:bg-[#0d1117]" value="INR">INR (₹)</option>
                      <option className="bg-white dark:bg-[#0d1117]" value="JPY">JPY (¥)</option>
                      <option className="bg-white dark:bg-[#0d1117]" value="AUD">AUD (A$)</option>
                      <option className="bg-white dark:bg-[#0d1117]" value="CAD">CAD (C$)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-2">Phone</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-3 text-[#1A2B3C] dark:text-white font-medium outline-none transition-all shadow-sm dark:shadow-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-2">City</label>
                    <input
                      value={form.city}
                      onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
                      className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-3 text-[#1A2B3C] dark:text-white font-medium outline-none transition-all shadow-sm dark:shadow-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-2">Country</label>
                    <input
                      value={form.country}
                      onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
                      className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-3 text-[#1A2B3C] dark:text-white font-medium outline-none transition-all shadow-sm dark:shadow-none"
                    />
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100 dark:border-white/[0.04] flex items-center justify-between">
                  <div className="text-sm">
                    {loading && <span className="text-gray-500 dark:text-white/40">Loading profile...</span>}
                    {!loading && status && <span className="text-emerald-600 dark:text-emerald-400">{status}</span>}
                    {!loading && error && <span className="text-red-600 dark:text-red-400">{error}</span>}
                  </div>
                  <button
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-[#1A2B3C] dark:bg-[#e8834a] text-white font-bold rounded-xl shadow-md disabled:opacity-60"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                  </button>
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
