"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";


import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Hero from "./components/hero";
import About from "./components/about";
import Program from "./components/program";

export default function Home() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const [startCount, setStartCount] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [open, setOpen] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });

  // CURSOR
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, {
    stiffness: 120,
    damping: 20,
  });

  const springY = useSpring(cursorY, {
    stiffness: 120,
    damping: 20,
  });

  const statsData = [
    { number: 1200, suffix: "+", label: "Pasien Pulih" },
    { number: 10, suffix: "+", label: "Tahun Pengalaman" },
    { number: 24, suffix: "/7", label: "Pendampingan" },
    { number: 98, suffix: "%", label: "Success Rate" },
  ];

  // LENIS
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

  // COUNTER
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startCount) return;

    const duration = 1500;
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min(
        (time - startTime) / duration,
        1
      );

      setCounts(
        statsData.map((item) =>
          Math.floor(item.number * progress)
        )
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [startCount]);

  // MOUSE
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = {
        x: e.clientX,
        y: e.clientY,
      };

      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, [cursorX, cursorY]);

  // PARTICLE
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    window.addEventListener("resize", resize);

    const gridSize = 35;

    let time = 0;

    const draw = () => {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      time += 0.01;

      const mx =
        mouse.current.x || canvas.width / 2;

      const my =
        mouse.current.y || canvas.height / 2;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (
        let x = -gridSize;
        x < canvas.width + gridSize;
        x += gridSize
      ) {
        for (
          let y = -gridSize;
          y < canvas.height + gridSize;
          y += gridSize
        ) {
          const dx = mx - x;
          const dy = my - y;

          const distMouse = Math.sqrt(
            dx * dx + dy * dy
          );

          const cursorForce = Math.max(
            0,
            1 - distMouse / 180
          );

          const ripple =
            Math.sin(
              distMouse * 0.05 - time * 6
            ) *
            cursorForce *
            6;

          const wave =
            Math.sin(
              x * 0.015 + y * 0.015 + time
            ) * 2.5;

          const ddx = x - centerX;
          const ddy = y - centerY;

          const distCenter = Math.sqrt(
            ddx * ddx + ddy * ddy
          );

          const centerBoost = Math.max(
            0,
            1 - distCenter / 650
          );

          const core = Math.pow(
            centerBoost,
            1.4
          );

          const px = x + wave + ripple;
          const py = y + wave + ripple;

          const pulse =
            Math.sin(
              time * 2 +
              x * 0.02 +
              y * 0.02
            ) *
            0.5 +
            0.5;

          const alpha =
            0.03 +
            core * 0.5 +
            pulse * 0.1 +
            cursorForce * 0.4;

          ctx.shadowBlur =
            15 + cursorForce * 30;

          ctx.shadowColor = `rgba(249,115,22,${0.4 + cursorForce * 0.6
            })`;

          ctx.fillStyle = `rgba(249,115,22,${alpha})`;

          ctx.fillRect(px, py, 3, 3);
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () =>
      window.removeEventListener(
        "resize",
        resize
      );
  }, []);

  return (
    <main className="bg-[#0A0A0A] text-white overflow-x-hidden relative">
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border border-orange-400 z-[999] pointer-events-none mix-blend-difference"
      />

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-orange-500/20 blur-[140px]" />

        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-orange-500/10 blur-[160px]" />
      </div>

      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      <Navbar />
      <Hero />
      <About />
      {/* STATS */}
      <section
        ref={sectionRef}
        className="py-20 md:py-32 px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center max-w-5xl mx-auto relative z-10"
      >
        {statsData.map((item, i) => (
          <motion.div
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            key={i}
            className="space-y-2 border border-orange-500/10 rounded-3xl p-5 md:p-8 bg-white/5 backdrop-blur-xl"
          >
            <h3 className="text-2xl md:text-4xl font-semibold text-orange-500">
              {counts[i]}
              {item.suffix}
            </h3>

            <p className="text-[11px] md:text-sm text-white/60">
              {item.label}
            </p>
          </motion.div>
        ))}
      </section>
      <Program />
      <Footer />

    </main>
  );
}