"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Star, Heart } from "lucide-react";
import Image from "next/image";
import Container from "./Container";

const experiences = [
  {
    title: "Sunrise Hot Air Balloon",
    location: "Cappadocia, Turkey",
    image: "/cappadocia.png",
    rating: 4.9,
    reviews: 284,
    price: "$349",
    duration: "3 hours",
    category: "Adventure",
  },
  {
    title: "Private Island Escape",
    location: "Maldives Atoll",
    image: "/maldives.png",
    rating: 5.0,
    reviews: 156,
    price: "$1,200",
    duration: "Full Day",
    category: "Luxury",
  },
  {
    title: "Alpine Trekking Expedition",
    location: "Swiss Alps, Switzerland",
    image: "/swiss.png",
    rating: 4.8,
    reviews: 412,
    price: "$189",
    duration: "8 hours",
    category: "Trekking",
  },
];

export default function ExperiencesSection() {
  return (
    <section id="experiences" className="py-28 lg:py-36 bg-gray-50 dark:bg-[#0d1117]">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#e8834a]/10 dark:bg-white/[0.04] border border-[#e8834a]/20 dark:border-white/[0.06] text-[#e8834a] text-xs font-semibold tracking-widest uppercase mb-6">
            Premium Experiences
          </span>
          <h2
            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1A2B3C] dark:text-white tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Curated luxury
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8834a] to-[#f0a060]">
              experiences
            </span>
          </h2>
          <p className="text-gray-500 dark:text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            Handpicked experiences designed for the discerning traveler seeking
            unforgettable moments.
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group bg-white dark:bg-[#161b22] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/[0.04] hover:border-gray-300 dark:hover:border-white/[0.08] transition-all duration-500 hover-lift shadow-sm dark:shadow-none"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] img-zoom">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#161b22] via-transparent to-transparent opacity-60" />

                {/* Wishlist */}
                <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/[0.1] backdrop-blur-md flex items-center justify-center hover:bg-white/[0.2] transition-colors duration-300 border border-white/[0.1]">
                  <Heart className="w-4 h-4 text-white" />
                </button>

                {/* Category Badge */}
                <div className="absolute top-5 left-5">
                  <span className="px-4 py-1.5 rounded-full bg-[#e8834a]/90 text-white text-[10px] font-bold tracking-wider uppercase">
                    {exp.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm text-[#1A2B3C] dark:text-white font-semibold">
                      {exp.rating}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-white/30">
                    ({exp.reviews} reviews)
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#1A2B3C] dark:text-white mb-2 group-hover:text-[#e8834a] transition-colors duration-300">
                  {exp.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-white/40 mb-6">{exp.location}</p>

                <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-white/[0.06]">
                  <div className="flex items-center gap-5">
                    <div>
                      <span className="text-xl font-bold text-[#1A2B3C] dark:text-white">
                        {exp.price}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-white/30 ml-1">
                        /person
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 dark:text-white/30">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-medium">
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  <button className="w-11 h-11 rounded-full bg-gray-100 dark:bg-white/[0.04] flex items-center justify-center hover:bg-[#e8834a] transition-all duration-300 group/btn border border-gray-200 dark:border-white/[0.06]">
                    <ArrowUpRight className="w-4.5 h-4.5 text-white/60 group-hover/btn:text-white transition-colors" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
