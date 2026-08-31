"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import GameCanvas from "./GameCanvas";
import { createGameState, initStars, update, activateBoost, resetState } from "./gameLogic";

function MobileControls({ onKey, onBoost }) {
  const handle = (key, down) => (e) => {
    e.preventDefault();
    onKey(key, down);
  };
  return (
    <div className="absolute bottom-3 left-0 right-0 flex justify-between items-end px-3 pointer-events-none z-20 md:hidden">
      <div className="pointer-events-auto grid grid-cols-3 gap-1">
        <div />
        <button onTouchStart={handle("up", true)} onTouchEnd={handle("up", false)}
          className="w-11 h-11 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white/60 text-base active:bg-white/[0.15]">▲</button>
        <div />
        <button onTouchStart={handle("left", true)} onTouchEnd={handle("left", false)}
          className="w-11 h-11 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white/60 text-base active:bg-white/[0.15]">◀</button>
        <div className="w-11 h-11" />
        <button onTouchStart={handle("right", true)} onTouchEnd={handle("right", false)}
          className="w-11 h-11 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white/60 text-base active:bg-white/[0.15]">▶</button>
        <div />
        <button onTouchStart={handle("down", true)} onTouchEnd={handle("down", false)}
          className="w-11 h-11 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white/60 text-base active:bg-white/[0.15]">▼</button>
        <div />
      </div>
      <button onTouchStart={onBoost}
        className="pointer-events-auto w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 text-[9px] font-bold tracking-wider active:bg-cyan-500/30">
        BOOST
      </button>
    </div>
  );
}

function HUD({ score, distance, energy, boosting, boostReady }) {
  return (
    <div className="absolute top-0 left-0 right-0 px-3 pt-3 pb-2 flex items-start justify-between pointer-events-none z-10">
      {/* Left — Score */}
      <div>
        <div className="font-mono text-[8px] tracking-[0.2em] text-white/30">SCORE</div>
        <div className="font-mono text-base md:text-lg font-bold text-white/90 tabular-nums" style={{ textShadow: "0 0 8px rgba(34,211,238,0.3)" }}>
          {String(Math.floor(score)).padStart(6, "0")}
        </div>
      </div>
      {/* Center — Distance */}
      <div className="text-center">
        <div className="font-mono text-[8px] tracking-[0.2em] text-white/30">DISTANCE</div>
        <div className="font-mono text-xs text-white/60 tabular-nums">{Math.floor(distance)} M</div>
      </div>
      {/* Right — Energy + Boost */}
      <div className="text-right">
        <div className="font-mono text-[8px] tracking-[0.2em] text-white/30">ENERGY</div>
        <div className="w-20 md:w-28 h-1.5 rounded-full bg-white/[0.08] overflow-hidden mb-1">
          <div className="h-full rounded-full transition-all duration-300" style={{
            width: `${energy}%`,
            background: energy > 50 ? "linear-gradient(90deg, #22D3EE, #3B82F6)" : energy > 25 ? "linear-gradient(90deg, #FBBF24, #F59E0B)" : "linear-gradient(90deg, #EF4444, #DC2626)",
            boxShadow: energy > 50 ? "0 0 6px rgba(34,211,238,0.4)" : energy > 25 ? "0 0 6px rgba(251,191,36,0.4)" : "0 0 6px rgba(239,68,68,0.4)",
          }} />
        </div>
        <div className="font-mono text-[8px] tracking-wider">
          {boosting ? <span className="text-cyan-400">BOOSTING</span> : !boostReady ? <span className="text-white/25">COOLDOWN</span> : <span className="text-white/35">BOOST READY</span>}
        </div>
      </div>
    </div>
  );
}

function GameHeader({ playing }) {
  return (
    <div className="absolute top-0 left-0 right-0 px-3 pt-2 pb-1 flex items-center justify-between pointer-events-none z-10">
      <div className="flex items-center gap-2">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-cyan-400">
          <path d="M12 2L8 10H3L7 15L5 22L12 18L19 22L17 15L21 10H16L12 2Z" fill="currentColor" opacity="0.8" />
        </svg>
        <span className="font-mono text-[9px] tracking-[0.2em] text-white/50 font-medium">ROCKET ESCAPE</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: "0 0 4px rgba(74,222,128,0.6)" }} />
        <span className="font-mono text-[8px] tracking-[0.15em] text-green-400/70">GAME ONLINE</span>
      </div>
    </div>
  );
}

function StartScreen({ onPlay }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 z-30 flex items-center justify-center"
    >
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1">
          ROCKET <span style={{ color: "#22D3EE" }}>ESCAPE</span>
        </h3>
        <p className="text-[10px] text-white/35 mb-5 tracking-wider font-mono">SURVIVE THE COSMOS</p>
        <button
          onClick={onPlay}
          data-cursor="button"
          className="px-7 py-2.5 rounded-lg text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300"
          style={{
            border: "1px solid rgba(34,211,238,0.3)",
            background: "rgba(34,211,238,0.08)",
            color: "#22D3EE",
            boxShadow: "0 0 20px rgba(34,211,238,0.1)",
          }}
        >
          PLAY
        </button>
        <div className="mt-5 font-mono text-[8px] text-white/20 tracking-wider space-y-0.5">
          <div>WASD / ARROWS TO MOVE</div>
          <div>SPACE TO BOOST</div>
        </div>
      </div>
    </motion.div>
  );
}

function GameOverScreen({ score, distance, onRestart, onContinue }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="text-center">
        <div className="font-mono text-[9px] tracking-[0.3em] text-red-400/80 mb-2">MISSION FAILED</div>
        <h3 className="text-xl font-bold tracking-tight text-white mb-3">GAME OVER</h3>
        <div className="space-y-1.5 mb-5">
          <div>
            <span className="font-mono text-[9px] text-white/35 tracking-wider">SCORE </span>
            <span className="font-mono text-base font-bold text-white tabular-nums">{String(Math.floor(score)).padStart(6, "0")}</span>
          </div>
          <div>
            <span className="font-mono text-[9px] text-white/35 tracking-wider">DISTANCE </span>
            <span className="font-mono text-xs text-white/60 tabular-nums">{Math.floor(distance)} M</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <button onClick={onRestart} data-cursor="button"
            className="px-5 py-2 rounded-lg text-xs font-medium tracking-[0.15em] uppercase transition-all"
            style={{ border: "1px solid rgba(34,211,238,0.3)", background: "rgba(34,211,238,0.08)", color: "#22D3EE" }}>
            TRY AGAIN
          </button>
          <button onClick={onContinue} data-cursor="button"
            className="px-5 py-2 rounded-lg border border-white/10 text-white/45 text-xs font-medium tracking-[0.15em] uppercase hover:bg-white/[0.04] transition-all">
            CONTINUE EXPLORING
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function PauseScreen({ onResume }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div className="text-center">
        <div className="font-mono text-[9px] tracking-[0.3em] text-white/35 mb-3">PAUSED</div>
        <button onClick={onResume} data-cursor="button"
          className="px-7 py-2.5 rounded-lg border border-white/15 bg-white/[0.05] text-white/70 text-xs font-medium tracking-[0.2em] uppercase hover:bg-white/[0.1] transition-all">
          RESUME
        </button>
      </div>
    </motion.div>
  );
}

export default function RocketGame() {
  const [gameState, setGameState] = useState("idle");
  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [boosting, setBoosting] = useState(false);
  const [boostReady, setBoostReady] = useState(true);

  const containerRef = useRef(null);
  const gameStateRef = useRef(null);
  const keysRef = useRef({ up: false, down: false, left: false, right: false });
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);
  const uiUpdateRef = useRef(0);

  const initGame = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (w === 0 || h === 0) return;
    const state = createGameState(w, h);
    initStars(state);
    gameStateRef.current = state;
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const gameLoop = useCallback((time) => {
    if (!gameStateRef.current) return;
    const state = gameStateRef.current;

    if (state.alive && !state.paused && state.started) {
      const dt = lastTimeRef.current ? Math.min((time - lastTimeRef.current) / 1000, 0.05) : 0.016;
      lastTimeRef.current = time;

      update(state, dt, keysRef.current, performance.now());

      if (!state.alive) {
        setScore(state.score);
        setDistance(state.distance);
        setEnergy(0);
        setGameState("over");
        rafRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      uiUpdateRef.current++;
      if (uiUpdateRef.current % 3 === 0) {
        setScore(state.score);
        setDistance(state.distance);
        setEnergy(state.energy);
        setBoosting(state.boosting && performance.now() < state.boostEnd);
        setBoostReady(!state.boosting && performance.now() >= state.boostCooldownEnd);
      }
    } else {
      lastTimeRef.current = time;
    }

    rafRef.current = requestAnimationFrame(gameLoop);
  }, []);

  useEffect(() => {
    if (gameState === "playing") {
      lastTimeRef.current = 0;
      uiUpdateRef.current = 0;
      rafRef.current = requestAnimationFrame(gameLoop);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [gameState, gameLoop]);

  useEffect(() => {
    const keyMap = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right", w: "up", s: "down", a: "left", d: "right", W: "up", S: "down", A: "left", D: "right" };
    const down = (e) => {
      if (keyMap[e.key]) { e.preventDefault(); keysRef.current[keyMap[e.key]] = true; }
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        if (gameState === "playing" && gameStateRef.current) activateBoost(gameStateRef.current, performance.now());
      }
      if (e.key === "Escape" || e.key === "p" || e.key === "P") {
        if (gameState === "playing") {
          setGameState("paused");
          if (gameStateRef.current) gameStateRef.current.paused = true;
        } else if (gameState === "paused") {
          setGameState("playing");
          if (gameStateRef.current) gameStateRef.current.paused = false;
        }
      }
    };
    const up = (e) => { if (keyMap[e.key]) keysRef.current[keyMap[e.key]] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [gameState]);

  useEffect(() => {
    const h = () => {
      if (document.hidden && gameState === "playing") {
        setGameState("paused");
        if (gameStateRef.current) gameStateRef.current.paused = true;
      }
    };
    document.addEventListener("visibilitychange", h);
    return () => document.removeEventListener("visibilitychange", h);
  }, [gameState]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && gameState === "playing") {
          setGameState("paused");
          if (gameStateRef.current) gameStateRef.current.paused = true;
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(container);
    return () => obs.disconnect();
  }, [gameState]);

  useEffect(() => {
    const resize = () => {
      if (gameStateRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        gameStateRef.current.w = rect.width;
        gameStateRef.current.h = rect.height;
      }
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const handlePlay = useCallback(() => {
    initGame();
    setScore(0); setDistance(0); setEnergy(100); setBoosting(false); setBoostReady(true);
    setGameState("playing");
  }, [initGame]);

  const handleRestart = useCallback(() => {
    if (gameStateRef.current) {
      const state = gameStateRef.current;
      const rect = containerRef.current.getBoundingClientRect();
      resetState(state, rect.width, rect.height);
      setScore(0); setDistance(0); setEnergy(100); setBoosting(false); setBoostReady(true);
      setGameState("playing");
    }
  }, []);

  const handleContinue = useCallback(() => {
    setGameState("idle");
    if (gameStateRef.current) { gameStateRef.current.started = false; gameStateRef.current.alive = false; }
  }, []);

  const handleResume = useCallback(() => {
    if (gameStateRef.current) gameStateRef.current.paused = false;
    setGameState("playing");
  }, []);

  const handleMobileKey = useCallback((key, down) => { keysRef.current[key] = down; }, []);
  const handleMobileBoost = useCallback(() => {
    if (gameStateRef.current) activateBoost(gameStateRef.current, performance.now());
  }, []);

  const isPlaying = gameState === "playing";
  const isPaused = gameState === "paused";
  const isOver = gameState === "over";
  const isIdle = gameState === "idle";

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden" style={{ background: "#050510" }}>
      {/* Canvas — always renders */}
      {gameStateRef.current && <GameCanvas gameStateRef={gameStateRef} boosting={boosting} />}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: isPlaying
          ? "linear-gradient(180deg, rgba(5,5,16,0.35) 0%, transparent 30%, transparent 70%, rgba(5,5,16,0.35) 100%)"
          : "linear-gradient(180deg, rgba(5,5,16,0.6) 0%, rgba(5,5,16,0.3) 40%, rgba(5,5,16,0.6) 100%)",
      }} />

      {/* Game header — always visible */}
      <GameHeader playing={isPlaying} />

      {/* HUD — visible when playing or paused */}
      {(isPlaying || isPaused) && (
        <HUD score={score} distance={distance} energy={energy} boosting={boosting} boostReady={boostReady} />
      )}

      {/* Pause button */}
      {isPlaying && (
        <button onClick={() => { setGameState("paused"); if (gameStateRef.current) gameStateRef.current.paused = true; }}
          data-cursor="button"
          className="absolute top-2 right-3 md:top-3 md:right-4 z-20 w-7 h-7 rounded-md border border-white/10 bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.1] transition-all">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="1" width="3" height="10" rx="0.5"/><rect x="7" y="1" width="3" height="10" rx="0.5"/></svg>
        </button>
      )}

      {/* Mobile controls */}
      {isPlaying && <MobileControls onKey={handleMobileKey} onBoost={handleMobileBoost} />}

      {/* Overlays */}
      <AnimatePresence mode="wait">
        {isIdle && <StartScreen key="start" onPlay={handlePlay} />}
        {isPaused && <PauseScreen key="pause" onResume={handleResume} />}
        {isOver && <GameOverScreen key="over" score={score} distance={distance} onRestart={handleRestart} onContinue={handleContinue} />}
      </AnimatePresence>
    </div>
  );
}
