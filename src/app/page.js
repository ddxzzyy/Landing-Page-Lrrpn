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
  const mouse = useRef({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);

  const statsData = [
    { number: 1200, suffix: "+", label: "Pasien Pulih" },
    { number: 10, suffix: "+", label: "Tahun Pengalaman" },
    { number: 24, suffix: "/7", label: "Pendampingan" },
    { number: 98, suffix: "%", label: "Success Rate" },
  ];

  // ================= ANIMATION VARIANTS =================
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const stagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  };

  // ================= SMOOTH SCROLL =================
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

  // ================= COUNTER =================
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
        statsData.map((item) => Math.floor(item.number * progress))
      );

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [startCount]);

  // ================= CANVAS GRID =================
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

    const gridSize = 22;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      const mx = mouse.current.x || canvas.width / 2;
      const my = mouse.current.y || canvas.height / 2;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
        for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
          const dx = mx - x;
          const dy = my - y;
          const distMouse = Math.sqrt(dx * dx + dy * dy);
          const cursorForce = Math.max(0, 1 - distMouse / 180);

          const ripple =
            Math.sin(distMouse * 0.05 - time * 6) * cursorForce * 6;
          const wave =
            Math.sin(x * 0.015 + y * 0.015 + time) * 2.5;

          const ddx = x - centerX;
          const ddy = y - centerY;
          const distCenter = Math.sqrt(ddx * ddx + ddy * ddy);
          const centerBoost = Math.max(0, 1 - distCenter / 650);
          const core = Math.pow(centerBoost, 1.4);

          const px = x + wave + ripple;
          const py = y + wave + ripple;

          const pulse =
            Math.sin(time * 2 + x * 0.02 + y * 0.02) * 0.5 + 0.5;

          const alpha =
            0.05 +
            core * 0.6 +
            pulse * 0.1 +
            cursorForce * 0.35;

          ctx.shadowBlur = 15 + cursorForce * 30;
          ctx.shadowColor = `rgba(34,197,94,${0.4 + cursorForce * 0.6})`;

          ctx.fillStyle = `rgba(34,197,94,${alpha})`;
          ctx.fillRect(px, py, 3, 3);
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
    return () =>
      window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="bg-[#f5f5f5] text-[#022E2F] overflow-x-hidden relative">

      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#f5f5f5]/70 border-b border-[#022E2F]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">

          <div className="flex-1 flex items-center gap-3">
            <Image src="/Logo-Bnn.jpg" alt="Logo" width={32} height={32} />
            <h1 className="text-xs uppercase font-semibold tracking-[0.2em]">
              LRRPN-BI Surabaya
            </h1>
          </div>

          <div className="hidden md:flex gap-8 text-xs">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#program">Program</a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="h-screen flex flex-col justify-center items-center text-center relative z-10">
        <motion.h1 variants={fadeUp} initial="hidden" animate="show" className="text-6xl font-semibold">
          LRRPN-BI SURABAYA
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="show" className="mt-6 text-sm text-[#022E2F]/70">
          Rehabilitasi fisik, mental, dan sosial
        </motion.p>
      </section>





      {/* ABOUT */}
      <motion.section
        id="about"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-32 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-20 relative z-10"
      >
        <motion.div variants={fadeUp}>
          <h2 className="text-3xl font-semibold mb-6">Pendekatan Humanis</h2>
          <p className="text-sm text-[#022E2F]/70">
            Pendekatan medis dan psikologis yang dirancang untuk pemulihan menyeluruh.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="border border border-[#022E2F]/10 p-10 rounded-xl">
          Fokus pada reintegrasi sosial pasien.
        </motion.div>
      </motion.section>










      {/* STATS */}
      <section
        ref={sectionRef}
        className="py-32 grid grid-cols-2 md:grid-cols-4 text-center max-w-5xl mx-auto relative z-10"
      >
        {statsData.map((item, i) => (
          <div key={i}>
            <h3 className="text-2xl font-semibold">
              {counts[i]}{item.suffix}
            </h3>
            <p className="text-xs">{item.label}</p>
          </div>
        ))}
      </section>













      {/* PROGRAM */}
      <motion.section
        id="program"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-40 px-6 max-w-6xl mx-auto relative z-10"
      >
        <motion.h2 variants={fadeUp} className="text-2xl font-semibold text-center mb-20">
          Program
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">

          <motion.div
            variants={fadeUp}
            className="md:col-span-2 border border-[#022E2F]/10 rounded-3xl p-10 bg-[#f5f5f5]/40 backdrop-blur-md hover:scale-[1.02] transition"
          >
            <h3 className="text-xl font-semibold mb-4">
              Program Unggulan
            </h3>
            <p className="text-sm text-[#022E2F]/70 leading-relaxed">
              Pendekatan rehabilitasi yang kami terapkan mengintegrasikan berbagai aspek penting, mulai dari terapi psikologis, penanganan medis, hingga pendampingan sosial yang berkelanjutan.
            </p>
          </motion.div>

          <div className="space-y-6">
            {["Hipnoterapi", "Terapi Psikologis", "Reintegrasi Sosial"].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="border border-[#022E2F]/10 rounded-2xl p-6 bg-[#f5f5f5]/30 hover:bg-[#f5f5f5]/60 transition"
              >
                <p className="text-sm font-medium">{item}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>















      {/* ARTICLE */}
      <motion.section
        id="article"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-40 px-6 max-w-6xl mx-auto relative z-10"
      >
        <motion.h2 variants={fadeUp} className="text-2xl font-semibold text-center mb-20">
          Artikel
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { img: "/artikel.jpg", text: "Edukasi kesehatan mental." },
            { img: "/artikel.jpg", text: "Proses rehabilitasi pasien." },
            { img: "/artikel.jpg", text: "Pemulihan sosial." },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-3xl border border-[#022E2F]/10 bg-[#f5f5f5]/40 backdrop-blur-md
        ${i === 0 ? "md:scale-105" : ""}`}
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
            </motion.div>
          ))}
        </div>
      </motion.section>













      {/* PROSES */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 md:py-40 px-4 md:px-6 max-w-4xl mx-auto relative z-10"
      >
        <motion.h2 variants={fadeUp} className="text-xl md:text-2xl font-semibold text-center mb-10 md:mb-20">
          Proses Rehabilitasi
        </motion.h2>

        <div className="space-y-6 md:space-y-10">
          {[
            "Assessment Awal",
            "Terapi & Pendampingan",
            "Pemulihan Mental",
            "Reintegrasi Sosial"
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex gap-4 md:gap-6 items-start bg-[#f5f5f5]/40 backdrop-blur-md border border-[#022E2F]/10 p-4 md:p-6 rounded-2xl hover:translate-x-1 transition"
            >
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#022E2F] text-[#f5f5f5] flex items-center justify-center text-xs md:text-sm font-semibold">
                {i + 1}
              </div>

              <div>
                <p className="text-xs md:text-sm font-medium mb-1">
                  Step {i + 1}
                </p>
                <p className="text-sm md:text-base text-[#022E2F]/70">
                  {item}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>












      {/* TESTIMONI */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-40 px-6 max-w-6xl mx-auto relative z-10"
      >
        <motion.h2
          variants={fadeUp}
          className="text-2xl font-semibold text-center mb-20"
        >
          Testimoni
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Pelayanan sangat membantu proses pemulihan saya.",
            "Pendampingannya sangat humanis dan profesional.",
            "Saya merasa benar-benar didampingi sampai pulih."
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`p-8 rounded-3xl border border-[#022E2F]/10 bg-[#f5f5f5]/40 backdrop-blur-md
        ${i === 1 ? "md:-translate-y-6" : ""}`}
            >
              <p className="text-sm text-[#022E2F]/70 italic">
                “{item}”
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>









      {/* FOOTER */} 
      <footer id="contact" className="relative pt-40 pb-20 mt-10 border-t border-[#022E2F]/10"> 
      <div className="max-w-7xl mx-auto px-6">
         <div className="grid md:grid-cols-2 gap-20"> 
          <div className=""> 
            <div className=" flex flex-1 items-center gap-3"> 
              <Image src="/Logo-Bnn.jpg" alt="Logo LRRPN-BI Surabaya" width={32} height={32} className="object-contain" /> 
              <h2 className="text-sm font-semibold tracking-wide"> LRRPN-BI Surabaya </h2> 
              </div> 
              <p className="mt-4 text-[#022E2F]/70 text-sm leading-relaxed max-w-md"> Layanan rehabilitasi narkotika dengan pendekatan medis dan psikologis. </p> 
              </div> <div className="flex flex-col md:flex-row gap-12"> <div className="flex-1"> <h3 className="font-semibold mb-4 text-sm">Alamat</h3> <div className="text-sm text-[#022E2F]/70"> Jl. Khairil Anwar No.23<br /> Surabaya Jawa Timur 60241 </div> </div> <div className="flex-1"> <h3 className="font-semibold mb-4 text-sm">Kontak</h3> <div className="flex items-center gap-2 text-sm text-[#022E2F]/70"> <Phone size={16} /> <span>08123263524</span> </div> <div className="flex items-center gap-2 text-sm text-[#022E2F]/70 mt-2"> <Mail size={16} /> <span>lrrpnbisurabaya@gmail.com </span> </div> </div> </div> </div> <div className="mt-16 border-t border-[#022E2F]/10 pt-6 flex justify-between text-xs text-[#022E2F]/50"> <p>© 2026 LRRPN-BI Surabaya</p> <div className="flex gap-6"> <a href="#about">About</a> <a href="#program">Program</a> <a href="#contact">Contact</a> </div> </div> </div> </footer>
    </main>
  );
}