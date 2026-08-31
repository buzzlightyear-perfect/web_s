"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import { useCursor } from "../cursor/CursorContext";
import HeroBackground from "./HeroBackground";
import HeroParticles from "./HeroParticles";
import HeroTerminal from "./HeroTerminal";
import HeroOrbit from "./HeroOrbit";
import HeroCode from "./HeroCode";
import Magnetic from "../cursor/Magnetic";
import RocketGame from "../rocket-game/RocketGame";

const FOCUS_ITEMS = [
  { label: "Next.js", icon: "N" },
  { label: "Web Dev", icon: "W" },
  { label: "Programming", icon: "<>" },
  { label: "Game Dev", icon: "G" },
];

const TECH_STACK = [
  { name: "Next.js", color: "#F8FAFC" },
  { name: "React", color: "#22D3EE" },
  { name: "JavaScript", color: "#FBBF24" },
  { name: "Unity", color: "#3B82F6" },
  { name: "C#", color: "#A78BFA" },
  { name: "Git", color: "#F87171" },
  { name: "MySQL", color: "#22D3EE" },
];

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { mouseX, mouseY, isMobile } = useCursor();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  const l1x = useMotionValue(0); const l1y = useMotionValue(0);
  const s1x = useSpring(l1x, { damping: 30, stiffness: 80 }); const s1y = useSpring(l1y, { damping: 30, stiffness: 80 });

  useEffect(() => {
    if (reduce || isMobile) return;
    const h = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      l1x.set(nx * 2); l1y.set(ny * 2);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [reduce, isMobile, l1x, l1y]);

  return (
    <section id="home" ref={ref} className="relative min-h-[100svh] overflow-hidden" style={{ background: "#02040A" }}>
      {/* === BACKGROUND LAYERS (z-0) === */}
      <motion.div style={{ x: s1x, y: s1y }} className="absolute inset-0 pointer-events-none" data-layer="bg">
        <HeroBackground reduce={reduce} mouseX={mouseX} mouseY={mouseY} />
      </motion.div>
      <div className="absolute inset-0 pointer-events-none" data-layer="particles">
        <HeroParticles mouseX={mouseX} mouseY={mouseY} />
        <HeroCode reduce={reduce} />
      </div>

      {/* Dark gradient behind left content for readability */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(90deg, rgba(2,4,10,0.95) 0%, rgba(2,4,10,0.8) 40%, rgba(2,4,10,0.3) 65%, transparent 100%)",
        zIndex: 1,
      }} />

      {/* === MAIN CONTENT (z-10) === */}
      <motion.div style={{ opacity, y }} className="relative z-10 min-h-[100svh] flex flex-col">
        {/* Navbar spacer */}
        <div className="h-16 lg:h-[72px] shrink-0" />

        {/* Two-column layout */}
        <div className="flex-1 flex items-start">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-6 lg:py-10">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start">

              {/* ===== LEFT: PORTFOLIO CONTENT ===== */}
              <div className="relative z-20 order-2 lg:order-1 pt-4 lg:pt-8">
                {/* Status pill */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm mb-8 text-[10px] tracking-[0.2em] uppercase text-white/50"
                  data-cursor="text"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: "0 0 6px rgba(74,222,128,0.6)" }} />
                  Available for Building & Learning
                </motion.div>

                {/* Main headline */}
                <motion.h1
                  initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(2.8rem,5.5vw,5.2rem)] font-bold tracking-[-0.03em] leading-[0.92] mb-6"
                  data-cursor="text"
                >
                  <span className="text-white">BUILDING</span><br />
                  <span className="inline-block" style={{
                    background: "linear-gradient(135deg, #3B82F6, #22D3EE)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "hero-text-breathe 6s ease-in-out infinite",
                  }}>
                    DIGITAL
                  </span><br />
                  <span className="text-white">EXPERIENCES</span>
                  <span style={{ color: "#22D3EE", textShadow: "0 0 20px rgba(34,211,238,0.5)" }}>.</span>
                  <span className="inline-block w-3 h-6 ml-1 align-middle" style={{
                    backgroundColor: "#22D3EE",
                    boxShadow: "0 0 10px rgba(34,211,238,0.6)",
                    animation: "blink 1s step-end infinite",
                  }} />
                </motion.h1>

                {/* Description */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-8 max-w-lg"
                  data-cursor="text"
                >
                  <p className="text-white/60 text-sm md:text-base mb-2">
                    <span className="text-white/80">Informatics Student</span> &{" "}
                    <span style={{ color: "#3B82F6" }}>Developer</span>
                  </p>
                  <p className="text-white/40 text-sm leading-relaxed">
                    Currently studying Informatics at
                    Universitas Jenderal Achmad Yani (UNJANI).
                    <br />
                    Focused on building interactive web applications,
                    programming, and game development.
                  </p>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap gap-3 mb-10"
                >
                  <Magnetic strength={0.12}>
                    <a href="#projects" data-cursor="button" data-cursor-label="EXPLORE"
                      onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                      className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium tracking-wider uppercase rounded-lg overflow-hidden transition-all duration-300"
                      style={{
                        border: "1px solid rgba(59,130,246,0.4)",
                        background: "rgba(59,130,246,0.1)",
                        color: "#F8FAFC",
                        boxShadow: "0 0 20px rgba(59,130,246,0.15), 0 0 40px rgba(59,130,246,0.08)",
                      }}>
                      <span className="absolute inset-0 rounded-lg pointer-events-none" style={{
                        background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.2), transparent)",
                        animation: "cta-travel 3s linear infinite",
                      }} />
                      <span className="relative z-10">Explore My Work</span>
                      <ArrowRight size={13} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.08}>
                    <a href="#contact" data-cursor="button"
                      onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-white/60 text-xs font-medium tracking-wider uppercase rounded-lg hover:bg-white/[0.04] hover:text-white/80 transition-all">
                      <Mail size={13} /> Contact Me
                    </a>
                  </Magnetic>
                </motion.div>

                {/* Focus Area */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-8"
                >
                  <div className="text-[9px] tracking-[0.25em] uppercase text-white/30 mb-3 font-mono">Focus Area</div>
                  <div className="flex flex-wrap gap-2">
                    {FOCUS_ITEMS.map((item) => (
                      <div key={item.label} data-cursor="link"
                        className="group flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] tracking-wider text-white/60 border border-white/[0.06] bg-white/[0.02] hover:border-cyan-400/30 hover:text-white/90 hover:bg-cyan-400/[0.04] transition-all duration-300 hover:-translate-y-0.5">
                        <span className="font-mono text-[9px] font-bold" style={{ color: "#22D3EE" }}>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-[9px] tracking-[0.25em] uppercase text-white/30 mb-3 font-mono">Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {TECH_STACK.map((tech) => (
                      <div key={tech.name} data-cursor="link"
                        className="group px-3 py-1.5 rounded-md text-[10px] tracking-wider border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] transition-all duration-300 hover:-translate-y-0.5"
                        style={{ color: tech.color + "99" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = tech.color; e.currentTarget.style.boxShadow = `0 0 12px ${tech.color}15`; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = tech.color + "99"; e.currentTarget.style.boxShadow = "none"; }}>
                        {tech.name}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* ===== RIGHT: INTERACTIVE AREA ===== */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 order-1 lg:order-2 flex flex-col gap-4"
              >
                {/* Rocket Game Container */}
                <div className="relative w-full rounded-2xl overflow-hidden"
                  style={{
                    aspectRatio: "4/3",
                    maxHeight: "480px",
                    border: "1px solid rgba(59,130,246,0.15)",
                    boxShadow: "0 0 40px rgba(59,130,246,0.06), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}>
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-cyan-400/30 rounded-tl-2xl pointer-events-none z-20" />
                  <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-cyan-400/30 rounded-tr-2xl pointer-events-none z-20" />
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-cyan-400/30 rounded-bl-2xl pointer-events-none z-20" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-cyan-400/30 rounded-br-2xl pointer-events-none z-20" />
                  <RocketGame />
                </div>

                {/* Terminal + Orbit row */}
                <div className="hidden lg:grid lg:grid-cols-[1fr_280px] gap-3">
                  <HeroTerminal mouseX={mouseX} mouseY={mouseY} />
                  <HeroOrbit reduce={reduce} mouseX={mouseX} mouseY={mouseY} />
                </div>

                {/* Mobile: just terminal */}
                <div className="lg:hidden">
                  <HeroTerminal mouseX={mouseX} mouseY={mouseY} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="shrink-0 pb-5 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[9px] tracking-[0.25em] uppercase text-white/25">Scroll to Explore</span>
            <motion.div animate={reduce ? {} : { y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-white/25">
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
