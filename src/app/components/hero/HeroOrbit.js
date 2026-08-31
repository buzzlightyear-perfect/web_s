"use client";
import { useRef, useEffect } from "react";
import { useReducedMotion } from "motion/react";

const TECH = [
  { name: "Next.js", color: "#F8FAFC", orbit: 0 },
  { name: "React", color: "#22D3EE", orbit: 1 },
  { name: "JavaScript", color: "#FBBF24", orbit: 2 },
  { name: "C#", color: "#A78BFA", orbit: 3 },
  { name: "Unity", color: "#3B82F6", orbit: 4 },
];

export default function HeroOrbit({ reduce, mouseX, mouseY }) {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const angleRef = useRef(0);
  const orbitParticleAngle = useRef(0);
  const badgesRef = useRef([]);
  const orbitParticleRef = useRef(null);

  useEffect(() => {
    if (reduce) return;
    let running = true;
    const tick = () => {
      if (!running) return;
      angleRef.current += 0.0008;
      orbitParticleAngle.current += 0.005;
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      TECH.forEach((tech, i) => {
        const badge = badgesRef.current[i];
        if (!badge) return;
        const radius = 80 + tech.orbit * 16;
        const angle = angleRef.current + (i * Math.PI * 2) / TECH.length;
        const bx = cx + Math.cos(angle) * radius;
        const by = cy + Math.sin(angle) * radius;
        badge.style.transform = `translate(${bx - 24}px, ${by - 9}px)`;
      });

      if (orbitParticleRef.current) {
        const radius = 95;
        const px = cx + Math.cos(orbitParticleAngle.current) * radius;
        const py = cy + Math.sin(orbitParticleAngle.current) * radius;
        orbitParticleRef.current.style.transform = `translate(${px - 3}px, ${py - 3}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { running = false; if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [reduce]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[200px] rounded-xl border border-white/[0.06] overflow-hidden"
      style={{ background: "rgba(17,17,19,0.9)", boxShadow: "0 0 15px rgba(59,130,246,0.04)" }}
    >
      {/* Title */}
      <div className="absolute top-2.5 left-3 z-10">
        <span className="text-[8px] tracking-[0.2em] uppercase text-white/25 font-mono">Tech Orbit</span>
      </div>

      {/* Inner ring — cyan */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[140px] h-[140px] rounded-full"
          style={{ border: "1px solid rgba(34,211,238,0.12)", animation: "orbit 25s linear infinite" }} />
      </div>
      {/* Outer ring — blue */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[180px] h-[180px] rounded-full"
          style={{ border: "1px solid rgba(59,130,246,0.08)", animation: "orbit 35s linear infinite reverse" }} />
      </div>

      {/* Orbit particle */}
      {!reduce && (
        <div ref={orbitParticleRef} className="absolute"
          style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#22D3EE",
            boxShadow: "0 0 8px rgba(34,211,238,0.7), 0 0 16px rgba(34,211,238,0.3)",
          }} />
      )}

      {/* NEXT.JS Core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(17,17,19,0.9)",
              border: "1px solid rgba(59,130,246,0.25)",
              boxShadow: "0 0 15px rgba(59,130,246,0.1)",
            }}>
            <span className="text-[7px] font-bold tracking-wider text-white/80">NEXT.JS</span>
          </div>
          <div className="absolute inset-0 rounded-full"
            style={{
              border: "1px solid rgba(59,130,246,0.2)",
              animation: "pulse-ring 3s ease-in-out infinite",
            }} />
        </div>
      </div>

      {/* Tech badges */}
      {TECH.map((tech, i) => (
        <div key={tech.name} ref={(el) => { badgesRef.current[i] = el; }} className="absolute" data-cursor="link">
          <div className="px-2 py-1 rounded text-[7px] tracking-[0.12em] uppercase font-medium whitespace-nowrap"
            style={{
              color: tech.color,
              background: "rgba(17,17,19,0.85)",
              border: `1px solid ${tech.color}25`,
              boxShadow: `0 0 8px ${tech.color}10`,
              backdropFilter: "blur(6px)",
            }}>
            {tech.name}
          </div>
        </div>
      ))}
    </div>
  );
}
