"use client";
import { motion, useReducedMotion } from "motion/react";
import { experience } from "@/data/experience";

export default function Experience() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="py-16 md:py-24 lg:py-32 bg-surface/40 relative overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3 block">
            Experience
          </span>
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] leading-[1.1]"
            data-cursor="text"
          >
            My developer
            <br />
            journey<span className="text-accent">.</span>
          </h2>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

          {experience.map((group, gi) => (
            <div key={group.year} className="relative mb-12 last:mb-0">
              {/* Year marker */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gi * 0.1 }}
                className="flex items-center gap-4 mb-6"
              >
                <div
                  className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0 relative z-10"
                  style={{ animation: `pulse-ring 3s ease-in-out ${gi * 0.5}s infinite` }}
                >
                  <span className="text-xs font-bold text-accent font-mono">
                    {group.year.slice(2)}
                  </span>
                </div>
                <span className="text-2xl md:text-3xl font-bold tracking-tighter text-foreground/80">
                  {group.year}
                </span>
              </motion.div>

              {/* Items */}
              <div className="pl-14 space-y-4">
                {group.items.map((item, ii) => (
                  <motion.div
                    key={item.title}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: gi * 0.1 + ii * 0.08 }}
                    className="group relative p-5 rounded-xl border border-border bg-surface/50 hover:border-accent/20 transition-all duration-300"
                    data-cursor="link"
                  >
                    <h3 className="text-sm font-semibold tracking-tight mb-1 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
