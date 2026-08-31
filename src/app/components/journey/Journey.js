"use client";
import { motion, useReducedMotion } from "motion/react";

const timeline = [
  { year: "2024", title: "Started Learning Programming", desc: "Began the journey into software development, learning fundamental programming concepts and problem-solving skills.", tags: ["C", "C++", "Fundamentals"] },
  { year: "2025", title: "Data Structures & Software Dev", desc: "Deepened understanding of computer science core concepts through data structures study and software development projects.", tags: ["Data Structures", "Algorithms", "Design"] },
  { year: "2026", title: "Web Dev & Game Dev", desc: "Expanding into game development with Unity and building modern web applications with Next.js and React.", tags: ["Unity", "Next.js", "React", "Game Design"] },
];

export default function Journey() {
  const reduce = useReducedMotion();

  return (
    <section id="journey" className="py-24 md:py-32 bg-surface/40 relative overflow-hidden">
      <div className="container-wide">
        <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }} className="mb-16">
          <span className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3 block">Journey</span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] leading-[1.1]" data-cursor="text">
            My developer<br />timeline<span className="text-accent">.</span>
          </h2>
        </motion.div>

        {/* Horizontal timeline */}
        <div className="relative">
          {/* Line */}
          <div className="absolute top-[28px] left-0 right-0 h-px bg-border" />
          {/* Traveling light */}
          {!reduce && (
            <div className="absolute top-[28px] left-0 right-0 h-px overflow-hidden pointer-events-none">
              <div className="absolute top-[-3px] w-[6px] h-[6px] rounded-full bg-accent shadow-[0_0_10px_3px_rgba(37,99,235,0.4)]"
                style={{ animation: "travel-h 8s ease-in-out infinite" }} />
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {timeline.map((item, i) => (
              <motion.div key={item.year}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                {/* Dot */}
                <div className="w-[10px] h-[10px] rounded-full bg-accent mb-6 relative z-10" style={{ animation: "pulse-ring 3s ease-in-out infinite", animationDelay: `${i * 0.5}s` }} />

                <span className="text-3xl md:text-4xl font-bold tracking-tighter text-accent/80 block mb-2">{item.year}</span>
                <h3 className="text-base font-semibold tracking-tight mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-3">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[9px] tracking-wider uppercase border border-border rounded text-muted">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
