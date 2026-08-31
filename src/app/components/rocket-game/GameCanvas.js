"use client";
import { useRef, useEffect, useCallback } from "react";
import { COLORS } from "./gameConstants";

const COLOR_MAP = {
  blue: [59, 130, 246],
  cyan: [34, 211, 238],
  violet: [139, 92, 246],
  white: [248, 250, 252],
  gold: [251, 191, 36],
  green: [74, 222, 128],
  red: [239, 68, 68],
};

function drawRocket(ctx, r, now) {
  ctx.save();
  ctx.translate(r.x, r.y);
  ctx.rotate(r.tilt);

  const flicker = 0.8 + Math.sin(r.flameFrame) * 0.2;
  const invincible = r.invincibleUntil > now;
  if (invincible && Math.floor(now / 100) % 2 === 0) {
    ctx.globalAlpha = 0.4;
  }

  // Engine flame
  const flameLen = 12 + flicker * 8 + (r.vx < -50 ? 10 : 0);
  const flameWidth = 4 + flicker * 2;
  const grad = ctx.createLinearGradient(-flameLen, 0, 4, 0);
  grad.addColorStop(0, "rgba(34,211,238,0)");
  grad.addColorStop(0.3, "rgba(34,211,238,0.6)");
  grad.addColorStop(0.6, "rgba(59,130,246,0.8)");
  grad.addColorStop(1, "rgba(248,250,252,0.9)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(4, -flameWidth);
  ctx.lineTo(-flameLen, 0);
  ctx.lineTo(4, flameWidth);
  ctx.closePath();
  ctx.fill();

  // Flame glow
  ctx.shadowColor = COLORS.cyan;
  ctx.shadowBlur = 12;
  ctx.fillStyle = "rgba(34,211,238,0.3)";
  ctx.beginPath();
  ctx.ellipse(-4, 0, flameLen * 0.6, flameWidth * 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Body
  ctx.fillStyle = "#C0C8D4";
  ctx.beginPath();
  ctx.moveTo(14, 0);
  ctx.lineTo(4, -7);
  ctx.lineTo(-10, -6);
  ctx.lineTo(-12, -3);
  ctx.lineTo(-12, 3);
  ctx.lineTo(-10, 6);
  ctx.lineTo(4, 7);
  ctx.closePath();
  ctx.fill();

  // Body highlight
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.beginPath();
  ctx.moveTo(14, 0);
  ctx.lineTo(4, -6);
  ctx.lineTo(-8, -5);
  ctx.lineTo(-8, 0);
  ctx.lineTo(4, 0);
  ctx.closePath();
  ctx.fill();

  // Nose cone
  ctx.fillStyle = COLORS.blue;
  ctx.beginPath();
  ctx.moveTo(18, 0);
  ctx.lineTo(14, -4);
  ctx.lineTo(14, 4);
  ctx.closePath();
  ctx.fill();

  // Window
  ctx.fillStyle = COLORS.cyan;
  ctx.shadowColor = COLORS.cyan;
  ctx.shadowBlur = 6;
  ctx.beginPath();
  ctx.arc(6, 0, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Window inner
  ctx.fillStyle = "rgba(5,5,16,0.6)";
  ctx.beginPath();
  ctx.arc(6.5, -0.5, 1.5, 0, Math.PI * 2);
  ctx.fill();

  // Fins
  ctx.fillStyle = COLORS.blue;
  ctx.beginPath();
  ctx.moveTo(-6, -6);
  ctx.lineTo(-12, -11);
  ctx.lineTo(-10, -6);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-6, 6);
  ctx.lineTo(-12, 11);
  ctx.lineTo(-10, 6);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawAsteroid(ctx, a) {
  ctx.save();
  ctx.translate(a.x, a.y);
  ctx.rotate(a.rotation);

  if (a.glow) {
    ctx.shadowColor = COLORS.violet;
    ctx.shadowBlur = 8;
  }

  ctx.fillStyle = "rgba(40,40,55,0.9)";
  ctx.strokeStyle = "rgba(100,100,130,0.4)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(a.points[0].x, a.points[0].y);
  for (let i = 1; i < a.points.length; i++) {
    ctx.lineTo(a.points[i].x, a.points[i].y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Crack glow
  if (a.glow) {
    ctx.strokeStyle = "rgba(139,92,246,0.25)";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    const p = a.points;
    ctx.moveTo(p[0].x * 0.3, p[0].y * 0.3);
    ctx.lineTo(p[Math.floor(p.length / 2)].x * 0.5, p[Math.floor(p.length / 2)].y * 0.5);
    ctx.stroke();
  }

  ctx.shadowBlur = 0;
  ctx.restore();
}

function drawCollectible(ctx, c, time) {
  ctx.save();
  ctx.translate(c.x, c.y);

  const pulse = 0.8 + Math.sin(c.pulse) * 0.2;
  const glowSize = 18 * pulse;

  if (c.type === "energy") {
    // Energy crystal
    ctx.shadowColor = COLORS.cyan;
    ctx.shadowBlur = glowSize;
    ctx.fillStyle = COLORS.cyan;
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(6, 0);
    ctx.lineTo(0, 8);
    ctx.lineTo(-6, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(3, 0);
    ctx.lineTo(0, 5);
    ctx.lineTo(-3, 0);
    ctx.closePath();
    ctx.fill();
  } else {
    // Star
    ctx.shadowColor = COLORS.gold;
    ctx.shadowBlur = glowSize;
    ctx.fillStyle = COLORS.gold;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const r = i === 0 ? 7 : 7;
      const method = i === 0 ? "moveTo" : "lineTo";
      ctx[method](Math.cos(angle) * r, Math.sin(angle) * r);
      const innerAngle = angle + (2 * Math.PI) / 10;
      ctx.lineTo(Math.cos(innerAngle) * 3, Math.sin(innerAngle) * 3);
    }
    ctx.closePath();
    ctx.fill();
  }

  ctx.shadowBlur = 0;
  ctx.restore();
}

function drawParticle(ctx, p) {
  const [r, g, b] = COLOR_MAP[p.color] || COLOR_MAP.blue;
  const alpha = p.life * 0.8;
  ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
  ctx.shadowColor = `rgba(${r},${g},${b},${alpha * 0.5})`;
  ctx.shadowBlur = p.size * 2;
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

function drawStars(ctx, stars, boosting) {
  for (const star of stars) {
    const alpha = star.opacity;
    ctx.fillStyle = `rgba(200,210,240,${alpha})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    // Speed lines when boosting
    if (boosting && star.layer >= 1) {
      ctx.strokeStyle = `rgba(34,211,238,${alpha * 0.3})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(star.x + 15 + star.layer * 10, star.y);
      ctx.stroke();
    }
  }
}

function drawNebula(ctx, w, h, time) {
  const x1 = w * 0.2 + Math.sin(time * 0.0002) * 50;
  const y1 = h * 0.3 + Math.cos(time * 0.00015) * 40;
  const g1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, 200);
  g1.addColorStop(0, "rgba(59,130,246,0.06)");
  g1.addColorStop(1, "transparent");
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, w, h);

  const x2 = w * 0.7 + Math.sin(time * 0.00018) * 60;
  const y2 = h * 0.7 + Math.cos(time * 0.00022) * 50;
  const g2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, 180);
  g2.addColorStop(0, "rgba(139,92,246,0.04)");
  g2.addColorStop(1, "transparent");
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, w, h);
}

export default function GameCanvas({ gameStateRef, boosting }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const state = gameStateRef.current;
    if (!state) return;
    const { w, h } = state;
    const now = performance.now();

    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, w, h);

    // Nebula
    drawNebula(ctx, w, h, now);

    // Screen shake
    if (state.screenShake > 0) {
      const sx = (Math.random() - 0.5) * state.screenShake * 12;
      const sy = (Math.random() - 0.5) * state.screenShake * 12;
      ctx.save();
      ctx.translate(sx, sy);
    }

    // Stars
    drawStars(ctx, state.stars, state.boosting && now < state.boostEnd);

    // Collectibles
    for (const c of state.collectibles) {
      drawCollectible(ctx, c, now);
    }

    // Asteroids
    for (const a of state.asteroids) {
      drawAsteroid(ctx, a);
    }

    // Particles
    for (const p of state.particles) {
      drawParticle(ctx, p);
    }

    // Rocket
    if (state.alive) {
      drawRocket(ctx, state.rocket, now);
    }

    if (state.screenShake > 0) {
      ctx.restore();
    }

    // Boost overlay
    if (state.boosting && now < state.boostEnd) {
      ctx.fillStyle = "rgba(34,211,238,0.03)";
      ctx.fillRect(0, 0, w, h);
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [gameStateRef]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
