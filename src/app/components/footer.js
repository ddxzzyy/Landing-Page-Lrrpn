import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative pt-24 md:pt-36 pb-20 border-t border-orange-500/10 z-10"
    >
      {/* GLOW BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-14 md:gap-24">

          {/* LEFT */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/Logo-Bnn.png"
                alt="Logo"
                width={34}
                height={34}
              />

              <h2 className="text-[11px] tracking-[0.25em] uppercase text-orange-500 font-medium">
                LRPPN-BI SURABAYA
              </h2>
            </div>

            <p className="mt-5 text-sm md:text-base text-white/60 leading-relaxed max-w-md">
              Layanan rehabilitasi narkotika dengan pendekatan sosial psikologis dan medis 
              untuk pemulihan yang berkelanjutan.
            </p>
          </div>

          {/* RIGHT */}
          <div className="grid sm:grid-cols-2 gap-10">

            {/* ADDRESS */}
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-5">
                Alamat
              </h3>

              <a
                href="https://www.google.com/maps/place/LRPPN-BI+SURABAYA/@-7.2817788,112.727466,17z/data=!3m1!4b1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 leading-relaxed hover:text-orange-400 transition block"
              >
                Jl. Khairil Anwar No.23, Darmo, Kec. Wonokromo, Surabaya, Jawa Timur 60241
              </a>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-5">
                Kontak
              </h3>

              <a
                href="tel:08123263524"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-orange-400 transition mb-4"
              >
                <Phone size={16} />
                08123263524
              </a>

              <a
                href="mailto:lrppnbisurabaya@gmail.com"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-orange-400 transition"
              >
                <Mail size={16} />
                lrppnbisurabaya@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-16 border-t border-orange-500/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-xs text-white/40">
            © 2026 LRPPN-BI Surabaya
          </p>

          <div className="flex gap-8 text-xs text-white/50">
            <a href="#home" className="hover:text-orange-400 transition">Home</a>
            <a href="#about" className="hover:text-orange-400 transition">About</a>
            <a href="#contact" className="hover:text-orange-400 transition">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
}