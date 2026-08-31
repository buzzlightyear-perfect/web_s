"use client";
import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, animate } from "motion/react";
import { useCursor } from "./CursorContext";

const TRAIL_MAX = 8;
const TRAIL_INTERVAL = 50;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function CustomCursor() {
  const { mouseX, mouseY, isMobile } = useCursor();
  const reduce = useReducedMotion();

  const innerRef = useRef(null);
  const outerRef = useRef(null);
  const spotlightRef = useRef(null);
  const trailContainerRef = useRef(null);
  const trailElsRef = useRef([]);
  const rafRef = useRef(null);
  const velocityRef = useRef({ x: 0, y: 0, speed: 0, angle: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const prevPos = useRef({ x: 0, y: 0, time: 0 });
  const trailRef = useRef({ dots: [], lastTime: 0 });
  const visibleRef = useRef(false);

  const scaleOuter = useMotionValue(1);
  const scaleOuterSpring = useSpring(scaleOuter, { damping: 20, stiffness: 300 });
  const stretchX = useMotionValue(1);
  const stretchY = useMotionValue(1);
  const stretchXS = useSpring(stretchX, { damping: 15, stiffness: 200 });
  const stretchYS = useSpring(stretchY, { damping: 15, stiffness: 200 });

  const createTrailDot = useCallback((x, y, speed) => {
    const now = performance.now();
    if (now - trailRef.current.lastTime < TRAIL_INTERVAL) return;
    trailRef.current.lastTime = now;

    if (trailRef.current.dots.length >= TRAIL_MAX) {
      const oldest = trailRef.current.dots.shift();
      if (oldest.el) oldest.el.style.opacity = "0";
    }

    const el = document.createElement("div");
    el.className = "cursor-trail-dot";
    const size = Math.min(4 + speed * 0.04, 8);
    el.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;opacity:0.8;transform:translate(-50%,-50%) scale(1);`;
    trailContainerRef.current?.appendChild(el);

    const dot = { el, born: now };
    trailRef.current.dots.push(dot);

    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      el.style.opacity = "0";
      el.style.transform = "translate(-50%,-50%) scale(0.2)";
    });

    setTimeout(() => {
      el.remove();
      trailRef.current.dots = trailRef.current.dots.filter((d) => d.el !== el);
    }, 700);
  }, []);

  useEffect(() => {
    if (isMobile || reduce) return;

    let running = true;

    const tick = () => {
      if (!running) return;
      const mx = mouseX.get();
      const my = mouseY.get();
      const now = performance.now();

      const dt = Math.max(now - prevPos.current.time, 1);
      const dx = mx - prevPos.current.x;
      const dy = my - prevPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt * 16;

      velocityRef.current.speed = lerp(velocityRef.current.speed, speed, 0.15);
      if (speed > 0.5) {
        velocityRef.current.angle = Math.atan2(dy, dx);
      }

      prevPos.current = { x: mx, y: my, time: now };

      // Inner dot — follows instantly
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }

      // Outer ring — spring follow
      const springFactor = 0.12;
      outerPos.current.x = lerp(outerPos.current.x, mx, springFactor);
      outerPos.current.y = lerp(outerPos.current.y, my, springFactor);

      // Velocity stretch
      const spd = velocityRef.current.speed;
      const stretchAmount = Math.min(spd / 30, 1);
      const angle = velocityRef.current.angle;
      const sx = 1 + stretchAmount * 0.4 * Math.abs(Math.cos(angle));
      const sy = 1 + stretchAmount * 0.4 * Math.abs(Math.sin(angle));
      stretchX.set(sx);
      stretchY.set(sy);

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%) scaleX(${sx}) scaleY(${sy}) rotate(${angle}rad)`;
      }

      // Spotlight
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }

      // Trail
      if (spd > 8) {
        createTrailDot(mx, my, spd);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const show = () => { visibleRef.current = true; document.documentElement.classList.add("cursor-visible"); };
    const hide = () => { visibleRef.current = false; document.documentElement.classList.remove("cursor-visible"); };
    window.addEventListener("mouseenter", show);
    window.addEventListener("mouseleave", hide);
    show();

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mouseenter", show);
      window.removeEventListener("mouseleave", hide);
      document.documentElement.classList.remove("cursor-visible");
    };
  }, [isMobile, reduce, mouseX, mouseY, createTrailDot, stretchX, stretchY]);

  // Cursor state hover effects
  useEffect(() => {
    if (isMobile || reduce) return;

    let currentTarget = null;

    const onOver = (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el && el !== currentTarget) {
        currentTarget = el;
        const state = el.getAttribute("data-cursor");
        const label = el.getAttribute("data-cursor-label") || "";
        document.documentElement.setAttribute("data-cursor", state);
        if (label) {
          document.documentElement.setAttribute("data-cursor-label", label);
        } else {
          document.documentElement.removeAttribute("data-cursor-label");
        }
        scaleOuter.set(getCursorScale(state));
      }
    };
    const onOut = (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el) {
        // Check if relatedTarget is still inside the same [data-cursor] element
        const related = e.relatedTarget?.closest?.("[data-cursor]");
        if (related === el) return; // Still inside the same element
        currentTarget = null;
        document.documentElement.setAttribute("data-cursor", "default");
        document.documentElement.removeAttribute("data-cursor-label");
        scaleOuter.set(1);
      }
    };

    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);
    return () => {
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
    };
  }, [isMobile, reduce, scaleOuter]);

  if (isMobile || reduce) return null;

  return (
    <>
      <div ref={trailContainerRef} className="fixed inset-0 pointer-events-none z-[9998]" />
      <div ref={innerRef} className="cursor-inner" />
      <div ref={outerRef} className="cursor-outer" style={{ transform: "translate(-50%, -50%)" }} />
      <div ref={spotlightRef} className="cursor-spotlight" />
    </>
  );
}

function getCursorScale(state) {
  switch (state) {
    case "link": return 1.8;
    case "button": return 2.2;
    case "project": return 2.8;
    case "image": return 2.5;
    case "text": return 1.5;
    case "drag": return 2;
    default: return 1;
  }
}
