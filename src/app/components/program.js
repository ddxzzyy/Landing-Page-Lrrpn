"use client";

export default function Program() {
  return (
    <section
      id="program"
      className="py-32 px-4 md:px-6 max-w-6xl mx-auto relative z-10"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full" />
      </div>

      {/* HEADER */}
      <div className="text-center mb-16 md:mb-20">
        <span className="text-[11px] tracking-[0.25em] uppercase text-orange-500 font-medium">
          Layanan Kami
        </span>

        <h2 className="text-4xl md:text-4xl font-semibold mt-4 leading-[1.1]">
          Program Rehabilitasi
        </h2>

        <p className="mt-6  md:text-base text-white/60 leading-relaxed max-w-2xl mx-auto">
          Pendampingan medis, psikologis, dan sosial dengan pendekatan humanis untuk
          pemulihan yang berkelanjutan.
        </p>
      </div>

      {/* MAIN GRID (TIDAK DIUBAH) */}
      <div className="grid md:grid-cols-12 gap-6">

        {/* HERO CARD */}
        <div className="md:col-span-7 p-10 rounded-3xl bg-orange-500/10 border border-orange-500/20 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full" />

          <h3 className="text-lg md:text-xl font-semibold text-orange-500 mb-4 leading-[1.2]">
            Program Utama Rehabilitasi
          </h3>

          <p className="text-sm md:text-base text-white/70 leading-relaxed">
            Program inti yang menjadi fondasi seluruh proses pemulihan pasien dengan
            pendekatan medis dan psikologis yang terintegrasi.
          </p>

          <div className="mt-6 h-px w-12 bg-orange-500/30" />
        </div>

        {/* SIDE CARD */}
        <Card
          className="md:col-span-5"
          title="Konseling Psikologis"
          desc="Pendampingan mental dan emosional oleh tenaga profesional untuk stabilisasi kondisi psikologis pasien."
        />

        {/* BOTTOM ROW */}
        <Card
          className="md:col-span-4"
          title="Rehabilitasi Medis"
          desc="Terapi medis dan observasi klinis untuk mendukung proses detoksifikasi dan pemulihan fisik."
        />

        <Card
          className="md:col-span-4"
          title="Reintegrasi Sosial"
          desc="Pendampingan agar pasien dapat kembali berfungsi optimal di lingkungan keluarga dan masyarakat."
        />

        <Card
          className="md:col-span-4"
          title="Edukasi & Pencegahan"
          desc="Program edukasi untuk meningkatkan kesadaran keluarga dan masyarakat."
        />
      </div>
    </section>
  );
}

/* CARD COMPONENT (FONT MATCH ABOUT) */
function Card({ title, desc, className = "" }) {
  return (
    <div
      className={`p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 
      hover:border-orange-500/30 hover:-translate-y-2 transition relative overflow-hidden ${className}`}
    >
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-orange-500/10 blur-2xl rounded-full" />

      <h3 className="text-lg md:text-xl font-semibold text-orange-500 mb-3 leading-[1.2]">
        {title}
      </h3>

      <p className="text-sm md:text-base text-white/60 leading-relaxed">
        {desc}
      </p>

      <div className="mt-5 h-px w-10 bg-white/10" />
    </div>
  );
}