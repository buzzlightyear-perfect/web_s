"use client";
import { createContext, useContext, useRef, useCallback, useEffect, useState } from "react";
import { useMotionValue } from "motion/react";

const CursorContext = createContext(null);

export function useCursor() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorState = useRef({ state: "default", label: "" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const onMouseMove = useCallback((e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  const setCursorState = useCallback((state, label = "") => {
    cursorState.current = { state, label };
    document.documentElement.setAttribute("data-cursor", state);
    if (label) {
      document.documentElement.setAttribute("data-cursor-label", label);
    } else {
      document.documentElement.removeAttribute("data-cursor-label");
    }
  }, []);

  return (
    <CursorContext.Provider value={{ mouseX, mouseY, setCursorState, cursorState, isMobile }}>
      <div onMouseMove={!isMobile ? onMouseMove : undefined} className="contents">
        {children}
      </div>
    </CursorContext.Provider>
  );
}
