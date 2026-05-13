export default function About() {
  return (
    <section
      id="about"
      className="py-32 px-4 md:px-6 max-w-6xl mx-auto relative z-10"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* LEFT SIDE */}
        <div>
          <span className="text-xs tracking-[0.2em] text-orange-500 uppercase">
            Tentang Kami
          </span>

          <h2 className="text-4xl md:text-4xl font-semibold mt-3 mb-5 leading-tight">
            Pendekatan Humanis dalam Rehabilitasi
          </h2>

          <p className="text-white/60 leading-relaxed mb-8">
            Pendekatan sosial,psikologis yang dirancang untuk mendukung proses
            pemulihan secara menyeluruh dengan fokus pada Hipnoterpi keberlanjutan untuk perubahan
            perilaku dan reintegrasi sosial pulih produktif.
          </p>

          {/* mini highlights */}
          <div className="space-y-3">
            <MiniItem text="Terapi Hipnoterapi" />
            <MiniItem text="Pendampingan Psikologis Intensif" />
            <MiniItem text="Reintegrasi Sosial Berkelanjutan" />
            <MiniItem text="Paska Rehabilitasi" />
            <MiniItem text="Holistic Care" />
          </div>
        </div>

        {/* RIGHT SIDE (VISUAL STACKED CARDS) */}
        <div className="relative">

          {/* MAIN CARD */}
          <div className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg">
            <h3 className="text-orange-500 font-semibold mb-3">
              Fokus Utama Program
            </h3>

            <p className="text-white/70 leading-relaxed">
              Mengembalikan fungsi individu secara utuh melalui pendekatan sosial,
              psikologis, dan sosial yang terintegrasi dalam satu sistem rehabilitasi pulih produktif.
            </p>
          </div>

          {/* FLOAT CARD 1 */}
          <div className="absolute -top-6 -right-6 p-5 rounded-2xl bg-orange-500/10 border border-orange-500/20 backdrop-blur-xl">
            <p className="text-xs text-orange-500 tracking-wide">
              Holistic Care
            </p>
            <p className="text-white/60 text-xs mt-1">
              Sosial + Psikologis + Medis + Hipnoterapi
            </p>
          </div>

          {/* FLOAT CARD 2 */}
          <div className="absolute -bottom-10 -left-6 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-xs text-white/70">
              Pemulihan Rehabilitasi Melalui Rawat Inap Rawat Jalan Berbasis Pemulihan Jangka Pendek Jangka Menengah Jangka Panjang
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

/* SMALL COMPONENT */
function MiniItem({ text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-white/60">
      <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
      {text}
    </div>
  );
}