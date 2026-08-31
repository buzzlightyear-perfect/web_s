import { ROCKET, GAME, DIFFICULTY, ASTEROID, COLLECTIBLE, PARTICLES } from "./gameConstants";

export function createGameState(w, h) {
  return {
    rocket: {
      x: w * 0.15,
      y: h * 0.5,
      vx: 0,
      vy: 0,
      tilt: 0,
      flameFrame: 0,
      invincibleUntil: 0,
    },
    stars: [],
    asteroids: [],
    collectibles: [],
    particles: [],
    score: 0,
    distance: 0,
    energy: GAME.initialEnergy,
    alive: true,
    paused: false,
    started: false,
    boosting: false,
    boostEnd: 0,
    boostCooldownEnd: 0,
    lastAsteroidTime: 0,
    lastCollectibleTime: 0,
    elapsed: 0,
    difficulty: 0,
    screenShake: 0,
    w,
    h,
  };
}

export function initStars(state) {
  state.stars = [];
  const { w, h } = state;
  const layers = [
    { count: 60, speed: 30, sizeMin: 0.3, sizeMax: 1, opacity: 0.4 },
    { count: 35, speed: 70, sizeMin: 0.8, sizeMax: 1.8, opacity: 0.6 },
    { count: 15, speed: 130, sizeMin: 1.5, sizeMax: 2.5, opacity: 0.85 },
  ];
  layers.forEach((layer, li) => {
    for (let i = 0; i < layer.count; i++) {
      state.stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: layer.sizeMin + Math.random() * (layer.sizeMax - layer.sizeMin),
        speed: layer.speed,
        opacity: layer.opacity * (0.6 + Math.random() * 0.4),
        layer: li,
      });
    }
  });
}

function spawnAsteroid(state) {
  const { w, h, difficulty } = state;
  const speedMul = 1 + difficulty * DIFFICULTY.speedRamp;
  const size = ASTEROID.sizeMin + Math.random() * (ASTEROID.sizeMax - ASTEROID.sizeMin);
  const verts = Math.floor(ASTEROID.verticesMin + Math.random() * (ASTEROID.verticesMax - ASTEROID.verticesMin));
  const points = [];
  for (let i = 0; i < verts; i++) {
    const angle = (i / verts) * Math.PI * 2;
    const r = size * (0.7 + Math.random() * ASTEROID.jaggedness);
    points.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
  }
  state.asteroids.push({
    x: w + size + Math.random() * 60,
    y: Math.random() * h,
    vx: -(ASTEROID.speedMin + Math.random() * (ASTEROID.speedMax - ASTEROID.speedMin)) * speedMul,
    vy: (Math.random() - 0.5) * 40,
    size,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 2,
    points,
    glow: Math.random() > 0.7,
  });
}

function spawnCollectible(state) {
  const { w, h } = state;
  state.collectibles.push({
    x: w + 30,
    y: 40 + Math.random() * (h - 80),
    vx: -COLLECTIBLE.speed,
    vy: 0,
    size: COLLECTIBLE.size,
    pulse: Math.random() * Math.PI * 2,
    type: Math.random() > 0.6 ? "energy" : "star",
  });
}

function spawnTrailParticle(state) {
  const r = state.rocket;
  if (state.particles.length >= PARTICLES.maxTrail + PARTICLES.maxExplosion + PARTICLES.maxCollect + PARTICLES.maxBoost) return;
  const speed = Math.sqrt(r.vx * r.vx + r.vy * r.vy);
  const intensity = Math.min(speed / 200, 1);
  state.particles.push({
    x: r.x - 10 + (Math.random() - 0.5) * 6,
    y: r.y + 16 + Math.random() * 4,
    vx: -40 - Math.random() * 30 - intensity * 30,
    vy: (Math.random() - 0.5) * 20,
    life: 1,
    decay: 1.5 + Math.random() * 1,
    size: 1.5 + intensity * 2 + Math.random() * 1.5,
    color: state.boosting ? "cyan" : "blue",
    type: "trail",
  });
}

function spawnExplosion(state, x, y, count) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 50 + Math.random() * 150;
    state.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 1 + Math.random() * 1.5,
      size: 2 + Math.random() * 3,
      color: Math.random() > 0.5 ? "cyan" : Math.random() > 0.5 ? "white" : "violet",
      type: "explosion",
    });
  }
}

function spawnCollectEffect(state, x, y) {
  for (let i = 0; i < PARTICLES.maxCollect; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 30 + Math.random() * 80;
    state.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 2 + Math.random(),
      size: 1.5 + Math.random() * 2,
      color: "gold",
      type: "collect",
    });
  }
}

function spawnBoostParticles(state) {
  const r = state.rocket;
  for (let i = 0; i < 2; i++) {
    state.particles.push({
      x: r.x - 12 + (Math.random() - 0.5) * 8,
      y: r.y + 18 + Math.random() * 6,
      vx: -100 - Math.random() * 80,
      vy: (Math.random() - 0.5) * 40,
      life: 1,
      decay: 1.2 + Math.random(),
      size: 2 + Math.random() * 3,
      color: "cyan",
      type: "boost",
    });
  }
}

function circleCollision(ax, ay, ar, bx, by, br) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy < (ar + br) * (ar + br);
}

export function update(state, dt, keys, now) {
  if (!state.alive || state.paused || !state.started) return state;

  const { rocket: r, w, h } = state;
  const boostActive = state.boosting && now < state.boostEnd;
  const speedMul = boostActive ? ROCKET.boostMultiplier : 1;

  // Input
  let ax = 0, ay = 0;
  if (keys.left) ax -= ROCKET.acceleration;
  if (keys.right) ax += ROCKET.acceleration;
  if (keys.up) ay -= ROCKET.acceleration;
  if (keys.down) ay += ROCKET.acceleration;

  // Mouse fallback
  if (keys.mouseX !== undefined && keys.mouseY !== undefined && ax === 0 && ay === 0) {
    const dx = keys.mouseX - r.x;
    const dy = keys.mouseY - r.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 10) {
      ax = (dx / dist) * ROCKET.acceleration * 0.5;
      ay = (dy / dist) * ROCKET.acceleration * 0.5;
    }
  }

  r.vx += ax * dt;
  r.vy += ay * dt;
  r.vx *= ROCKET.friction;
  r.vy *= ROCKET.friction;

  const maxSpeed = ROCKET.speed * speedMul;
  const spd = Math.sqrt(r.vx * r.vx + r.vy * r.vy);
  if (spd > maxSpeed) {
    r.vx = (r.vx / spd) * maxSpeed;
    r.vy = (r.vy / spd) * maxSpeed;
  }

  r.x += r.vx * dt;
  r.y += r.vy * dt;

  // Bounds
  const margin = 20;
  r.x = Math.max(margin, Math.min(w - margin, r.x));
  r.y = Math.max(margin, Math.min(h - margin, r.y));

  // Tilt
  const targetTilt = (r.vy / maxSpeed) * 0.3;
  r.tilt += (targetTilt - r.tilt) * 0.1;

  // Flame
  r.flameFrame += dt * 15;

  // Difficulty
  state.elapsed += dt;
  state.difficulty = Math.min(state.elapsed / 50, 1);

  // Score
  state.score += GAME.scorePerSecond * dt * (1 + state.difficulty * 0.5);
  state.distance += GAME.distanceMultiplier * dt * 100 * (1 + state.difficulty * 0.3);

  // Energy
  state.energy -= GAME.energyDrain * dt * (1 + state.difficulty * 0.3);
  if (state.energy <= 0) {
    state.energy = 0;
    state.alive = false;
    spawnExplosion(state, r.x, r.y, PARTICLES.maxExplosion);
    state.screenShake = 0.4;
    return state;
  }

  // Boost
  if (state.boosting && now >= state.boostEnd) {
    state.boosting = false;
  }

  // Spawn asteroids
  const asteroidInterval = Math.max(
    DIFFICULTY.asteroidMinInterval,
    DIFFICULTY.asteroidBaseInterval - state.difficulty * 800
  );
  if (now - state.lastAsteroidTime > asteroidInterval) {
    spawnAsteroid(state);
    state.lastAsteroidTime = now;
  }

  // Spawn collectibles
  const collectInterval = Math.max(
    DIFFICULTY.collectibleMinInterval,
    DIFFICULTY.collectibleBaseInterval - state.difficulty * 1500
  );
  if (now - state.lastCollectibleTime > collectInterval) {
    spawnCollectible(state);
    state.lastCollectibleTime = now;
  }

  // Update stars
  const starSpeed = boostActive ? 2.5 : 1;
  for (const star of state.stars) {
    star.x -= star.speed * dt * starSpeed;
    if (star.x < -5) {
      star.x = w + 5;
      star.y = Math.random() * h;
    }
  }

  // Update asteroids
  for (let i = state.asteroids.length - 1; i >= 0; i--) {
    const a = state.asteroids[i];
    a.x += a.vx * dt * starSpeed;
    a.y += a.vy * dt;
    a.rotation += a.rotSpeed * dt;
    if (a.x < -a.size * 2) {
      state.asteroids.splice(i, 1);
      continue;
    }
    // Collision with rocket
    if (r.invincibleUntil < now && circleCollision(r.x, r.y, 12, a.x, a.y, a.size * 0.7)) {
      state.alive = false;
      spawnExplosion(state, r.x, r.y, PARTICLES.maxExplosion);
      spawnExplosion(state, a.x, a.y, 15);
      state.screenShake = 0.5;
    }
  }

  // Update collectibles
  for (let i = state.collectibles.length - 1; i >= 0; i--) {
    const c = state.collectibles[i];
    c.x += c.vx * dt * starSpeed;
    c.pulse += dt * 4;
    if (c.x < -30) {
      state.collectibles.splice(i, 1);
      continue;
    }
    if (circleCollision(r.x, r.y, 14, c.x, c.y, c.size + 6)) {
      if (c.type === "energy") {
        state.energy = Math.min(GAME.initialEnergy, state.energy + GAME.energyPerCollect);
      }
      state.score += 50;
      spawnCollectEffect(state, c.x, c.y);
      state.collectibles.splice(i, 1);
    }
  }

  // Update particles
  for (let i = state.particles.length - 1; i >= 0; i--) {
    const p = state.particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.life -= p.decay * dt;
    if (p.life <= 0) {
      state.particles.splice(i, 1);
    }
  }

  // Trail particles
  if (spd > 20 || boostActive) {
    spawnTrailParticle(state);
  }
  if (boostActive) {
    spawnBoostParticles(state);
  }

  // Screen shake
  if (state.screenShake > 0) {
    state.screenShake -= dt * 2;
    if (state.screenShake < 0) state.screenShake = 0;
  }

  return state;
}

export function activateBoost(state, now) {
  if (state.boosting || now < state.boostCooldownEnd || !state.alive) return;
  state.boosting = true;
  state.boostEnd = now + ROCKET.boostDuration;
  state.boostCooldownEnd = now + ROCKET.boostDuration + ROCKET.boostCooldown;
}

export function resetState(state, w, h) {
  const fresh = createGameState(w, h);
  Object.assign(state, fresh);
  initStars(state);
  state.started = true;
  state.alive = true;
  state.lastAsteroidTime = performance.now();
  state.lastCollectibleTime = performance.now();
}
