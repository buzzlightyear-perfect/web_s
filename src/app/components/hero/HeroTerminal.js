"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "motion/react";

const SEQUENCES = [
  { cmd: "whoami", output: [{ text: "Informatics Student", color: "text-cyan-400" }, { text: "Universitas Jenderal Achmad Yani", color: "text-white/60" }] },
  { cmd: "focus", output: [{ text: "Next.js", color: "text-cyan-400" }, { text: "Web Development", color: "text-blue-400" }, { text: "Programming", color: "text-violet-400" }, { text: "Game Development", color: "text-violet-400" }] },
  { cmd: "status", output: [{ text: "Currently Learning...", color: "text-green-400" }] },
];

const TYPING_SPEED = 40;
const PAUSE_AFTER_OUTPUT = 2000;
const PAUSE_AFTER_CMD = 300;

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
            await new Promise(r => { timeout = setTimeout(r, 25); });
          }
          await new Promise(r => { timeout = setTimeout(r, 80); });
        }

        await new Promise(r => { timeout = setTimeout(r, PAUSE_AFTER_OUTPUT); });
        setLines(prev => prev.slice(-8));
        await new Promise(r => { timeout = setTimeout(r, 300); });
      }
    };

    typeSequence();
    return () => { cancelled = true; clearTimeout(timeout); };
  }, [reduce]);

  return lines;
}

export default function HeroTerminal({ mouseX, mouseY }) {
  const reduce = useReducedMotion();
  const lines = useTypingAnimation(reduce);

  return (
    <div className="w-full relative" data-cursor="text">
      <div className="relative rounded-xl border border-[rgba(59,130,246,0.15)] overflow-hidden font-mono text-[12px] leading-relaxed"
        style={{ background: "rgba(17,17,19,0.9)", boxShadow: "0 0 20px rgba(59,130,246,0.05), 0 4px 20px rgba(0,0,0,0.4)" }}>
        {/* Title bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-[rgba(59,130,246,0.1)]" style={{ background: "rgba(24,24,27,0.9)" }}>
          <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
          <span className="w-2 h-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[9px] text-white/30 tracking-wider">terminal</span>
        </div>

        {/* Content */}
        <div className="p-3.5 space-y-1.5 min-h-[140px] relative">
          {/* Scan line */}
          {!reduce && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-x-0 h-8"
                style={{
                  background: "linear-gradient(to bottom, transparent, rgba(34,211,238,0.04), rgba(59,130,246,0.03), transparent)",
                  animation: "terminal-scan 8s linear infinite",
                }} />
            </div>
          )}

          {lines.map((line, i) => (
            <div key={`${i}-${line.text}`} className={line.isCmd ? "flex gap-1.5" : "pl-3"}>
              {line.isCmd && <span className="text-cyan-400 font-semibold">$</span>}
              <span className={line.isCmd ? "text-blue-300" : (line.color || "text-white/70")}>
                {line.text.replace(/^\$ |^> /, "")}
              </span>
              {line.typing && (
                <span className="inline-block w-[6px] h-[13px] align-middle ml-0.5"
                  style={{ backgroundColor: "#22D3EE", animation: "blink 0.9s step-end infinite", boxShadow: "0 0 6px rgba(34,211,238,0.5)" }} />
              )}
            </div>
          ))}

          {lines.length === 0 && (
            <div className="flex gap-1.5 items-center">
              <span className="text-cyan-400 font-semibold">$</span>
              <span className="inline-block w-[6px] h-[13px]"
                style={{ backgroundColor: "#22D3EE", animation: "blink 0.9s step-end infinite", boxShadow: "0 0 6px rgba(34,211,238,0.5)" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
