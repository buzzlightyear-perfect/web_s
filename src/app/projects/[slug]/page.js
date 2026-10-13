"use client";
import { use } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getProjectBySlug } from "@/data/projects";
import { GithubIcon } from "@/app/components/icons";
import { CursorProvider } from "@/app/components/cursor/CursorContext";
import CustomCursor from "@/app/components/cursor/CustomCursor";

export default function ProjectDetail({ params }) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <CursorProvider>
        <CustomCursor />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} /> Back to Projects
            </Link>
          </div>
        </div>
      </CursorProvider>
    );
  }

  const categoryColor =
    project.category === "GAME"
      ? "rgba(139,92,246,0.15)"
      : project.category === "WEB"
      ? "rgba(37,99,235,0.15)"
      : "rgba(6,182,212,0.15)";

  return (
    <CursorProvider>
      <CustomCursor />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-2xl border-b border-border">
          <div className="flex items-center justify-between h-14 lg:h-[72px] max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-muted hover:text-foreground transition-colors"
              data-cursor="link"
            >
              <ArrowLeft size={14} />
              Back to Projects
            </Link>
            <span className="text-sm font-semibold tracking-[0.2em] uppercase">
              BHASKORO<span className="text-accent">.</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <main className="pt-24 pb-16 lg:pb-24">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Category */}
              <span className="text-[10px] tracking-[0.25em] uppercase text-accent mb-4 block">
                {project.category}
              </span>

              {/* Title */}
              <h1
                className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.05] mb-4"
                data-cursor="text"
              >
                {project.title}
              </h1>

              {/* Year & Role */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-xs text-muted font-mono">{project.year}</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="text-xs text-muted">{project.role}</span>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[16/9] rounded-2xl border border-border overflow-hidden mb-12"
              data-cursor="image"
              data-cursor-label="VIEW"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${categoryColor} 0%, transparent 60%)`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl md:text-8xl font-mono text-foreground/[0.03] font-bold">
                  {project.title.charAt(0)}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 mb-12"
            >
              <div>
                <h2 className="text-xs font-medium tracking-wider uppercase mb-4 text-muted">
                  Description
                </h2>
                <p className="text-sm text-muted leading-relaxed mb-8">
                  {project.longDescription}
                </p>

                <h2 className="text-xs font-medium tracking-wider uppercase mb-4 text-muted">
                  Problem
                </h2>
                <p className="text-sm text-muted leading-relaxed mb-8">
                  {project.problem}
                </p>

                <h2 className="text-xs font-medium tracking-wider uppercase mb-4 text-muted">
                  Solution
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  {project.solution}
                </p>
              </div>

              <div className="space-y-8">
                {/* Technologies */}
                <div>
                  <h2 className="text-xs font-medium tracking-wider uppercase mb-4 text-muted">
                    Technologies
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 text-[10px] tracking-wider uppercase bg-surface-hi border border-border rounded-md text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Role */}
                <div>
                  <h2 className="text-xs font-medium tracking-wider uppercase mb-4 text-muted">
                    My Role
                  </h2>
                  <p className="text-sm text-muted leading-relaxed">{project.role}</p>
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="button"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-[10px] tracking-wider uppercase border border-border rounded-lg hover:bg-surface-hi transition-colors"
                    >
                      <GithubIcon size={12} /> View Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="button"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-[10px] tracking-wider uppercase bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                    >
                      <ExternalLink size={12} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-border pt-10"
            >
              <h2 className="text-xs font-medium tracking-wider uppercase mb-6 text-muted">
                Key Features
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-3 p-4 rounded-lg border border-border bg-surface/50"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span className="text-sm text-muted leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Back link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-12 text-center"
            >
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-wider uppercase border border-border rounded-lg hover:bg-surface transition-colors"
                data-cursor="button"
              >
                <ArrowLeft size={14} /> All Projects
              </Link>
            </motion.div>
          </div>
        </main>
      </div>
    </CursorProvider>
  );
}
