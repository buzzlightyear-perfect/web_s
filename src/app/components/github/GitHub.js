"use client";
import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { GitBranch, Star, GitCommit } from "lucide-react";
import { GithubIcon } from "../icons";

const repos = [
  { name: "portfolio-website", desc: "Personal portfolio built with Next.js and Tailwind CSS", lang: "JavaScript", color: "#f1e05a" },
  { name: "warehouse-inventory", desc: "Inventory management system built with C and custom data structures", lang: "C", color: "#555" },
  { name: "game-project", desc: "Game development project built with Unity and C#", lang: "C#", color: "#178600" },
];

const stats = [
  { label: "Contributions", value: "500+", icon: GitCommit },
  { label: "Repositories", value: "10+", icon: GitBranch },
  { label: "Stars", value: "5+", icon: Star },
];

function ContributionGrid({ reduce }) {
  const weeks = useMemo(() => Array.from({ length: 22 }, () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))), []);
  const clr = (l) => ["bg-surface-hi", "bg-accent/15", "bg-accent/30", "bg-accent/50", "bg-accent/70"][l];
  return (
    <div className="relative p-3 sm:p-4 lg:p-6 rounded-xl border border-border bg-surface overflow-hidden">
      {!reduce && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 bottom-0 w-40 bg-gradient-to-r from-transparent via-accent/[0.04] to-transparent"
            style={{ animation: "sweep-light 10s linear infinite" }} />
        </div>
      )}
      <div className="flex gap-[3px] justify-center">
        {weeks.map((w, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {w.map((l, di) => (
              <div key={di} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] ${clr(l)} ${!reduce && l > 0 ? "animate-[contribution-glow_4s_ease-in-out_infinite]" : ""}`}
                style={{ animationDelay: !reduce ? `${wi * 0.08 + di * 0.04}s` : undefined }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GitHub() {
  const reduce = useReducedMotion();
  return (
    <section id="github" className="py-16 md:py-24 lg:py-32 relative">
      <div className="container-narrow">
        <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3 block">GitHub</span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] leading-[1.1]" data-cursor="text">
            Code in<br />public<span className="text-accent">.</span>
          </h2>
        </motion.div>

        <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}>
          <ContributionGrid reduce={reduce} />
        </motion.div>

        <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-3 gap-3 sm:gap-4 my-8 lg:my-10 max-w-lg mx-auto">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className="text-center p-4 rounded-lg border border-border bg-surface/50">
              <s.icon size={16} className="mx-auto mb-1.5 text-muted" />
              <div className="text-xl font-bold tracking-tight">{s.value}</div>
              <div className="text-[9px] tracking-wider text-muted uppercase mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="space-y-3">
          {repos.map((r, i) => (
            <motion.a key={r.name} href="https://github.com" target="_blank" rel="noopener noreferrer"
              initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              className="flex items-center justify-between p-4 sm:p-5 rounded-xl border border-border bg-surface/50 hover:bg-surface transition-all duration-300 group" data-cursor="link">
              <div className="flex items-center gap-4">
                <GithubIcon size={18} className="text-muted group-hover:text-foreground transition-colors" />
                <div>
                  <h4 className="text-sm font-medium tracking-tight group-hover:text-accent transition-colors">{r.name}</h4>
                  <p className="text-xs text-muted mt-0.5">{r.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
                <span className="text-[10px] text-muted">{r.lang}</span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.8 }} className="text-center mt-10">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-wider uppercase border border-border rounded-md hover:bg-surface transition-colors" data-cursor="button">
            <GithubIcon size={12} /> View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
