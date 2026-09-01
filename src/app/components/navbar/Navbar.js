"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Magnetic from "../cursor/Magnetic";

const links = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "JOURNEY", href: "#journey" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3, rootMargin: "-72px 0px 0px 0px" }
    );
    document.querySelectorAll("section[id]").forEach((s) => obs.observe(s));
    window.addEventListener("scroll", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  const go = (href) => { setOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/70 backdrop-blur-2xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between h-14 lg:h-[72px]"
        style={{
          padding: "0 max(20px, env(safe-area-inset-right)) 0 max(20px, env(safe-area-inset-left))",
        }}
      >
        <Magnetic strength={0.2}>
          <a href="#home" data-cursor="link"
            onClick={(e) => { e.preventDefault(); go("#home"); }} className="text-sm font-semibold tracking-[0.2em] uppercase">
            Portfolio<span className="text-accent">.</span>
          </a>
        </Magnetic>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Magnetic key={l.label} strength={0.15}>
              <a
                href={l.href}
                data-cursor="link"
                onClick={(e) => { e.preventDefault(); go(l.href); }}
                className={`text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 relative ${
                  active === l.href.slice(1) ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {l.label}
                {active === l.href.slice(1) && (
                  <motion.span layoutId="nav-indicator" className="absolute -bottom-1 left-0 right-0 h-px bg-accent" />
                )}
              </a>
            </Magnetic>
          ))}
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground" aria-label="Menu" data-cursor="button">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-background/95 backdrop-blur-2xl border-b border-border overflow-hidden"
          >
            <div className="py-5 flex flex-col gap-4"
              style={{ padding: "20px max(20px, env(safe-area-inset-right)) 20px max(20px, env(safe-area-inset-left))" }}
            >
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={(e) => { e.preventDefault(); go(l.href); }}
                  data-cursor="link"
                  className={`text-sm tracking-[0.15em] uppercase ${
                    active === l.href.slice(1) ? "text-foreground" : "text-muted"
                  }`}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
