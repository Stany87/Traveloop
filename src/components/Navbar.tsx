"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Destinations", href: "#destinations" },
    { label: "Experiences", href: "#experiences" },
    { label: "Dashboard", href: "#dashboard" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border-b border-gray-200 dark:border-white/[0.06] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-3 group">
          <Image src="/logo.png" alt="Traveloop Logo" width={40} height={40} className="object-contain" />
          <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
            scrolled ? "text-[#1A2B3C] dark:text-white" : "text-white"
          }`}>
            traveloop
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative px-5 py-2.5 text-sm font-medium transition-colors duration-300 group ${
                scrolled
                  ? "text-gray-500 dark:text-white/70 hover:text-[#1A2B3C] dark:hover:text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
              <span className="absolute bottom-0.5 left-5 right-5 h-[2px] bg-[#e8834a] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle variant="landing" />
          <Link
            href="/login"
            className={`text-sm font-medium transition-colors duration-300 ${
              scrolled
                ? "text-gray-500 dark:text-white/70 hover:text-[#1A2B3C] dark:hover:text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="px-7 py-2.5 text-sm font-semibold text-white bg-[#e8834a] rounded-full hover:bg-[#d4713b] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(232,131,74,0.4)]"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 ${scrolled ? "text-[#1A2B3C] dark:text-white" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" as const }}
            className="lg:hidden bg-white/95 dark:bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-t border-gray-200 dark:border-white/[0.06] overflow-hidden"
          >
            <div className="px-8 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-gray-600 dark:text-white/70 hover:text-[#1A2B3C] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.04] rounded-xl transition-all duration-300 font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="px-4 py-3 text-center text-gray-600 dark:text-white/70 hover:text-[#1A2B3C] dark:hover:text-white transition-colors duration-300 font-medium"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-3 text-center text-white bg-[#e8834a] rounded-full font-semibold hover:bg-[#d4713b] transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
