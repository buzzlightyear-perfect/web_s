export const COLORS = {
  bg: "#050510",
  blue: "#3B82F6",
  cyan: "#22D3EE",
  violet: "#8B5CF6",
  white: "#F8FAFC",
  gold: "#FBBF24",
  red: "#EF4444",
  green: "#4ADE80",
};

export const ROCKET = {
  width: 28,
  height: 40,
  speed: 320,
  acceleration: 1800,
  friction: 0.88,
  boostMultiplier: 2.2,
  boostDuration: 2000,
  boostCooldown: 4000,
  invincibleTime: 1500,
};

export const GAME = {
  initialEnergy: 100,
  energyDrain: 2.5,
  energyPerCollect: 15,
  scorePerSecond: 10,
  distanceMultiplier: 0.5,
};

export const DIFFICULTY = {
  easyEnd: 10,
  mediumEnd: 25,
  hardEnd: 45,
  asteroidBaseInterval: 1400,
  asteroidMinInterval: 400,
  collectibleBaseInterval: 3000,
  collectibleMinInterval: 1200,
  speedRamp: 0.08,
};

export const STARS = {
  layers: [
    { count: 60, speed: 30, sizeMin: 0.3, sizeMax: 1, opacity: 0.4 },
    { count: 35, speed: 70, sizeMin: 0.8, sizeMax: 1.8, opacity: 0.6 },
    { count: 15, speed: 130, sizeMin: 1.5, sizeMax: 2.5, opacity: 0.85 },
  ],
};

export const ASTEROID = {
  sizeMin: 15,
  sizeMax: 45,
  speedMin: 80,
  speedMax: 220,
  verticesMin: 7,
  verticesMax: 12,
  jaggedness: 0.35,
};

export const COLLECTIBLE = {
  size: 10,
  speed: 100,
  glowRadius: 18,
};

export const PARTICLES = {
  maxTrail: 30,
  maxExplosion: 40,
  maxCollect: 12,
  maxBoost: 20,
};
