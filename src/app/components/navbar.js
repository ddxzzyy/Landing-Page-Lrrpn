"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (


    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-orange-500/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Image
            src="/Logo-Bnn.png"
            alt="Logo"
            width={32}
            height={32}
          />

          <h1 className="text-[10px] md:text-xs  text-orange-500 uppercase font-semibold tracking-[0.2em]">
            LRRPN-BI SURABAYA
          </h1>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-xs text-white/70">
          <a
            href="#home"
            className="hover:text-orange-400 transition"
          >
            Home
          </a>

          <a
            href="#about"
            className="hover:text-orange-400 transition"
          >
            About
          </a>

          <a
            href="#contact"
            className="hover:text-orange-400 transition"
          >
            Contact
          </a>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-[4px]"
        >
          <span
            className={`w-5 h-[2px] bg-white transition ${open
              ? "rotate-45 translate-y-[6px]"
              : ""
              }`}
          />

          <span
            className={`w-5 h-[2px] bg-white transition ${open ? "opacity-0" : ""
              }`}
          />

          <span
            className={`w-5 h-[2px] bg-white transition ${open
              ? "-rotate-45 -translate-y-[6px]"
              : ""
              }`}
          />
        </button>
      </div>

      {/* MOBILE MENU */}
      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: open ? 1 : 0,
          y: open ? 0 : -20,
        }}
        transition={{
          duration: 0.3,
        }}
        className={`md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-2xl border-t border-orange-500/10 overflow-hidden ${open ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        <div className="flex flex-col px-6 py-8 gap-6">

          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="text-lg text-white/80 hover:text-orange-400 transition"
          >
            Home
          </a>

          <a
            href="#about"
            onClick={() => setOpen(false)}
            className="text-lg text-white/80 hover:text-orange-400 transition"
          >
            About
          </a>

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="text-lg text-white/80 hover:text-orange-400 transition"
          >
            Contact
          </a>


        </div>
      </motion.div>
    </nav>
  )
}