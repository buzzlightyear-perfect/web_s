"use client";
import { useRef, useEffect } from "react";
import { useReducedMotion } from "motion/react";
import { useCursor } from "../cursor/CursorContext";

function AmbientShapes({ reduce }) {
  const shapes = [
    { type: "ring", size: 120, x: "15%", y: "20%", dur: 18, delay: 0, opacity: 0.06, color: "rgba(59,130,246,0.3)" },
    { type: "ring", size: 80, x: "75%", y: "65%", dur: 22, delay: 3, opacity: 0.05, color: "rgba(139,92,246,0.3)" },
    { type: "square", size: 40, x: "85%", y: "15%", dur: 15, delay: 1, opacity: 0.05, color: "rgba(34,211,238,0.3)" },
    { type: "dot", size: 6, x: "10%", y: "75%", dur: 12, delay: 2, opacity: 0.15, color: "rgba(59,130,246,0.5)" },
    { type: "line", size: 60, x: "60%", y: "85%", dur: 20, delay: 4, opacity: 0.06, color: "rgba(34,211,238,0.3)" },
    { type: "dot", size: 4, x: "45%", y: "10%", dur: 14, delay: 5, opacity: 0.12, color: "rgba(139,92,246,0.4)" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {shapes.map((s, i) => (
        <div key={i} className="absolute" style={{
          left: s.x, top: s.y, width: s.size, height: s.size, opacity: s.opacity,
          animation: `float-y ${s.dur}s ease-in-out ${s.delay}s infinite`,
        }}>
          {s.type === "ring" && (
            <div className="w-full h-full rounded-full" style={{ border: `1px solid ${s.color}` }} />
          )}
          {s.type === "square" && (
            <div className="w-full h-full rotate-45" style={{ border: `1px solid ${s.color}` }} />
          )}
          {s.type === "dot" && (
            <div className="w-full h-full rounded-full" style={{ backgroundColor: s.color, boxShadow: `0 0 10px ${s.color}` }} />
          )}
          {s.type === "line" && (
            <div className="w-full h-px" style={{ backgroundColor: s.color }} />
          )}
        </div>
      ))}
    </div>
  );
}

function LightBeam({ reduce }) {
  if (reduce) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 bottom-0 w-px"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(34,211,238,0.15), rgba(59,130,246,0.2), rgba(139,92,246,0.15), transparent)",
          animation: "hero-beam 18s ease-in-out infinite",
        }} />
    </div>
  );
}

export default function HeroBackground({ reduce, mouseX, mouseY }) {
  const { isMobile } = useCursor();
  const gridRef = useRef(null);
  const rafRef = useRef(null);
  const gridPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduce || isMobile) return;
    let running = true;
    const tick = () => {
      if (!running) return;
      const mx = mouseX.get();
      const my = mouseY.get();
      gridPos.current.x = mx * 0.015;
      gridPos.current.y = my * 0.015;
      if (gridRef.current) {
        gridRef.current.style.transform = `translate(${gridPos.current.x}px, ${gridPos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { running = false; if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [reduce, isMobile, mouseX, mouseY]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Ambient gradients — vivid */}
      <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full blur-[150px]"
        style={{ backgroundColor: "rgba(59,130,246,0.18)", animation: "drift 25s ease-in-out infinite" }} />
      <div className="absolute bottom-[5%] right-[10%] w-[400px] h-[400px] rounded-full blur-[130px]"
        style={{ backgroundColor: "rgba(139,92,246,0.14)", animation: "drift 30s ease-in-out 8s infinite" }} />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px]"
        style={{ backgroundColor: "rgba(34,211,238,0.10)", animation: "drift 35s ease-in-out 4s infinite" }} />

      {/* Moving grid — visible blue tint */}
      <div ref={gridRef} className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        animation: "hero-grid-diagonal 30s linear infinite",
      }} />

      <AmbientShapes reduce={reduce} />
      <LightBeam reduce={reduce} />
    </div>
  );
}
