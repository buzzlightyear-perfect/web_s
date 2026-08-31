"use client";
import { useRef, useEffect } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "motion/react";
import { useCursor } from "../cursor/CursorContext";

const TECH = [
  { name: "Next.js", color: "#F8FAFC", orbit: 0 },
  { name: "React", color: "#22D3EE", orbit: 1 },
  { name: "JavaScript", color: "#FBBF24", orbit: 2 },
  { name: "C#", color: "#A78BFA", orbit: 3 },
  { name: "Unity", color: "#3B82F6", orbit: 4 },
];

function TechBadge({ name, color, reduce }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.2 + Math.random() * 0.4 }}
      className="absolute px-3 py-1.5 rounded-md text-[9px] tracking-[0.15em] uppercase font-medium whitespace-nowrap"
      style={{
        color,
        backgroundColor: "rgba(17,17,19,0.85)",
        border: `1px solid ${color}30`,
        boxShadow: `0 0 12px ${color}15, 0 0 4px ${color}10`,
        backdropFilter: "blur(8px)",
      }}
      data-cursor="link"
    >
      {name}
    </motion.div>
  );
}

export default function HeroOrbit({ reduce, mouseX, mouseY }) {
  const { isMobile } = useCursor();
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const angleRef = useRef(0);
  const orbitParticleAngle = useRef(0);
  const badgesRef = useRef([]);
  const orbitParticleRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 20, stiffness: 100 });
  const sy = useSpring(y, { damping: 20, stiffness: 100 });

  useEffect(() => {
    if (reduce || isMobile) return;
    let running = true;
    const tick = () => {
      if (!running) return;
      const mx = mouseX.get();
      const my = mouseY.get();
      x.set(mx * 0.02);
      y.set(my * 0.02);

      angleRef.current += 0.0008;
      orbitParticleAngle.current += 0.004;
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      TECH.forEach((tech, i) => {
        const badge = badgesRef.current[i];
        if (!badge) return;
        const radius = 110 + tech.orbit * 25;
        const angle = angleRef.current + (i * Math.PI * 2) / TECH.length;
        const bx = cx + Math.cos(angle) * radius;
        const by = cy + Math.sin(angle) * radius;
        badge.style.transform = `translate(${bx - 30}px, ${by - 12}px)`;
      });

      // Orbit particle
      if (orbitParticleRef.current) {
        const radius = 135;
        const px = cx + Math.cos(orbitParticleAngle.current) * radius;
        const py = cy + Math.sin(orbitParticleAngle.current) * radius;
        orbitParticleRef.current.style.transform = `translate(${px - 4}px, ${py - 4}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { running = false; if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [reduce, isMobile, mouseX, mouseY, x, y]);

  return (
    <motion.div
      ref={containerRef}
      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ x: sx, y: sy }}
      className="relative w-[300px] h-[300px] hidden lg:block"
    >
      {/* Inner ring — cyan */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[220px] h-[220px] rounded-full"
          style={{ border: "1px solid rgba(34,211,238,0.2)", animation: "orbit 25s linear infinite" }} />
      </div>
      {/* Outer ring — blue */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[270px] h-[270px] rounded-full"
          style={{ border: "1px solid rgba(59,130,246,0.15)", animation: "orbit 35s linear infinite reverse" }} />
      </div>
      {/* Third ring — violet */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[300px] h-[300px] rounded-full"
          style={{ border: "1px solid rgba(139,92,246,0.08)", animation: "orbit 45s linear infinite" }} />
      </div>

      {/* Orbit particle */}
      {!reduce && (
        <div ref={orbitParticleRef} className="absolute"
          style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#22D3EE",
            boxShadow: "0 0 10px rgba(34,211,238,0.8), 0 0 20px rgba(34,211,238,0.4)",
          }} />
      )}

      {/* NEXT.JS Core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "rgba(17,17,19,0.9)",
              border: "1px solid rgba(59,130,246,0.3)",
              boxShadow: "0 0 20px rgba(59,130,246,0.15), 0 0 40px rgba(59,130,246,0.08)",
            }}>
            <span className="text-[10px] font-bold tracking-wider text-foreground">NEXT.JS</span>
          </div>
          <div className="absolute inset-0 rounded-full"
            style={{
              border: "1px solid rgba(59,130,246,0.25)",
              animation: "pulse-ring 3s ease-in-out infinite",
            }} />
        </div>
      </div>

      {/* Tech badges */}
      {TECH.map((tech, i) => (
        <div
          key={tech.name}
          ref={(el) => { badgesRef.current[i] = el; }}
          className="absolute"
          data-cursor="link"
        >
          <TechBadge name={tech.name} color={tech.color} reduce={reduce} />
        </div>
      ))}
    </motion.div>
  );
}
