"use client";
import { useState } from "react";
export default function About() {
    const [open, setOpen] = useState(false);

    
    return (

      <section
        id="about"
        className="py-24 md:py-32 px-4 md:px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 relative z-10"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Pendekatan Humanis
          </h2>

          <p className="text-sm md:text-base text-white/60 leading-relaxed">
            Pendekatan medis dan psikologis yang
            dirancang untuk mendukung proses
            pemulihan secara menyeluruh.
          </p>
        </div>

        <div className="border border-orange-500/10 p-6 md:p-10 rounded-3xl bg-white/5 backdrop-blur-xl text-sm md:text-base leading-relaxed">
          Fokus pada reintegrasi sosial pasien agar
          dapat kembali berfungsi optimal di
          lingkungan keluarga dan masyarakat.
        </div>
      </section>



    )
}