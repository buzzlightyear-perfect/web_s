"use client";
import { motion, useReducedMotion } from "motion/react";
import { currentlyLearning } from "@/data/experience";

export default function CurrentlyLearning() {
  const reduce = useReducedMotion();

  return (
    <section id="learning" className="py-16 md:py-24 lg:py-32 relative">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-purple-500/[0.03] blur-[120px] pointer-events-none" />

      <div className="container-wide">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3 block">
            Currently Learning
          </span>
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] leading-[1.1]"
            data-cursor="text"
          >
            Always
            <br />
            expanding<span className="text-accent">.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          {currentlyLearning.map((item, i) => (
            <motion.div
              key={item.number}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-6 lg:p-8 rounded-2xl border border-border bg-surface hover:border-accent/20 transition-all duration-500"
              data-cursor="link"
            >
              <div className="flex items-start gap-5">
                <span
                  className="text-4xl lg:text-5xl font-bold tracking-tighter font-mono shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #3B82F6, #22D3EE)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    opacity: 0.3,
                  }}
                >
                  {item.number}
                </span>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold tracking-tight mb-2 group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: "inset 0 0 40px rgba(59,130,246,0.03), 0 0 30px rgba(59,130,246,0.05)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
