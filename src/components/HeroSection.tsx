"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import BookingPanel from "./BookingPanel";
import Container from "./Container";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.png"
          alt="Scenic mountain landscape with luxury lodge at sunset"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 gradient-overlay" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFDFB] dark:from-[#0a0a0a] via-transparent to-transparent opacity-90" />
        {/* Warm color overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-orange-900/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <Container className="w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12 pt-24 pb-16 lg:pt-0 lg:pb-0">
            {/* Left: Headline */}
            <div className="flex-1 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.1] text-white/80 text-xs font-medium tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e8834a] animate-pulse" />
                  Explore the World
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[0.95] tracking-[-0.03em] mb-8"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                Let&apos;s find your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8834a] via-[#f0a060] to-[#e8834a]">
                  next adventure
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-white/50 text-base lg:text-lg max-w-md leading-relaxed mb-12"
              >
                Discover breathtaking destinations and craft unforgettable
                journeys with our premium travel planning platform.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="flex items-center gap-5"
              >
                <button className="group flex items-center gap-3 pl-8 pr-2.5 py-2.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.12] text-white hover:bg-white/[0.14] transition-all duration-300">
                  <span className="text-sm font-semibold tracking-wide">
                    Take a tour
                  </span>
                  <span className="w-11 h-11 rounded-full bg-[#e8834a] flex items-center justify-center group-hover:bg-[#d4713b] transition-colors duration-300 group-hover:rotate-12">
                    <ArrowUpRight className="w-4.5 h-4.5 text-white" />
                  </span>
                </button>

                <button className="px-6 py-3.5 text-sm font-semibold text-white/70 hover:text-white transition-colors duration-300">
                  Learn more
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.85 }}
                className="flex items-center gap-12 mt-16"
              >
                {[
                  { value: "500+", label: "Destinations" },
                  { value: "12K+", label: "Happy Travelers" },
                  { value: "4.9", label: "Rating" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/40 font-medium mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Booking Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" as const }}
              className="w-full max-w-md flex-shrink-0"
            >
              <BookingPanel />
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
            className="w-1 h-1 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
