"use client";
import { motion, useReducedMotion } from "motion/react";
import { Code, Gamepad2 } from "lucide-react";

function CodeBlock({ reduce }) {
  return (
    <div className="relative w-full h-48 rounded-xl border border-border bg-surface overflow-hidden font-mono text-[12px]">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-surface-hi">
        <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <span className="w-2 h-2 rounded-full bg-[#28c840]" />
      </div>
      <div className="p-4 space-y-1.5 text-muted">
        <div><span className="text-purple-400">while</span><span className="text-muted">(player.isAlive()) {"{"}</span></div>
        <div className="pl-4">explore();</div>
        <div className="pl-4">build();</div>
        <div className="pl-4">learn();</div>
        <div>{"}"}</div>
        {!reduce && <span className="inline-block w-1.5 h-3.5 bg-accent/50 align-middle" style={{ animation: "blink 1s step-end infinite" }} />}
      </div>
      {!reduce && <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" style={{ animation: "scan 5s linear infinite" }} />}
    </div>
  );
}

export default function WhatIDo() {
  const reduce = useReducedMotion();

  return (
    <section id="whatido" className="py-24 md:py-32 bg-surface/40 relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{
        backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <div className="container-wide relative z-10">
        <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }} className="mb-16">
          <span className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3 block">What I Build</span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] leading-[1.1]" data-cursor="text">
            Two domains<span className="text-accent">,</span><br />one developer<span className="text-accent">.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Web Dev */}
          <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative p-8 md:p-10 rounded-2xl border border-border bg-surface group hover:border-accent/20 transition-all duration-500" data-cursor="link">
            <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Code size={100} className="text-accent" style={{ animation: "float-y-slow 6s ease-in-out infinite" }} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] tracking-[0.2em] text-accent font-mono">01</span>
                <div className="w-8 h-px bg-accent/30" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Web Development</h3>
              <p className="text-[10px] tracking-[0.2em] uppercase text-accent mb-6">Next.js</p>
              <p className="text-sm text-muted leading-relaxed mb-6">
                Building modern, responsive web applications with cutting-edge frameworks. Focused on performance, interactivity, and clean user interfaces.
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "JavaScript", "Responsive UI", "Interactive Apps"].map((t) => (
                  <span key={t} className="px-3 py-1 text-[10px] tracking-wider uppercase border border-border rounded-md text-muted hover:border-accent/30 hover:text-accent transition-colors">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Game Dev */}
          <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative p-8 md:p-10 rounded-2xl border border-border bg-surface group hover:border-purple-500/20 transition-all duration-500" data-cursor="link">
            <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Gamepad2 size={100} className="text-purple-500" style={{ animation: "float-y-slow 6s ease-in-out 1s infinite" }} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] tracking-[0.2em] text-purple-400 font-mono">02</span>
                <div className="w-8 h-px bg-purple-500/30" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Game Development</h3>
              <p className="text-[10px] tracking-[0.2em] uppercase text-purple-400 mb-6">Programming</p>
              <p className="text-sm text-muted leading-relaxed mb-6">
                Designing and developing engaging games with immersive mechanics and polished gameplay. Exploring interactive experiences and game design principles.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Unity", "C#", "Godot", "Gameplay Systems"].map((t) => (
                  <span key={t} className="px-3 py-1 text-[10px] tracking-wider uppercase border border-border rounded-md text-muted hover:border-purple-500/30 hover:text-purple-400 transition-colors">{t}</span>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <CodeBlock reduce={reduce} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
