"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-6 z-10"
    >
      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl sm:text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-orange-500"
      >
        LRRPN-BI
        <br />
        <span className="text-white">SURABAYA</span>
      </motion.h1>

      {/* DESCRIPTION */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-6 text-sm md:text-base text-white/60 max-w-xl leading-relaxed"
      >
        Rehabilitasi Sosial,mental dengan pendekatan medis serta
        psikologis yang terintegrasi untuk mencapai pulih produktif.
      </motion.p>

      {/* BUTTONS */}
      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
        
        <a
          href="#contact"
          className="group px-7 py-4 rounded-full bg-orange-500 hover:bg-orange-400 transition flex items-center justify-center gap-3 text-sm font-medium"
        >
          Konsultasi Sekarang
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition"
          />
        </a>

        <a
          href="#program"
          className="px-7 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm text-white"
        >
          Jelajahi Program Kami
        </a>
      </div>

      {/* SCROLL INDICATOR */}
      <a href="#about" className="absolute bottom-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ChevronDown className="text-white/40" size={28} />
        </motion.div>
      </a>
    </section>
  );
}