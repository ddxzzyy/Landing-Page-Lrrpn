import { useState } from "react";
import Image from "next/image";
import {Phone,Mail} from "lucide-react";

export default function Footer() {
    
    return (
      <footer
        id="contact"
        className="relative pt-24 md:pt-40 pb-20 mt-10 border-t border-orange-500/10 z-10"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/Logo-Bnn.png"
                  alt="Logo"
                  width={32}
                  height={32}
                />

                <h2 className="text-sm font-semibold tracking-wide">
                  LRRPN-BI Surabaya
                </h2>
              </div>

              <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-md">
                Layanan rehabilitasi narkotika
                dengan pendekatan medis dan
                psikologis.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-10">
              <div>
                <h3 className="font-semibold mb-4 text-sm text-orange-500">
                  Alamat
                </h3>

                <div className="text-sm text-white/60 leading-relaxed">
                  Jl. Khairil Anwar No.23
                  <br />
                  Surabaya Jawa Timur 60241
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-sm text-orange-500">
                  Kontak
                </h3>

                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Phone size={16} />
                  <span>08123263524</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-white/60 mt-2 break-all">
                  <Mail size={16} />

                  <span>
                    lrrpnbisurabaya@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="mt-16 border-t border-orange-500/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>
              © 2026 LRRPN-BI Surabaya
            </p>

            <div className="flex gap-6">

            <a href="#home" className="hover:text-orange-400 transition">
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
          </div>
        </div>
      </footer>
        )   

    }