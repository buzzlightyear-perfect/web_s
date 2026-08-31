"use client";
import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export default function Magnetic({ children, strength = 0.3, className = "", as = "div", ...props }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 20, stiffness: 250, mass: 0.5 });
  const sy = useSpring(y, { damping: 20, stiffness: 250, mass: 0.5 });

  const handleMouse = useCallback((e) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    x.set(dx * strength);
    y.set(dy * strength);
  }, [reduce, strength, x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const Tag = as;

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={className}
      {...props}
    >
      <motion.div style={{ x: sx, y: sy }} className="contents">
        {children}
      </motion.div>
    </Tag>
  );
}
