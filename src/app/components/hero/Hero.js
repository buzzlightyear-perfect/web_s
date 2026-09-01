"use client";
import { useEffect } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import { useCursor } from "../cursor/CursorContext";
import Magnetic from "../cursor/Magnetic";
import CinematicRocket from "./CinematicRocket";

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
  const reduce = useReducedMotion();
  const { mouseX, mouseY, isMobile } = useCursor();

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
    <section id="home" className="relative" style={{ background: "#02040A" }}>
      {/* Cinematic Rocket — full-screen 3D background with scroll-driven animation */}
      <CinematicRocket />

      {/* Dark gradient behind text for readability — responsive */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: isMobile
          ? "linear-gradient(180deg, rgba(2,4,10,0.88) 0%, rgba(2,4,10,0.65) 50%, transparent 100%)"
          : "linear-gradient(90deg, rgba(2,4,10,0.92) 0%, rgba(2,4,10,0.75) 35%, rgba(2,4,10,0.3) 60%, transparent 100%)",
        zIndex: 5,
      }} />

      {/* === PORTFOLIO TEXT CONTENT (overlaid on 3D scene) === */}
      <motion.div
        style={{ x: isMobile ? 0 : s1x, y: isMobile ? 0 : s1y }}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        <div className="relative h-full flex flex-col pointer-events-auto">
          {/* Navbar spacer */}
          <div className="h-14 lg:h-[72px] shrink-0" />

          {/* Content */}
          <div className="flex-1 flex items-start">
            <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-4 lg:pt-10 pb-8">
              <div className="max-w-xl">

                {/* Status pill */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm mb-6 lg:mb-8 text-[10px] tracking-[0.2em] uppercase text-white/50"
                  data-cursor="text"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: "0 0 6px rgba(74,222,128,0.6)" }} />
                  Available for Building & Learning
                </motion.div>

                {/* Main headline — responsive typography */}
                <motion.h1
                  initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-bold tracking-[-0.03em] leading-[0.92] mb-4 lg:mb-6"
                  style={{ fontSize: "clamp(2.5rem, 12vw, 5.2rem)" }}
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
                  <span className="inline-block w-2.5 lg:w-3 h-5 lg:h-6 ml-1 align-middle" style={{
                    backgroundColor: "#22D3EE",
                    boxShadow: "0 0 10px rgba(34,211,238,0.6)",
                    animation: "blink 1s step-end infinite",
                  }} />
                </motion.h1>

                {/* Description — responsive text */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-6 lg:mb-8 max-w-lg"
                  data-cursor="text"
                >
                  <p className="text-white/60 text-sm lg:text-base mb-2">
                    <span className="text-white/80">Informatics Student</span> &{" "}
                    <span style={{ color: "#3B82F6" }}>Developer</span>
                  </p>
                  <p className="text-white/40 text-[13px] lg:text-sm leading-relaxed" style={{ lineHeight: "1.65" }}>
                    Currently studying Informatics at
                    Universitas Jenderal Achmad Yani (UNJANI).
                    <br />
                    Focused on building interactive web applications,
                    programming, and game development.
                  </p>
                </motion.div>

                {/* CTAs — responsive sizing */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap gap-2.5 lg:gap-3 mb-8 lg:mb-10"
                >
                  <Magnetic strength={0.12}>
                    <a href="#projects" data-cursor="button" data-cursor-label="EXPLORE"
                      onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                      className="group relative inline-flex items-center gap-2 px-4 lg:px-5 py-2.5 text-[11px] lg:text-xs font-medium tracking-wider uppercase rounded-lg overflow-hidden transition-all duration-300"
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
                      className="inline-flex items-center gap-2 px-4 lg:px-5 py-2.5 border border-white/10 text-white/60 text-[11px] lg:text-xs font-medium tracking-wider uppercase rounded-lg hover:bg-white/[0.04] hover:text-white/80 transition-all">
                      <Mail size={13} /> Contact Me
                    </a>
                  </Magnetic>
                </motion.div>

                {/* Focus Area — responsive */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-6 lg:mb-8"
                >
                  <div className="text-[9px] tracking-[0.25em] uppercase text-white/30 mb-3 font-mono">Focus Area</div>
                  <div className="flex flex-wrap gap-1.5 lg:gap-2">
                    {FOCUS_ITEMS.map((item) => (
                      <div key={item.label} data-cursor="link"
                        className="group flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-md text-[10px] lg:text-[11px] tracking-wider text-white/60 border border-white/[0.06] bg-white/[0.02] hover:border-cyan-400/30 hover:text-white/90 hover:bg-cyan-400/[0.04] transition-all duration-300 hover:-translate-y-0.5">
                        <span className="font-mono text-[8px] lg:text-[9px] font-bold" style={{ color: "#22D3EE" }}>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Tech Stack — responsive */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-[9px] tracking-[0.25em] uppercase text-white/30 mb-3 font-mono">Tech Stack</div>
                  <div className="flex flex-wrap gap-1.5 lg:gap-2">
                    {TECH_STACK.map((tech) => (
                      <div key={tech.name} data-cursor="link"
                        className="group px-2.5 lg:px-3 py-1.5 rounded-md text-[9px] lg:text-[10px] tracking-wider border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] transition-all duration-300 hover:-translate-y-0.5"
                        style={{ color: tech.color + "99" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = tech.color; e.currentTarget.style.boxShadow = `0 0 12px ${tech.color}15`; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = tech.color + "99"; e.currentTarget.style.boxShadow = "none"; }}>
                        {tech.name}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
