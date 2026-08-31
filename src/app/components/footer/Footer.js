"use client";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "../icons";

const socials = [
  { label: "GitHub", href: "https://github.com/yourusername", icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourusername", icon: LinkedinIcon },
  { label: "Instagram", href: "https://instagram.com/yourusername", icon: InstagramIcon },
];

export default function Footer() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <footer className="py-10 border-t border-border relative">
      {/* Animated line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border overflow-hidden">
        <div className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-accent/30 to-transparent"
          style={{ animation: "glow-travel 5s linear infinite" }} />
      </div>

      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-sm font-semibold tracking-tight">Your Name</div>
            <div className="text-[9px] tracking-[0.2em] uppercase text-muted mt-1">Informatics Student & Developer</div>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} data-cursor="link"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-foreground/30 transition-all duration-300">
                <s.icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-muted">&copy; {new Date().getFullYear()} Your Name</p>
          <motion.button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} data-cursor="button"
            initial={false} animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }}
            className="flex items-center gap-1.5 text-[10px] text-muted hover:text-foreground transition-colors" aria-label="Back to top">
            Back to top <ArrowUp size={12} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
