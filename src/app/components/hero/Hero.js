"use client";
import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import { useCursor } from "../cursor/CursorContext";
import HeroBackground from "./HeroBackground";
import HeroParticles from "./HeroParticles";
import HeroTerminal from "./HeroTerminal";
import HeroOrbit from "./HeroOrbit";
import HeroCode from "./HeroCode";
import Magnetic from "../cursor/Magnetic";

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { mouseX, mouseY, isMobile } = useCursor();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  // Parallax layers
  const l1x = useMotionValue(0); const l1y = useMotionValue(0);
  const l2x = useMotionValue(0); const l2y = useMotionValue(0);
  const l3x = useMotionValue(0); const l3y = useMotionValue(0);
  const l4x = useMotionValue(0); const l4y = useMotionValue(0);
  const s1x = useSpring(l1x, { damping: 30, stiffness: 80 }); const s1y = useSpring(l1y, { damping: 30, stiffness: 80 });
  const s2x = useSpring(l2x, { damping: 25, stiffness: 100 }); const s2y = useSpring(l2y, { damping: 25, stiffness: 100 });
  const s3x = useSpring(l3x, { damping: 20, stiffness: 120 }); const s3y = useSpring(l3y, { damping: 20, stiffness: 120 });
  const s4x = useSpring(l4x, { damping: 18, stiffness: 140 }); const s4y = useSpring(l4y, { damping: 18, stiffness: 140 });

  useEffect(() => {
    if (reduce || isMobile) return;
    const h = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      l1x.set(nx * 2); l1y.set(ny * 2);
      l2x.set(nx * 5); l2y.set(ny * 5);
      l3x.set(nx * 8); l3y.set(ny * 8);
      l4x.set(nx * 12); l4y.set(ny * 12);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [reduce, isMobile, l1x, l1y, l2x, l2y, l3x, l3y, l4x, l4y]);

  return (
    <section id="home" ref={ref} className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Layer 1: Background */}
      <motion.div style={{ x: s1x, y: s1y }} className="absolute inset-0">
        <HeroBackground reduce={reduce} mouseX={mouseX} mouseY={mouseY} />
      </motion.div>

      {/* Layer 2: Particles + Code */}
      <motion.div style={{ x: s2x, y: s2y }} className="absolute inset-0">
        <HeroParticles mouseX={mouseX} mouseY={mouseY} />
        <HeroCode reduce={reduce} />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity, y }} className="container-wide relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Status pill */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/60 backdrop-blur-sm mb-8 text-[10px] tracking-[0.2em] uppercase text-muted"
              data-cursor="text"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: "0 0 6px rgba(74,222,128,0.6)" }} />
              Available for Building & Learning
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-[-0.03em] leading-[0.95] mb-6"
              data-cursor="text"
            >
              BUILDING<br />
              <span className="inline-block" style={{ animation: "hero-text-breathe 6s ease-in-out infinite" }}>
                DIGITAL
              </span>
              <br />
              EXPERIENCES<span style={{ color: "#3B82F6", textShadow: "0 0 20px rgba(59,130,246,0.5)" }}>.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted text-base md:text-lg max-w-md mb-10 leading-relaxed"
              data-cursor="text"
            >
              Informatics Student & Developer creating for the web, games, and interactive applications.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Magnetic strength={0.12}>
                <a href="#projects" data-cursor="button" data-cursor-label="EXPLORE"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="group relative inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-xs font-medium tracking-wider uppercase rounded-lg overflow-hidden transition-all duration-300"
                  style={{ boxShadow: "0 0 20px rgba(59,130,246,0.3), 0 0 40px rgba(59,130,246,0.15)" }}>
                  {/* Traveling border highlight */}
                  <span className="absolute inset-0 rounded-lg pointer-events-none" style={{
                    background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.3), transparent)",
                    animation: "cta-travel 3s linear infinite",
                  }} />
                  <span className="relative z-10">Explore My Work</span>
                  <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </a>
              </Magnetic>
              <Magnetic strength={0.08}>
                <a href="#contact" data-cursor="button"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-xs font-medium tracking-wider uppercase rounded-lg hover:bg-surface-hi transition-colors">
                  <Mail size={14} /> Contact Me
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right: Terminal + Orbit */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="hidden lg:flex items-center gap-8"
          >
            {/* Layer 4: Terminal (strongest parallax) */}
            <motion.div style={{ x: s4x, y: s4y }}>
              <HeroTerminal mouseX={mouseX} mouseY={mouseY} />
            </motion.div>

            {/* Layer 3: Orbit */}
            <motion.div style={{ x: s3x, y: s3y }}>
              <HeroOrbit reduce={reduce} mouseX={mouseX} mouseY={mouseY} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.25em] uppercase text-muted">Scroll to Explore</span>
        <motion.div animate={reduce ? {} : { y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
