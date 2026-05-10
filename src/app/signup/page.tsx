"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Compass, Phone, MapPin, Globe, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import { registerUser, type RegisterState } from "@/app/actions/register";

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(registerUser, {} as RegisterState);

  return (
    <div className="min-h-screen w-full flex bg-[#FDFDFB] dark:bg-[#0a0a0a]">
      <div className="hidden lg:flex relative w-1/2 min-h-screen items-center justify-center overflow-hidden">
        <Image src="/santorini.png" alt="Santorini travel destination" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-[#e8834a]/10 mix-blend-overlay" />

        <div className="relative z-10 p-20 flex flex-col justify-end h-full w-full">
          <Link href="/" className="absolute top-12 left-20">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20 cursor-pointer">
              <Compass className="w-6 h-6 text-white" />
            </div>
          </Link>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h2
              className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Begin your journey
              <br />
              to the <span className="text-[#e8834a]">extraordinary</span>.
            </h2>
            <p className="text-white/60 text-lg max-w-md">
              Create an account to plan trips, budgets, and itineraries in one premium workspace.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-20 relative overflow-y-auto max-h-screen">
        <div className="absolute inset-0 lg:hidden">
          <Image src="/santorini.png" alt="Background" fill className="object-cover opacity-10 dark:opacity-20" />
          <div className="absolute inset-0 bg-[#FDFDFB]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl" />
        </div>

        <div className="absolute top-6 right-6 z-20">
          <ThemeToggle variant="dashboard" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10 py-8"
        >
          <Link href="/" className="flex lg:hidden items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-[#e8834a] flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1A2B3C] dark:text-white tracking-tight">traveloop</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1A2B3C] dark:text-white mb-3">Create account</h1>
            <p className="text-gray-500 dark:text-white/40 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-[#e8834a] hover:text-[#f0a060] font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {state?.error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-300 text-sm font-medium">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 dark:text-white/60 mb-2 tracking-widest uppercase">
                  First name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-4 h-4 text-gray-400 dark:text-white/30 group-focus-within:text-[#e8834a]" />
                  </div>
                  <input
                    name="firstName"
                    required
                    placeholder="Alex"
                    className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-[#1A2B3C] dark:text-white rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-[#e8834a]/50 transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 dark:text-white/60 mb-2 tracking-widest uppercase">
                  Last name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-4 h-4 text-gray-400 dark:text-white/30 group-focus-within:text-[#e8834a]" />
                  </div>
                  <input
                    name="lastName"
                    required
                    placeholder="Morgan"
                    className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-[#1A2B3C] dark:text-white rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-[#e8834a]/50 transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 dark:text-white/60 mb-2 tracking-widest uppercase">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-gray-400 dark:text-white/30 group-focus-within:text-[#e8834a]" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="hello@example.com"
                  className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-[#1A2B3C] dark:text-white rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-[#e8834a]/50 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 dark:text-white/60 mb-2 tracking-widest uppercase">
                Phone <span className="font-normal normal-case text-gray-400">(optional)</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="w-4 h-4 text-gray-400 dark:text-white/30 group-focus-within:text-[#e8834a]" />
                </div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+1 ···"
                  className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-[#1A2B3C] dark:text-white rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-[#e8834a]/50 transition-all text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 dark:text-white/60 mb-2 tracking-widest uppercase">
                  City
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="w-4 h-4 text-gray-400 dark:text-white/30 group-focus-within:text-[#e8834a]" />
                  </div>
                  <input
                    name="city"
                    placeholder="e.g. Austin"
                    className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-[#1A2B3C] dark:text-white rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-[#e8834a]/50 transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 dark:text-white/60 mb-2 tracking-widest uppercase">
                  Country
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Globe className="w-4 h-4 text-gray-400 dark:text-white/30 group-focus-within:text-[#e8834a]" />
                  </div>
                  <input
                    name="country"
                    placeholder="e.g. United States"
                    className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-[#1A2B3C] dark:text-white rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-[#e8834a]/50 transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 dark:text-white/60 mb-2 tracking-widest uppercase">
                Profile image URL <span className="font-normal normal-case text-gray-400">(optional)</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <ImageIcon className="w-4 h-4 text-gray-400 dark:text-white/30 group-focus-within:text-[#e8834a]" />
                </div>
                <input
                  name="image"
                  type="url"
                  placeholder="https://…"
                  className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-[#1A2B3C] dark:text-white rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-[#e8834a]/50 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 dark:text-white/60 mb-2 tracking-widest uppercase">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-gray-400 dark:text-white/30 group-focus-within:text-[#e8834a]" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
                  className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-[#1A2B3C] dark:text-white rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-[#e8834a]/50 transition-all text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full py-4 bg-[#e8834a] text-white text-sm font-bold rounded-2xl hover:bg-[#d4713b] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60"
            >
              {pending ? "Creating…" : "Create account"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
