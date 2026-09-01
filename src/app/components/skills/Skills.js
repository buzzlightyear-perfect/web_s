"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

const skills = [
  { name: "C", cat: "LANGUAGES", lvl: "Intermediate", clr: "#555" },
  { name: "C++", cat: "LANGUAGES", lvl: "Intermediate", clr: "#00599C" },
  { name: "Go", cat: "LANGUAGES", lvl: "Beginner", clr: "#00ADD8" },
  { name: "JavaScript", cat: "LANGUAGES", lvl: "Proficient", clr: "#f1e05a" },
  { name: "TypeScript", cat: "LANGUAGES", lvl: "Intermediate", clr: "#3178c6" },
  { name: "HTML", cat: "WEB", lvl: "Proficient", clr: "#e34c26" },
  { name: "CSS", cat: "WEB", lvl: "Proficient", clr: "#563d7c" },
  { name: "React", cat: "WEB", lvl: "Proficient", clr: "#61dafb" },
  { name: "Next.js", cat: "WEB", lvl: "Proficient", clr: "#fff" },
  { name: "Tailwind", cat: "WEB", lvl: "Proficient", clr: "#06b6d4" },
  { name: "Unity", cat: "GAME", lvl: "Intermediate", clr: "#fff" },
  { name: "Godot", cat: "GAME", lvl: "Beginner", clr: "#478cbf" },
  { name: "C#", cat: "GAME", lvl: "Intermediate", clr: "#68217a" },
  { name: "Git", cat: "TOOLS", lvl: "Proficient", clr: "#f05032" },
  { name: "GitHub", cat: "TOOLS", lvl: "Proficient", clr: "#fff" },
  { name: "VS Code", cat: "TOOLS", lvl: "Proficient", clr: "#007acc" },
  { name: "Blender", cat: "TOOLS", lvl: "Beginner", clr: "#ea7600" },
  { name: "Blockbench", cat: "TOOLS", lvl: "Beginner", clr: "#1fa58e" },
];

const cats = ["ALL", "LANGUAGES", "WEB", "GAME", "TOOLS"];
const lvlClr = { Proficient: "text-green-400 bg-green-400/10", Intermediate: "text-blue-400 bg-blue-400/10", Beginner: "text-orange-400 bg-orange-400/10" };

export default function Skills() {
  const [cat, setCat] = useState("ALL");
  const [hovered, setHovered] = useState(null);
  const filtered = cat === "ALL" ? skills : skills.filter((s) => s.cat === cat);
  const floatDurs = useMemo(() => skills.map(() => 3 + Math.random() * 3), []);
  const floatDelays = useMemo(() => skills.map(() => Math.random() * 2), []);

  return (
    <section id="skills" className="py-16 md:py-24 lg:py-32 relative">
      <div className="container-wide">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }} className="mb-12">
          <span className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3 block">Skills</span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] leading-[1.1]" data-cursor="text">
            Technology<br />stack<span className="text-accent">.</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-12">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase rounded-md border transition-all duration-300 ${
                cat === c ? "bg-foreground text-background border-foreground" : "text-muted border-border hover:border-foreground hover:text-foreground"
              }`} data-cursor="button">{c}</button>
          ))}
        </div>

        {/* Tech wall */}
        <div className="flex flex-wrap gap-3 items-center justify-center">
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => {
              const idx = skills.indexOf(s);
              const isHovered = hovered === s.name;
              const isDimmed = hovered && !isHovered;
              return (
                <motion.div
                  key={s.name} layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: isDimmed ? 0.4 : 1, scale: isHovered ? 1.1 : 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.3, layout: { duration: 0.3 } }}
                  onMouseEnter={() => setHovered(s.name)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative px-3 lg:px-5 py-2 lg:py-3 rounded-lg border border-border bg-surface cursor-default transition-colors hover:border-accent/30" data-cursor="link"
                  style={{ animation: `float-y ${floatDurs[idx]}s ease-in-out ${floatDelays[idx]}s infinite` }}
                >
                  {/* Spotlight on hover */}
                  {isHovered && (
                    <div className="absolute inset-0 rounded-lg pointer-events-none" style={{
                      boxShadow: `0 0 24px ${s.clr}15, inset 0 0 24px ${s.clr}08`,
                    }} />
                  )}
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.clr }} />
                    <span className="text-sm font-medium tracking-tight">{s.name}</span>
                  </div>
                  {isHovered && (
                    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
                      <span className={`text-[9px] px-2 py-0.5 rounded ${lvlClr[s.lvl]}`}>{s.lvl}</span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
