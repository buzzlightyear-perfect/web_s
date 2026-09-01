"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { ExternalLink, X, ArrowRight } from "lucide-react";
import { GithubIcon } from "../icons";
import { projects, categories } from "./projectsData";

function Modal({ project, onClose }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-background/85 backdrop-blur-xl" />
      <motion.div initial={reduce ? false : { opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] lg:max-h-[85vh] overflow-y-auto bg-surface border border-border rounded-2xl">
        <div className="sticky top-0 flex items-center justify-between p-5 border-b border-border bg-surface/90 backdrop-blur-sm z-10">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-accent">{project.category}</span>
            <h3 className="text-lg font-semibold tracking-tight mt-1">{project.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-hi transition-colors" aria-label="Close" data-cursor="button"><X size={18} /></button>
        </div>
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="aspect-video rounded-xl bg-surface-hi border border-border relative overflow-hidden" data-cursor="image" data-cursor-label="VIEW">
            <div className="absolute inset-0 flex items-center justify-center text-muted text-sm">Project Preview</div>
          </div>
          <div>
            <h4 className="text-xs font-medium tracking-wider uppercase mb-2 text-muted">Description</h4>
            <p className="text-sm text-muted leading-relaxed">{project.longDescription}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-medium tracking-wider uppercase mb-2 text-muted">Problem</h4>
              <p className="text-sm text-muted leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium tracking-wider uppercase mb-2 text-muted">Solution</h4>
              <p className="text-sm text-muted leading-relaxed">{project.solution}</p>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium tracking-wider uppercase mb-2 text-muted">Key Features</h4>
            <ul className="space-y-1.5">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted">
                  <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />{f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium tracking-wider uppercase mb-2 text-muted">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span key={t} className="px-3 py-1 text-[10px] tracking-wider uppercase bg-surface-hi border border-border rounded-md text-muted">{t}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" data-cursor="button"
                className="inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-wider uppercase border border-border rounded-md hover:bg-surface-hi transition-colors">
                <GithubIcon size={12} /> View Code
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" data-cursor="button"
                className="inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-wider uppercase bg-accent text-white rounded-md hover:bg-accent/90 transition-colors">
                <ExternalLink size={12} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, i, reduce, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const imageSpotRef = useRef(null);
  const titleRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (reduce) return;
    const card = cardRef.current;
    const spot = imageSpotRef.current;
    const title = titleRef.current;
    if (!card || !spot) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const nx = (x / rect.width) * 100;
    const ny = (y / rect.height) * 100;

    spot.style.opacity = "1";
    spot.style.background = `radial-gradient(circle at ${nx}% ${ny}%, rgba(37,99,235,0.08) 0%, transparent 60%)`;

    if (title) {
      const tx = ((x / rect.width) - 0.5) * 6;
      const ty = ((y / rect.height) - 0.5) * 4;
      title.style.transform = `translate(${tx}px, ${ty}px)`;
    }
  }, [reduce]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    if (imageSpotRef.current) imageSpotRef.current.style.opacity = "0";
    if (titleRef.current) titleRef.current.style.transform = "translate(0, 0)";
  }, []);

  return (
    <motion.article
      ref={cardRef}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      className="group relative border-t border-border pt-8 pb-12 cursor-pointer"
      data-cursor="project"
      data-cursor-label="VIEW"
    >
      <div className="grid md:grid-cols-[1fr_1.5fr] gap-6 lg:gap-8 items-start">
        {/* Left meta */}
        <div ref={titleRef} style={{ transition: "transform 0.3s ease-out" }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] tracking-[0.2em] text-muted font-mono">0{project.id}</span>
            <div className="w-6 h-px bg-border" />
            <span className="text-[10px] tracking-[0.15em] uppercase text-accent">{project.category}</span>
          </div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((t) => (
              <span key={t} className="px-2.5 py-1 text-[9px] tracking-wider uppercase border border-border rounded text-muted">{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted group-hover:text-foreground transition-colors">
            <span className="tracking-wider uppercase">View Project</span>
            <ArrowRight size={12} className={`transition-transform duration-300 ${hovered ? "translate-x-1" : ""}`} />
          </div>
        </div>

        {/* Right visual */}
        <div className="relative aspect-[4/3] rounded-xl border border-border bg-surface overflow-hidden">
          <div className="absolute inset-0" style={{
            background: `linear-gradient(135deg, ${project.category === "GAME" ? "rgba(139,92,246,0.06)" : project.category === "WEB" ? "rgba(37,99,235,0.06)" : "rgba(6,182,212,0.06)"} 0%, transparent 60%)`,
            animation: "drift 20s ease-in-out infinite",
          }} />
          {/* Scan line */}
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" style={{ animation: "scan 6s linear infinite" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-mono text-foreground/[0.04] font-bold">0{project.id}</span>
          </div>
          {/* Spotlight follow */}
          <div ref={imageSpotRef} className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none" />
          {/* Hover zoom */}
          <div className={`absolute inset-0 bg-accent/[0.02] transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"}`} />
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [cat, setCat] = useState("ALL");
  const [selected, setSelected] = useState(null);
  const reduce = useReducedMotion();
  const filtered = cat === "ALL" ? projects : projects.filter((p) => p.category === cat);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32 relative">
      <div className="container-wide">
        <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }} className="mb-12">
          <span className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3 block">Projects</span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] leading-[1.1]">
            Selected<br />work<span className="text-accent">.</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)} data-cursor="button"
              className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase rounded-md border transition-all duration-300 ${
                cat === c ? "bg-foreground text-background border-foreground" : "text-muted border-border hover:border-foreground hover:text-foreground"
              }`}>{c}</button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} i={i} reduce={reduce} onSelect={setSelected} />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected && <Modal project={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
