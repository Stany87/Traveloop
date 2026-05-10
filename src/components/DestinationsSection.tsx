"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, MapPin } from "lucide-react";
import Image from "next/image";
import Container from "./Container";

const destinations = [
  {
    name: "Santorini",
    country: "Greece",
    image: "/santorini.png",
    rating: 4.9,
    price: "$2,499",
    duration: "7 Days",
    tag: "Most Popular",
  },
  {
    name: "Bali",
    country: "Indonesia",
    image: "/bali.png",
    rating: 4.8,
    price: "$1,899",
    duration: "5 Days",
    tag: "Best Value",
  },
  {
    name: "Maldives",
    country: "Indian Ocean",
    image: "/maldives.png",
    rating: 5.0,
    price: "$4,299",
    duration: "6 Days",
    tag: "Luxury",
  },
  {
    name: "Swiss Alps",
    country: "Switzerland",
    image: "/swiss.png",
    rating: 4.9,
    price: "$3,199",
    duration: "8 Days",
    tag: "Adventure",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function DestinationsSection() {
  return (
    <section id="destinations" className="py-28 lg:py-36 bg-[#FDFDFB] dark:bg-[#0a0a0a]">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#e8834a]/10 dark:bg-white/[0.04] border border-[#e8834a]/20 dark:border-white/[0.06] text-[#e8834a] text-xs font-semibold tracking-widest uppercase mb-6">
              Top Destinations
            </span>
            <h2
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1A2B3C] dark:text-white tracking-tight leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Explore trending
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8834a] to-[#f0a060]">
                destinations
              </span>
            </h2>
          </div>
          <button className="group flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-white/60 hover:text-[#1A2B3C] dark:hover:text-white transition-colors duration-300 self-start lg:self-auto">
            View all destinations
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {destinations.map((dest) => (
            <motion.div
              key={dest.name}
              variants={cardVariants}
              className="group relative rounded-3xl overflow-hidden cursor-pointer hover-lift"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] img-zoom">
                <Image
                  src={dest.image}
                  alt={`${dest.name}, ${dest.country}`}
                  fill
                  className="object-cover"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-[#e8834a]/0 group-hover:bg-[#e8834a]/10 transition-colors duration-500" />
              </div>

              {/* Tag */}
              <div className="absolute top-5 left-5">
                <span className="px-4 py-1.5 rounded-full bg-white/[0.15] backdrop-blur-md text-white text-[11px] font-semibold tracking-wide border border-white/[0.1]">
                  {dest.tag}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-white/80 font-medium">
                    {dest.rating}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1.5">
                  {dest.name}
                </h3>
                <div className="flex items-center gap-1.5 mb-5">
                  <MapPin className="w-3 h-3 text-white/40" />
                  <span className="text-xs text-white/50 font-medium">
                    {dest.country}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-5 border-t border-white/[0.1]">
                  <div>
                    <span className="text-lg font-bold text-white">
                      {dest.price}
                    </span>
                    <span className="text-xs text-white/40 ml-1">/person</span>
                  </div>
                  <span className="text-xs text-white/40 font-medium bg-white/[0.06] px-3.5 py-1.5 rounded-full">
                    {dest.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
