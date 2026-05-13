"use client";
import { useState } from "react";

export default function Navbar() {
    
    return (

      <section
        id="program"
        className="py-32 px-4 md:px-6 max-w-6xl mx-auto relative z-10"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-3xl font-semibold">
            Program Rehabilitasi
          </h2>

          <p className=" mt-4 text-sm md:text-base text-white/60 leading-relaxed">
            Pendampingan rehabilitasi medis,
            psikologis, dan sosial dengan
            pendekatan humanis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="p-8 rounded-3xl border border-orange-500/10 bg-white/5 backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4">
              Rehabilitasi Medis
            </h3>

            <p className="text-sm text-white/60 leading-relaxed">
              Penanganan medis dan terapi
              terintegrasi untuk pemulihan pasien.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-orange-500/10 bg-white/5 backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4">
              Konseling Psikologis
            </h3>

            <p className="text-sm text-white/60 leading-relaxed">
              Pendampingan mental dan emosional
              oleh tenaga profesional.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-orange-500/10 bg-white/5 backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4">
              Reintegrasi Sosial
            </h3>

            <p className="text-sm text-white/60 leading-relaxed">
              Membantu pasien kembali beradaptasi
              dengan keluarga dan lingkungan sosial.
            </p>
          </div>

        </div>
      </section>
    )
}