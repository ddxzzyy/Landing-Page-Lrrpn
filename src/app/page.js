"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export default function Home() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const [startCount, setStartCount] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [dots, setDots] = useState([]);
  const [gridSquares, setGridSquares] = useState([]);
  const mouse = useRef({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);

  const statsData = [
    { number: 1200, suffix: "+", label: "Pasien Pulih" },
    { number: 10, suffix: "+", label: "Tahun Pengalaman" },
    { number: 24, suffix: "/7", label: "Pendampingan" },
    { number: 98, suffix: "%", label: "Success Rate" },
  ];

  useEffect(() => {
    const generatedDots = Array.from({ length: 20 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setDots(generatedDots);
  }, []);

  useEffect(() => {
    const squares = Array.from({ length: 60 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 6 + 2,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setGridSquares(squares);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startCount) return;

    const duration = 1500;
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);

      setCounts(
        statsData.map((item) =>
          Math.floor(item.number * progress)
        )
      );

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [startCount]);

  //  UPGRADED GRID CANVAS (LIVELY VERSION)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const gridSize = 35;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += 0.01; // 🔥 lebih hidup

      const mx = mouse.current.x || canvas.width / 2;
      const my = mouse.current.y || canvas.height / 2;

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {

          const dx = mx - x;
          const dy = my - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const force = Math.pow(Math.max(0, 180 - dist) / 180, 1.7);

          // 🔥 lebih hidup wave
          const waveX = Math.sin((y * 0.01) + time) * 15;
          const waveY = Math.cos((x * 0.01) + time) * 15;

          const mouseX = dx * force * 0.08;
          const mouseY = dy * force * 0.08;

          const px = x + waveX + mouseX;
          const py = y + waveY + mouseY;

          const glow = Math.min(1, 0.15 + force * 1.3);

          ctx.shadowBlur = 12;
          ctx.shadowColor = "rgba(34,255,140,0.8)";
          ctx.fillStyle = `rgba(34, 255, 140, ${glow})`;

          ctx.fillRect(px, py, 2.5, 2.5);
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="bg-white text-[#022E2F] overflow-x-hidden relative antialiased">

      {/* CANVAS */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(2,46,47,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(2,46,47,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* GLOW */}
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(34,197,94,0.15), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-[#022E2F]/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center">

          {/* KIRI */}
          <div className="flex-1 flex items-center gap-3">

            <Image
              src="/Logo-Bnn.jpg"
              alt="Logo LRRPN-BI Surabaya"
              width={32}
              height={32}
              className="object-contain"
            />
            <h1 className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold">
              LRRPN-BI Surabaya
            </h1>


          </div>

          {/* DESKTOP  */}
          <div className="hidden md:flex gap-8 text-xs font-medium text-[#022E2F]/70">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#program">Program</a>
            <a href="#article">Artikel</a>
            <a href="#contact">Contact</a>
          </div>

          {/* BUTTON */}
          <div className="flex-1 flex justify-end items-center gap-3">

            <a className="text-[10px] md:text-xs px-3 md:px-5 py-2 rounded-full border border-[#022E2F]/20 hover:bg-[#022E2F] hover:text-white transition">
              Unduh
            </a>

            {/* HAMBURGER */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col gap-[4px]"
            >
              <span className={`w-5 h-[2px] bg-[#022E2F] transition ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`w-5 h-[2px] bg-[#022E2F] transition ${open ? "opacity-0" : ""}`} />
              <span className={`w-5 h-[2px] bg-[#022E2F] transition ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </button>

          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden bg-white border-t border-[#022E2F]/10 transition-all duration-300 ease-in-out ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="flex flex-col px-6 py-4 gap-4 text-sm text-[#022E2F]/70">

            {["Home", "About", "Program", "Artikel", "Contact"].map((item, i) => (
              <a
                key={i}
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className={`transition-all duration-300 transform ${open
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                  }`}
                style={{
                  transitionDelay: open ? `${i * 80}ms` : "0ms",
                }}
              >
                {item}
              </a>
            ))}

          </div>
        </div>

      </nav>





      {/* HERO */}
      <section id="home" className="h-screen flex flex-col justify-center items-center text-center px-6 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-semibold"
        >
          LRRPN-BI SURABAYA
        </motion.h1>

        <p className="mt-6 text-[#022E2F]/70 max-w-sm text-sm">
          Rehabilitasi dengan pendekatan fisik, mental, dan sosial.
        </p>
      </section>






      {/* ABOUT */}
      <section id="about" className="py-30 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-20 relative z-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Pendekatan Humanis
          </h2>
          <p className="text-[#022E2F]/70 text-sm max-w-md">
            Pendekatan medis dan psikologis untuk pemulihan menyeluruh.
          </p>
        </div>

        <div className="border border-[#022E2F]/10 rounded-2xl p-10">
          <p className="text-sm text-[#022E2F]/70">
            Fokus pada pemulihan dan reintegrasi sosial pasien.
          </p>
        </div>
      </section>





      {/* STATS */}
      <section
        ref={sectionRef}
        className="py-32 px-6 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center border border-[#022E2F]/10 rounded-xl overflow-hidden relative z-10"
      >
        {statsData.map((item, i) => (
          <div key={i} className="p-8 border-r md:last:border-r-0 border-[#022E2F]/10">
            <h3 className="text-2xl font-semibold">
              {counts[i]}{item.suffix}
            </h3>
            <p className="text-xs text-[#022E2F]/50 mt-2">
              {item.label}
            </p>
          </div>
        ))}
      </section>





      {/* PROGRAM */}
      <section id="program" className="py-40 px-6 max-w-6xl mx-auto relative z-10">
        <h2 className="text-2xl font-semibold text-center mb-20">
          Program
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {/* HERO BIG CARD */}
          <div className="md:col-span-2 border border-[#022E2F]/10 rounded-3xl p-10 bg-white/40 backdrop-blur-md hover:scale-[1.01] transition">
            <h3 className="text-xl font-semibold mb-4">
              Program Unggulan
            </h3>
            <p className="text-sm text-[#022E2F]/70 leading-relaxed">
              Pendekatan rehabilitasi terpadu dengan terapi psikologis, medis, dan sosial untuk pemulihan jangka panjang.
            </p>
          </div>

          {/* SIDE STACK */}
          <div className="space-y-6">

            {["Hipnoterapi", "Terapi Psikologis", "Reintegrasi Sosial"].map((item, i) => (
              <div
                key={i}
                className="border border-[#022E2F]/10 rounded-2xl p-6 bg-white/30 hover:bg-white/60 transition"
              >
                <p className="text-sm font-medium">{item}</p>
              </div>
            ))}

          </div>

        </div>
      </section>



      {/* ARTICLE */}
      <section id="article" className="py-40 px-6 max-w-6xl mx-auto relative z-10">
        <h2 className="text-2xl font-semibold text-center mb-20">
          Artikel
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            { img: "/artikel.jpg", text: "Edukasi kesehatan mental." },
            { img: "/artikel.jpg", text: "Proses rehabilitasi pasien." },
            { img: "/artikel.jpg", text: "Pemulihan sosial." },
          ].map((item, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-3xl border border-[#022E2F]/10 bg-white/40 backdrop-blur-md
          ${i === 0 ? "md:scale-105" : ""}
        `}
            >

              <div className="relative h-56">
                <Image
                  src={item.img}
                  alt="artikel"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-6">
                <p className="text-sm text-[#022E2F]/70">
                  {item.text}
                </p>
              </div>

            </div>
          ))}

        </div>
      </section>




      {/* PROSES */}
      <section className="py-20 md:py-40 px-4 md:px-6 max-w-4xl mx-auto relative z-10">
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-10 md:mb-20">
          Proses Rehabilitasi
        </h2>

        <div className="space-y-6 md:space-y-10">

          {[
            "Assessment Awal",
            "Terapi & Pendampingan",
            "Pemulihan Mental",
            "Reintegrasi Sosial"
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-4 md:gap-6 items-start bg-white/40 backdrop-blur-md border border-[#022E2F]/10 p-4 md:p-6 rounded-2xl hover:translate-x-1 transition"
            >

              {/* NUMBER */}
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#022E2F] text-white flex items-center justify-center text-xs md:text-sm font-semibold">
                {i + 1}
              </div>

              {/* TEXT */}
              <div>
                <p className="text-xs md:text-sm font-medium mb-1">
                  Step {i + 1}
                </p>
                <p className="text-sm md:text-base text-[#022E2F]/70">
                  {item}
                </p>
              </div>

            </div>
          ))}

        </div>
      </section>





      {/* FASILITAS */}
      <section className="py-40 px-6 max-w-6xl mx-auto relative z-10">
        <h2 className="text-2xl font-semibold text-center mb-20">
          Testimoni
        </h2>

        <div className="relative">

          <div className="grid md:grid-cols-3 gap-6">

            {[
              "Pelayanan sangat membantu proses pemulihan saya.",
              "Pendampingannya sangat humanis dan profesional.",
              "Saya merasa benar-benar didampingi sampai pulih."
            ].map((item, i) => (
              <div
                key={i}
                className={`p-8 rounded-3xl border border-[#022E2F]/10 bg-white/40 backdrop-blur-md
            ${i === 1 ? "md:-translate-y-6" : ""}
          `}
              >
                <p className="text-sm text-[#022E2F]/70 italic">
                  “{item}”
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>





      {/* FOOTER */}
      <footer id="contact" className="relative pt-40 pb-20 mt-10 border-t border-[#022E2F]/10">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-20">

            <div className="">
              <div className=" flex flex-1 items-center gap-3">
                <Image
                  src="/Logo-Bnn.jpg"
                  alt="Logo LRRPN-BI Surabaya"
                  width={32}
                  height={32}
                  className="object-contain"
                />

                <h2 className="text-sm font-semibold tracking-wide">
                  LRRPN-BI Surabaya
                </h2>
              </div>
              <p className="mt-4 text-[#022E2F]/70 text-sm leading-relaxed max-w-md">
                Layanan rehabilitasi narkotika dengan pendekatan medis dan psikologis.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-12">

              <div className="flex-1">
                <h3 className="font-semibold mb-4 text-sm">Alamat</h3>
                <div className="text-sm text-[#022E2F]/70">
                  Jl. Khairil Anwar No.23<br />
                  Surabaya Jawa Timur 60241

                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold mb-4 text-sm">Kontak</h3>

                <div className="flex items-center gap-2 text-sm text-[#022E2F]/70">
                  <Phone size={16} />
                  <span>08123263524</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#022E2F]/70 mt-2">
                  <Mail size={16} />
                  <span>lrrpnbisurabaya@gmail.com
                  </span>
                </div>

              </div>

            </div>
          </div>

          <div className="mt-16 border-t border-[#022E2F]/10 pt-6 flex justify-between text-xs text-[#022E2F]/50">
            <p>© 2026 LRRPN-BI Surabaya</p>

            <div className="flex gap-6">
              <a href="#about">About</a>
              <a href="#program">Program</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

        </div>
      </footer>

    </main>
  );
}