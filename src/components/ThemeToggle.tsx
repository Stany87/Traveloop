"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  variant?: "landing" | "dashboard";
}

export default function ThemeToggle({ className = "", variant = "landing" }: ThemeToggleProps) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("traveloop-theme");
    const isDark = saved === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("traveloop-theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  };

  if (!mounted) return <div className="w-10 h-10" />;

  if (variant === "dashboard") {
    return (
      <button
        onClick={toggle}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
          bg-white dark:bg-white/10 border border-[#E5E7EB] dark:border-white/10
          text-[#6B7280] dark:text-white/60 hover:text-[#1A2B3C] dark:hover:text-white
          hover:border-[#D1D5DB] dark:hover:border-white/20 shadow-sm dark:shadow-none ${className}`}
        aria-label="Toggle theme"
      >
        {dark ? <Sun className="w-4 h-4" strokeWidth={1.5} /> : <Moon className="w-4 h-4" strokeWidth={1.5} />}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
        bg-white/[0.08] border border-white/[0.12]
        text-white/70 hover:text-white hover:bg-white/[0.14] backdrop-blur-md ${className}`}
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
