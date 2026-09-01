"use client";
import { motion, useReducedMotion } from "motion/react";

const bio = [
  { label: "NAME", value: "Bhaskoro Prayoga Utomo" },
  { label: "EDUCATION", value: "Informatics" },
  { label: "UNIVERSITY", value: "Universitas Jenderal Achmad Yani" },
  { label: "STATUS", value: "Currently Studying" },
  { label: "FOCUS", value: "Next.js / Web / Game Dev" },
  { label: "LOCATION", value: "Indonesia" },
];

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 relative">
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none" />

      <div className="container-wide">
        <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }} className="mb-16">
          <span className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3 block">About</span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] leading-[1.1]" data-cursor="text">
            The person behind<br />the code<span className="text-accent">.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 xl:gap-24 items-start">
          {/* Left - avatar area */}
          <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            <div data-cursor="image" data-cursor-label="EXPLORE" className="relative w-full aspect-square max-w-[240px] lg:max-w-[320px] rounded-2xl border border-border bg-surface overflow-hidden group mx-auto lg:mx-0">
              {/* Abstract avatar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-2 border-accent/30 flex items-center justify-center" style={{ animation: "pulse-ring 3s ease-in-out infinite" }}>
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-accent/60">YN</span>
                  </div>
                </div>
              </div>
              {/* Floating dots */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="absolute w-1 h-1 rounded-full bg-accent/20" style={{
                  left: `${20 + i * 15}%`, top: `${15 + (i % 3) * 30}%`,
                  animation: `float-y ${3 + i * 0.5}s ease-in-out ${i * 0.4}s infinite`,
                }} />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted mt-4 text-center">
              Informatics Student at UNJANI
            </p>
          </motion.div>

          {/* Right - biodata panel */}
          <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="text-muted leading-relaxed mb-10 space-y-4" data-cursor="text">
              <p>
                I&apos;m an Informatics student at Universitas Jenderal Achmad Yani (UNJANI) with a passion for turning ideas into functional, elegant software. My journey is driven by curiosity and the desire to solve real-world problems through code.
              </p>
              <p>
                From building game systems to developing web applications, I explore different domains of software development to expand my understanding of what&apos;s possible with technology.
              </p>
            </div>

            {/* Editorial biodata panel */}
            <div className="border-t border-border">
              {bio.map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={reduce ? false : { opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-0 py-4 border-b border-border group"
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted w-28 sm:w-40 shrink-0">{row.label}</span>
                  <span className="text-sm text-foreground font-medium">{row.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
