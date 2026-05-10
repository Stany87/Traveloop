"use client";

import { motion } from "framer-motion";
import { Compass, Globe, Mail, Share2, ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Container from "./Container";

const footerLinks = {
  Destinations: ["Europe", "Asia", "Americas", "Africa", "Oceania"],
  Company: ["About Us", "Careers", "Press", "Blog", "Partners"],
  Support: ["Help Center", "Safety", "Cancellation", "Contact Us", "Accessibility"],
  Legal: ["Terms of Service", "Privacy Policy", "Cookie Policy", "Licenses"],
};

const socials = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: Share2, href: "#", label: "Share" },
  { icon: Mail, href: "#", label: "Email" },
  { icon: ExternalLink, href: "#", label: "Link" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#FDFDFB] dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/[0.04]">
      {/* CTA Banner */}
      <Container className="-mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
        <div className="bg-gradient-to-br from-[#e8834a] via-[#d4713b] to-[#c06030] rounded-[2rem] p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-[0_20px_60px_rgba(232,131,74,0.2)]">
          <div>
            <h3
              className="text-3xl lg:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Ready for your next adventure?
            </h3>
            <p className="text-white/70 text-lg max-w-md leading-relaxed">
              Join thousands of travelers who plan their dream trips with
              Traveloop.
            </p>
          </div>
          <button className="group flex items-center gap-3 px-9 py-4.5 bg-white rounded-2xl text-[#0a0a0a] font-bold hover:bg-white/90 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex-shrink-0 text-base">
            Start Planning
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </button>
        </div>
        </motion.div>
      </Container>

      {/* Footer Content */}
      <Container className="pt-24 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="#" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#e8834a]/90 flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#1A2B3C] dark:text-white tracking-tight">
                traveloop
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-white/30 max-w-xs leading-relaxed mb-8">
              Discover extraordinary destinations and craft unforgettable
              journeys with our premium travel platform.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-white/[0.04] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/[0.08] transition-colors duration-300 border border-gray-200 dark:border-white/[0.04]"
                >
                  <social.icon className="w-4 h-4 text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white/70 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-[#1A2B3C] dark:text-white mb-6 tracking-wide">
                {title}
              </h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-gray-500 dark:text-white/30 hover:text-[#1A2B3C] dark:hover:text-white/60 transition-colors duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200 dark:border-white/[0.04]">
          <p className="text-xs text-gray-400 dark:text-white/20">
            © 2026 Traveloop. All rights reserved. Built for Odoo Hackathon.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-gray-400 dark:text-white/20 hover:text-gray-600 dark:hover:text-white/40 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-xs text-gray-400 dark:text-white/20 hover:text-gray-600 dark:hover:text-white/40 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-xs text-gray-400 dark:text-white/20 hover:text-gray-600 dark:hover:text-white/40 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
