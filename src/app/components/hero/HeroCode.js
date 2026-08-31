"use client";
import { useMemo } from "react";
import { useReducedMotion } from "motion/react";

const CODE_SYMBOLS = [
  { text: "</>", x: "8%", y: "25%", dur: 11, delay: 0, size: "text-sm", color: "#22D3EE" },
  { text: "{ }", x: "88%", y: "35%", dur: 14, delay: 2, size: "text-xs", color: "#3B82F6" },
  { text: "[ ]", x: "15%", y: "70%", dur: 12, delay: 1, size: "text-sm", color: "#8B5CF6" },
  { text: "( )", x: "78%", y: "78%", dur: 16, delay: 3, size: "text-xs", color: "#22D3EE" },
  { text: "=>", x: "92%", y: "18%", dur: 10, delay: 4, size: "text-xs", color: "#F8FAFC" },
  { text: "&&", x: "5%", y: "50%", dur: 13, delay: 2.5, size: "text-xs", color: "#3B82F6" },
  { text: "01", x: "70%", y: "12%", dur: 15, delay: 1.5, size: "text-sm", color: "#8B5CF6" },
  { text: "101", x: "25%", y: "88%", dur: 11, delay: 3.5, size: "text-xs", color: "#22D3EE" },
  { text: "const", x: "82%", y: "55%", dur: 17, delay: 0.5, size: "text-[10px]", color: "#3B82F6" },
  { text: "import", x: "12%", y: "40%", dur: 13, delay: 4.5, size: "text-[10px]", color: "#22D3EE" },
  { text: "return", x: "65%", y: "85%", dur: 14, delay: 2, size: "text-[10px]", color: "#8B5CF6" },
  { text: "fn()", x: "35%", y: "15%", dur: 12, delay: 5, size: "text-xs", color: "#F8FAFC" },
];

export default function HeroCode({ reduce }) {
  const symbols = useMemo(() => CODE_SYMBOLS, []);

  if (reduce) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {symbols.map((s, i) => (
        <div
          key={i}
          className="absolute font-mono"
          style={{
            left: s.x, top: s.y,
            color: s.color,
            opacity: 0.25,
            textShadow: `0 0 8px ${s.color}40`,
            animation: `float-y ${s.dur}s ease-in-out ${s.delay}s infinite, hero-code-drift ${s.dur * 1.3}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          <span className={s.size}>{s.text}</span>
        </div>
      ))}
    </div>
  );
}
