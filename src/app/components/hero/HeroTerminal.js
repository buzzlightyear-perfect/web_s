"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "motion/react";
import { useCursor } from "../cursor/CursorContext";

const SEQUENCES = [
  { cmd: "whoami", output: [{ text: "Your Name", color: "text-foreground" }] },
  { cmd: "education", output: [{ text: "Informatics", color: "text-cyan-400" }, { text: "Universitas Jenderal Achmad Yani", color: "text-foreground" }] },
  { cmd: "stack", output: [{ text: "Next.js", color: "text-cyan-400" }, { text: "React", color: "text-blue-400" }, { text: "JavaScript", color: "text-violet-400" }] },
  { cmd: "interest", output: [{ text: "Game Development", color: "text-violet-400" }, { text: "Programming", color: "text-cyan-400" }] },
  { cmd: "status", output: [{ text: "Currently Learning...", color: "text-green-400" }] },
];

const TYPING_SPEED = 45;
const PAUSE_AFTER_OUTPUT = 1800;
const PAUSE_AFTER_CMD = 400;

function useTypingAnimation(reduce) {
  const [lines, setLines] = useState([]);
  const seqRef = useRef(0);

  useEffect(() => {
    if (reduce) {
      setLines(SEQUENCES.flatMap(s => [
        { text: `$ ${s.cmd}`, isCmd: true },
        ...s.output.map(o => ({ text: `> ${o.text}`, isCmd: false, color: o.color })),
      ]));
      return;
    }

    let timeout;
    let cancelled = false;

    const typeSequence = async () => {
      while (!cancelled) {
        const seq = SEQUENCES[seqRef.current % SEQUENCES.length];
        seqRef.current++;

        let cmdText = "";
        for (let i = 0; i <= seq.cmd.length; i++) {
          if (cancelled) return;
          cmdText = seq.cmd.slice(0, i);
          setLines(prev => {
            const newLines = [...prev];
            if (newLines.length > 0 && newLines[newLines.length - 1]?.isCmd && newLines[newLines.length - 1]?.typing) {
              newLines[newLines.length - 1] = { text: `$ ${cmdText}`, isCmd: true, typing: true };
            } else {
              newLines.push({ text: `$ ${cmdText}`, isCmd: true, typing: true });
            }
            return newLines;
          });
          await new Promise(r => { timeout = setTimeout(r, TYPING_SPEED); });
        }

        await new Promise(r => { timeout = setTimeout(r, PAUSE_AFTER_CMD); });

        setLines(prev => {
          const newLines = [...prev];
          if (newLines.length > 0) {
            newLines[newLines.length - 1] = { ...newLines[newLines.length - 1], typing: false };
          }
          return newLines;
        });

        for (const output of seq.output) {
          if (cancelled) return;
          let text = "";
          for (let i = 0; i <= output.text.length; i++) {
            if (cancelled) return;
            text = output.text.slice(0, i);
            setLines(prev => [...prev.slice(0, -1), { text: `> ${text}`, isCmd: false, typing: i < output.text.length, color: output.color }]);
            await new Promise(r => { timeout = setTimeout(r, 30); });
          }
          await new Promise(r => { timeout = setTimeout(r, 100); });
        }

        await new Promise(r => { timeout = setTimeout(r, PAUSE_AFTER_OUTPUT); });

        setLines(prev => prev.slice(-6));
        await new Promise(r => { timeout = setTimeout(r, 400); });
      }
    };

    typeSequence();
    return () => { cancelled = true; clearTimeout(timeout); };
  }, [reduce]);

  return lines;
}

export default function HeroTerminal({ mouseX, mouseY }) {
  const reduce = useReducedMotion();
  const { isMobile } = useCursor();
  const lines = useTypingAnimation(reduce);
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 20, stiffness: 150 });
  const sy = useSpring(y, { damping: 20, stiffness: 150 });

  const handleMouse = useCallback((e) => {
    if (reduce || isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.04);
    y.set((e.clientY - cy) * 0.04);
  }, [reduce, isMobile, x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={containerRef}
      initial={reduce ? false : { opacity: 0, x: 40, filter: "blur(8px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className="w-full max-w-md relative"
      data-cursor="text"
    >
      {/* Glow border */}
      <div className="absolute -inset-px rounded-xl overflow-hidden">
        <div className="absolute inset-0 rounded-xl"
          style={{ animation: "terminal-glow-border 8s linear infinite" }} />
      </div>

      <div className="relative rounded-xl border border-[rgba(59,130,246,0.2)] bg-surface overflow-hidden font-mono text-[13px] leading-relaxed"
        style={{ boxShadow: "0 0 30px rgba(59,130,246,0.08), 0 4px 40px rgba(0,0,0,0.5)" }}>
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[rgba(59,130,246,0.12)] bg-surface-hi">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[10px] text-muted tracking-wider">terminal</span>
        </div>

        {/* Content */}
        <div className="p-5 space-y-2 min-h-[220px] relative">
          {/* Scan line */}
          {!reduce && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-x-0 h-10"
                style={{
                  background: "linear-gradient(to bottom, transparent, rgba(34,211,238,0.06), rgba(59,130,246,0.04), transparent)",
                  animation: "terminal-scan 8s linear infinite",
                }} />
            </div>
          )}

          {lines.map((line, i) => (
            <div key={`${i}-${line.text}`} className={line.isCmd ? "flex gap-2" : "pl-4"}>
              {line.isCmd && <span className="text-cyan-400 font-semibold">$</span>}
              <span className={line.isCmd ? "text-blue-300" : (line.color || "text-foreground")}>
                {line.text.replace(/^\$ |^> /, "")}
              </span>
              {line.typing && (
                <span className="inline-block w-[7px] h-[15px] align-middle ml-0.5"
                  style={{ backgroundColor: "#22D3EE", animation: "blink 0.9s step-end infinite", boxShadow: "0 0 8px rgba(34,211,238,0.6)" }} />
              )}
            </div>
          ))}

          {lines.length === 0 && (
            <div className="flex gap-2 items-center">
              <span className="text-cyan-400 font-semibold">$</span>
              <span className="inline-block w-[7px] h-[15px]"
                style={{ backgroundColor: "#22D3EE", animation: "blink 0.9s step-end infinite", boxShadow: "0 0 8px rgba(34,211,238,0.6)" }} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
