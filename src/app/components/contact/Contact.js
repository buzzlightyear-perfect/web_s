"use client";
import { motion, useReducedMotion } from "motion/react";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "../icons";
import Magnetic from "../cursor/Magnetic";

const socials = [
  { label: "Email", href: "mailto:your@email.com", icon: Mail, handle: "your@email.com" },
  { label: "GitHub", href: "https://github.com/yourusername", icon: GithubIcon, handle: "@yourusername" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourusername", icon: LinkedinIcon, handle: "@yourusername" },
  { label: "Instagram", href: "https://instagram.com/yourusername", icon: InstagramIcon, handle: "@yourusername" },
];

function Orbit({ reduce }) {
  if (reduce) return null;
  return (
    <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none hidden lg:block">
      <div className="absolute inset-0 rounded-full border border-border/40" style={{ animation: "orbit 12s linear infinite" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/40" />
      </div>
      <div className="absolute inset-6 rounded-full border border-border/20" style={{ animation: "orbit 18s linear infinite reverse" }}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/25" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-[10px] tracking-[0.2em] uppercase text-muted/40">Connect</div>
      </div>
    </div>
  );
}

export default function Contact() {
  const reduce = useReducedMotion();
  return (
    <section id="contact" className="py-24 md:py-40 bg-surface/40 relative overflow-hidden">
      <Orbit reduce={reduce} />

      <div className="container-wide relative z-10">
        <div className="max-w-3xl">
          <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <span className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3 block">Contact</span>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05] mb-6" data-cursor="text">
              Let&apos;s build<br />something<br />interesting<span className="text-accent">.</span>
            </h2>
            <p className="text-muted text-base leading-relaxed max-w-lg mb-12" data-cursor="text">
              Currently studying Informatics at Universitas Jenderal Achmad Yani and building with Next.js, programming, and game development.
            </p>
          </motion.div>

          <div className="space-y-1">
            {socials.map((s, i) => (
              <Magnetic key={s.label} strength={0.06}>
                <motion.a href={s.href} target={s.label !== "Email" ? "_blank" : undefined}
                  rel={s.label !== "Email" ? "noopener noreferrer" : undefined}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  data-cursor="link"
                  className="flex items-center justify-between py-5 border-b border-border group hover:border-accent/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <s.icon size={18} className="text-muted group-hover:text-accent transition-colors" />
                    <span className="text-lg md:text-xl font-medium tracking-tight group-hover:text-accent transition-colors">{s.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted hidden sm:block">{s.handle}</span>
                    <ArrowUpRight size={16} className="text-muted group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </motion.a>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
