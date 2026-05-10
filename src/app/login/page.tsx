"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import ThemeToggle from "@/components/ThemeToggle";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const registered = searchParams.get("registered");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <div className="w-full max-w-md relative z-10">
      <Link href="/" className="flex lg:hidden items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-xl bg-[#e8834a] flex items-center justify-center">
          <Compass className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-[#1A2B3C] dark:text-white tracking-tight">traveloop</span>
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#1A2B3C] dark:text-white mb-3">Sign in</h1>
        <p className="text-gray-500 dark:text-white/40 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#e8834a] hover:text-[#f0a060] font-medium transition-colors">
            Create one now
          </Link>
        </p>
        {registered && (
          <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
            Account created. You can sign in now.
          </p>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-300 text-sm font-medium">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-gray-500 dark:text-white/60 mb-2 tracking-widest uppercase">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-4.5 h-4.5 text-gray-400 dark:text-white/30 group-focus-within:text-[#e8834a] transition-colors" />
              </div>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-[#1A2B3C] dark:text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#e8834a]/50 focus:bg-white dark:focus:bg-white/[0.05] transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-white/20"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-bold text-gray-500 dark:text-white/60 tracking-widest uppercase">
                Password
              </label>
              <span className="text-xs text-gray-400 dark:text-white/30">Forgot? Use profile settings later.</span>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-4.5 h-4.5 text-gray-400 dark:text-white/30 group-focus-within:text-[#e8834a] transition-colors" />
              </div>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-[#1A2B3C] dark:text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#e8834a]/50 focus:bg-white dark:focus:bg-white/[0.05] transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-white/20"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#e8834a] text-white text-sm font-bold rounded-2xl hover:bg-[#d4713b] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(232,131,74,0.3)] flex items-center justify-center gap-2 group disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex bg-[#FDFDFB] dark:bg-[#0a0a0a]">
      <div className="hidden lg:flex relative w-1/2 min-h-screen items-center justify-center overflow-hidden">
        <Image src="/hero-bg.png" alt="Luxury travel destination" fill className="object-cover" priority />
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
              Welcome back to
              <br />
              <span className="text-[#e8834a]">extraordinary</span> journeys.
            </h2>
            <p className="text-white/60 text-lg max-w-md">
              Sign in to access your itineraries, budgets, and shared trips.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-20 relative">
        <div className="absolute inset-0 lg:hidden">
          <Image src="/hero-bg.png" alt="Background" fill className="object-cover opacity-10 dark:opacity-20" />
          <div className="absolute inset-0 bg-[#FDFDFB]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl" />
        </div>

        <div className="absolute top-6 right-6 z-20">
          <ThemeToggle variant="dashboard" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex justify-center"
        >
          <Suspense fallback={<div className="relative z-10 w-full max-w-md h-40 animate-pulse rounded-2xl bg-gray-100 dark:bg-white/5" />}>
            <LoginForm />
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
}
