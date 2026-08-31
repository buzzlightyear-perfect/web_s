"use client";
import { useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "motion/react";
import { useCursor } from "../cursor/CursorContext";

const PARTICLE_COUNT_DESKTOP = 30;
const PARTICLE_COUNT_MOBILE = 12;
const NETWORK_NODES = 8;
const CONNECTION_DIST = 160;

const COLORS = [
  { r: 59, g: 130, b: 246 },   // electric blue
  { r: 34, g: 211, b: 238 },   // cyan
  { r: 139, g: 92, b: 246 },   // violet
  { r: 248, g: 250, b: 252 },  // bright white
];

function createParticle(w, h) {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    size: 1 + Math.random() * 2.5,
    baseOpacity: 0.4 + Math.random() * 0.5,
    color,
    glowPhase: Math.random() * Math.PI * 2,
    pulseSpeed: 0.4 + Math.random() * 0.6,
  };
}

function createNode(w, h) {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    size: 2.5 + Math.random() * 2,
    opacity: 0.4 + Math.random() * 0.4,
    color,
  };
}

export default function HeroParticles({ mouseX, mouseY }) {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();
  const { isMobile } = useCursor();
  const rafRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const mx = mouseX.get();
    const my = mouseY.get();
    const time = performance.now() * 0.001;

    ctx.clearRect(0, 0, w, h);

    // Particles
    const particles = canvas._particles;
    for (const p of particles) {
      const dx = p.x - mx;
      const dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 120;
      if (dist < radius && dist > 0) {
        const force = (1 - dist / radius) * 1.0;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }

      p.vx *= 0.96;
      p.vy *= 0.96;
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      // Pulse + glow
      const pulse = 0.5 + 0.5 * Math.sin(time * p.pulseSpeed + p.glowPhase);
      const alpha = p.baseOpacity * (0.6 + pulse * 0.4);
      const { r, g, b } = p.color;

      // Glow halo
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size + 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.2})`;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fill();
    }

    // Network nodes + connections
    const nodes = canvas._nodes;
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;

      const { r, g, b } = n.color;

      // Glow
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.size + 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${n.opacity * 0.15})`;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${n.opacity})`;
      ctx.fill();
    }

    // Connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.2;
          const { r, g, b } = nodes[i].color;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
      canvas._particles = Array.from({ length: count }, () => createParticle(canvas.width, canvas.height));
      canvas._nodes = Array.from({ length: NETWORK_NODES }, () => createNode(canvas.width, canvas.height));
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce, isMobile, draw]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}
