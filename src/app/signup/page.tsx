"use client";

import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function SignupPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full flex bg-[#FDFDFB] dark:bg-[#0a0a0a]">
      {/* Left side: Image */}
      <div className="hidden lg:flex relative w-1/2 min-h-screen items-center justify-center overflow-hidden">
        <Image
          src="/santorini.png"
          alt="Santorini travel destination"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-[#e8834a]/10 mix-blend-overlay" />
        
        <div className="relative z-10 p-20 flex flex-col justify-end h-full w-full">
          <Link href="/" className="absolute top-12 left-20">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20 cursor-pointer">
              <Compass className="w-6 h-6 text-white" />
            </div>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 
              className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Begin your journey<br />
              to the <span className="text-[#e8834a]">extraordinary</span>.
            </h2>
            <p className="text-white/60 text-lg max-w-md">
              Create an account and unlock curated luxury travel experiences around the globe.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-20 relative">
        {/* Mobile background */}
        <div className="absolute inset-0 lg:hidden">
          <Image
            src="/santorini.png"
            alt="Background"
            fill
            className="object-cover opacity-10 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-[#FDFDFB]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl" />
        </div>

        {/* Theme toggle */}
        <div className="absolute top-6 right-6 z-20">
          <ThemeToggle variant="dashboard" />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile Logo */}
          <Link href="/" className="flex lg:hidden items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-[#e8834a] flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1A2B3C] dark:text-white tracking-tight">
              traveloop
            </span>
          </Link>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#1A2B3C] dark:text-white mb-3">Create account</h1>
            <p className="text-gray-500 dark:text-white/40 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-[#e8834a] hover:text-[#f0a060] font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); router.push('/dashboard'); }}>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 dark:text-white/60 mb-2 tracking-widest uppercase">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-4.5 h-4.5 text-gray-400 dark:text-white/30 group-focus-within:text-[#e8834a] transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-[#1A2B3C] dark:text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#e8834a]/50 focus:bg-white dark:focus:bg-white/[0.05] transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-white/20"
                    required
                  />
                </div>
              </div>

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
                    placeholder="hello@example.com"
                    className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-[#1A2B3C] dark:text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#e8834a]/50 focus:bg-white dark:focus:bg-white/[0.05] transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-white/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 dark:text-white/60 mb-2 tracking-widest uppercase">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-4.5 h-4.5 text-gray-400 dark:text-white/30 group-focus-within:text-[#e8834a] transition-colors" />
                  </div>
                  <input
                    type="password"
                    placeholder="Minimum 8 characters"
                    className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-[#1A2B3C] dark:text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#e8834a]/50 focus:bg-white dark:focus:bg-white/[0.05] transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-white/20"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#e8834a] text-white text-sm font-bold rounded-2xl hover:bg-[#d4713b] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(232,131,74,0.3)] flex items-center justify-center gap-2 group"
            >
              Create Account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-xs text-gray-400 dark:text-white/40 bg-[#FDFDFB] dark:bg-[#0a0a0a]">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" onClick={() => router.push('/dashboard')} className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-gray-200 dark:border-white/[0.08] hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors text-sm text-[#1A2B3C] dark:text-white font-medium">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button type="button" onClick={() => router.push('/dashboard')} className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-gray-200 dark:border-white/[0.08] hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors text-sm text-[#1A2B3C] dark:text-white font-medium">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
