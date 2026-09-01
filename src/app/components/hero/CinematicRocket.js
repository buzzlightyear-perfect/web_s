"use client";
import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "motion/react";
import * as THREE from "three";

function lerp(a, b, t) { return a + (b - a) * t; }
function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
function clamp01(v) { return Math.max(0, Math.min(1, v)); }

function getDeviceTier() {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  const h = window.innerHeight;
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;
  const dpr = window.devicePixelRatio || 1;
  if (w <= 480) return "small-mobile";
  if (w <= 767) return "mobile";
  if (w <= 1023) return "tablet";
  return "desktop";
}

function StaggerText({ text, progress, startAt, duration, className = "" }) {
  const chars = useMemo(() => text.split(""), [text]);
  const totalChars = chars.length;
  const stagger = 0.04;
  const charDuration = duration * 0.4;

  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => {
        const charStart = startAt + (i / totalChars) * stagger * totalChars;
        const charEnd = charStart + charDuration;
        const localProgress = clamp01((progress - charStart) / (charEnd - charStart));
        const opacity = localProgress;
        const ty = (1 - localProgress) * 30;
        const blur = (1 - localProgress) * 8;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity,
              transform: `translateY(${ty}px)`,
              filter: `blur(${blur}px)`,
              whiteSpace: char === " " ? "pre" : undefined,
              minWidth: char === " " ? "0.3em" : undefined,
            }}
            aria-hidden="true"
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

function StageOverlay({ stage, progress, visible, isMobile }) {
  if (!visible) return null;
  const dur = stage.end - stage.start;
  if (dur <= 0) return null;
  const local = (progress - stage.start) / dur;
  const fadeIn = clamp01(local / 0.2);
  const fadeOut = clamp01((1 - local) / 0.2);
  const opacity = Math.min(fadeIn, fadeOut);
  const ty = (1 - fadeIn) * 20;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
      style={{ opacity, transform: `translateY(${ty}px)` }}
    >
      <div className="text-center px-4">
        <div className={`font-mono tracking-[0.3em] text-white/30 mb-4 uppercase ${isMobile ? "text-[7px]" : "text-[9px]"}`}>
          {stage.label}
        </div>
        <h2
          className={`font-bold tracking-[-0.02em] leading-none ${isMobile ? "text-[clamp(1.8rem,8vw,3rem)]" : "text-[clamp(2.5rem,6vw,5rem)]"}`}
          style={{
            background: "linear-gradient(135deg, #F8FAFC, #94A3B8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <StaggerText text={stage.title} progress={progress} startAt={stage.start} duration={stage.end - stage.start} />
        </h2>
        <p className={`mt-4 text-white/30 tracking-[0.15em] uppercase font-mono ${isMobile ? "text-[8px]" : "text-xs"}`}>
          {stage.subtitle}
        </p>
      </div>
    </div>
  );
}

const STAGES = [
  { title: "BUILD", subtitle: "Ideas take shape in darkness", label: "STAGE 01", start: 0, end: 0.25 },
  { title: "ENGINEER", subtitle: "Precision meets purpose", label: "STAGE 02", start: 0.25, end: 0.50 },
  { title: "LAUNCH", subtitle: "Ignition sequence active", label: "STAGE 03", start: 0.50, end: 0.75 },
  { title: "EXPLORE", subtitle: "Beyond the atmosphere", label: "STAGE 04", start: 0.75, end: 1.0 },
];

export default function CinematicRocket() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const progressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rocketGroupRef = useRef(null);
  const engineGlowRef = useRef(null);
  const engineLightRef = useRef(null);
  const exhaustRef = useRef(null);
  const starsRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(performance.now());
  const [webglFailed, setWebglFailed] = useState(false);

  const cameraState = useRef({ x: 0, y: 1.5, z: 6, lookY: 0 });
  const rocketState = useRef({ rotY: 0, posY: 0 });

  const lerpVal = (a, b, t) => a + (b - a) * Math.min(t, 1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  const deviceTier = useMemo(() => getDeviceTier(), []);
  const isMobile = deviceTier === "mobile" || deviceTier === "small-mobile";
  const isTablet = deviceTier === "tablet";
  const isSmallMobile = deviceTier === "small-mobile";

  const particleMultiplier = isSmallMobile ? 0.25 : isMobile ? 0.35 : isTablet ? 0.65 : 1;
  const starMultiplier = isSmallMobile ? 0.3 : isMobile ? 0.4 : isTablet ? 0.7 : 1;
  const scrollHeight = isSmallMobile ? 500 : isMobile ? 550 : isTablet ? 450 : 400;

  useEffect(() => {
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const fov = isSmallMobile ? 60 : isMobile ? 55 : isTablet ? 52 : 50;
    const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    const camZ = isSmallMobile ? 8.5 : isMobile ? 7.5 : isTablet ? 6.5 : 6;
    const camY = isSmallMobile ? 2.0 : isMobile ? 1.8 : 1.5;
    camera.position.set(0, camY, camZ);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: false });
    } catch (e) {
      setWebglFailed(true);
      return;
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
    const maxDpr = isSmallMobile ? 1.0 : isMobile ? 1.5 : isTablet ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isMobile ? 1.0 : 1.2;
    rendererRef.current = renderer;

    scene.background = new THREE.Color(0x02040A);
    scene.fog = new THREE.FogExp2(0x02040A, 0.015);

    scene.add(new THREE.AmbientLight(0x4466aa, 0.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 8, 5);
    if (!isMobile) {
      dirLight.castShadow = true;
      dirLight.shadow.mapSize.width = isSmallMobile ? 512 : 1024;
      dirLight.shadow.mapSize.height = isSmallMobile ? 512 : 1024;
      dirLight.shadow.camera.far = 50;
      dirLight.shadow.camera.near = 0.5;
      dirLight.shadow.radius = isSmallMobile ? 2 : 4;
    }
    scene.add(dirLight);
    const fillLight = new THREE.DirectionalLight(0x3B82F6, 0.4);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const rocketGroup = new THREE.Group();
    const rocketScale = isSmallMobile ? 0.7 : isMobile ? 0.8 : isTablet ? 0.9 : 1;
    rocketGroup.scale.set(rocketScale, rocketScale, rocketScale);
    rocketGroupRef.current = rocketGroup;

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x8899aa, metalness: 0.85, roughness: 0.18,
    });
    const bodyGeo = new THREE.CylinderGeometry(0.3, 0.35, 2.2, isMobile ? 12 : 16);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    rocketGroup.add(body);

    const noseMat = new THREE.MeshStandardMaterial({
      color: 0x3B82F6, metalness: 0.7, roughness: 0.25,
    });
    const noseGeo = new THREE.ConeGeometry(0.3, 0.8, isMobile ? 12 : 16);
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.position.y = 1.5;
    rocketGroup.add(nose);

    const finMat = new THREE.MeshStandardMaterial({
      color: 0x3B82F6, metalness: 0.6, roughness: 0.3,
    });
    for (let i = 0; i < 4; i++) {
      const finGeo = new THREE.BufferGeometry();
      const verts = new Float32Array([
        0, 0, 0, 0, -0.5, 0, 0.35, -0.25, 0,
      ]);
      finGeo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
      finGeo.computeVertexNormals();
      const fin = new THREE.Mesh(finGeo, finMat);
      fin.position.y = -0.9;
      fin.rotation.y = (i / 4) * Math.PI * 2;
      rocketGroup.add(fin);
    }

    const windowMat = new THREE.MeshStandardMaterial({
      color: 0x22D3EE, emissive: 0x22D3EE, emissiveIntensity: 0.8,
      metalness: 0.3, roughness: 0.2,
    });
    const windowGeo = new THREE.SphereGeometry(0.07, isMobile ? 6 : 8, isMobile ? 6 : 8);
    for (let i = 0; i < 4; i++) {
      const win = new THREE.Mesh(windowGeo, windowMat);
      const angle = (i / 4) * Math.PI * 2;
      win.position.set(Math.cos(angle) * 0.32, 0.4, Math.sin(angle) * 0.32);
      rocketGroup.add(win);
    }

    const stripeMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc, metalness: 0.7, roughness: 0.2,
    });
    const stripeGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.06, isMobile ? 12 : 16);
    const stripe = new THREE.Mesh(stripeGeo, stripeMat);
    stripe.position.y = -0.2;
    rocketGroup.add(stripe);

    const nozzleMat = new THREE.MeshStandardMaterial({
      color: 0x333344, metalness: 0.9, roughness: 0.15,
    });
    const nozzleGeo = new THREE.CylinderGeometry(0.18, 0.25, 0.25, isMobile ? 8 : 12);
    const nozzle = new THREE.Mesh(nozzleGeo, nozzleMat);
    nozzle.position.y = -1.25;
    rocketGroup.add(nozzle);

    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x22D3EE, transparent: true, opacity: 0.0,
    });
    const glowGeo = new THREE.SphereGeometry(0.35, isMobile ? 8 : 12, isMobile ? 8 : 12);
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    glowMesh.position.y = -1.35;
    glowMesh.scale.set(1, 0.5, 1);
    rocketGroup.add(glowMesh);
    engineGlowRef.current = glowMat;

    const engineLight = new THREE.PointLight(0x22D3EE, 0, 8);
    engineLight.position.y = -1.5;
    rocketGroup.add(engineLight);
    engineLightRef.current = engineLight;

    scene.add(rocketGroup);

    const exhaustCount = Math.floor(120 * particleMultiplier);
    const exPositions = new Float32Array(exhaustCount * 3);
    const exSizes = new Float32Array(exhaustCount);
    const exData = [];
    for (let i = 0; i < exhaustCount; i++) {
      exPositions[i * 3] = (Math.random() - 0.5) * 0.3;
      exPositions[i * 3 + 1] = -1.5 - Math.random() * 3;
      exPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      exSizes[i] = 2 + Math.random() * 4;
      exData.push({
        baseY: -1.5 - Math.random() * 3,
        speed: 1 + Math.random() * 3,
        offset: Math.random() * Math.PI * 2,
        drift: (Math.random() - 0.5) * 0.5,
      });
    }
    const exGeo = new THREE.BufferGeometry();
    exGeo.setAttribute("position", new THREE.BufferAttribute(exPositions, 3));
    exGeo.setAttribute("size", new THREE.BufferAttribute(exSizes, 1));
    const exMat = new THREE.PointsMaterial({
      color: 0x22D3EE, size: 0.06, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    const exhaust = new THREE.Points(exGeo, exMat);
    scene.add(exhaust);
    exhaustRef.current = { points: exhaust, data: exData };

    const starCount = Math.floor(400 * starMultiplier);
    const stPositions = new Float32Array(starCount * 3);
    const stSizes = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 20 + Math.random() * 80;
      stPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      stPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      stPositions[i * 3 + 2] = r * Math.cos(phi);
      stSizes[i] = 0.5 + Math.random() * 2;
    }
    const stGeo = new THREE.BufferGeometry();
    stGeo.setAttribute("position", new THREE.BufferAttribute(stPositions, 3));
    stGeo.setAttribute("size", new THREE.BufferAttribute(stSizes, 1));
    const stMat = new THREE.PointsMaterial({
      color: 0xccddff, size: 0.08, transparent: true, opacity: 0.8,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    const stars = new THREE.Points(stGeo, stMat);
    scene.add(stars);
    starsRef.current = stars;

    const onScroll = () => {
      progressRef.current = clamp01(scrollYProgress.get());
    };
    const onTouch = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        mouseRef.current.y = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    };
    const onMouse = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();
      const p = progressRef.current;
      const mp = mouseRef.current;

      const cs = cameraState.current;
      const rs = rocketState.current;

      const camDistBase = isSmallMobile ? 8.0 : isMobile ? 7.0 : isTablet ? 6.0 : 5.5;
      const camDistOrbit = isSmallMobile ? 7.0 : isMobile ? 6.5 : isTablet ? 5.5 : 5.5;

      let tCamX, tCamY, tCamZ, tLookY;
      if (p < 0.2) {
        const t = easeInOutCubic(p / 0.2);
        tCamX = lerpVal(-1.0, 0.0, t) + mp.x * (isMobile ? 0.08 : 0.15);
        tCamY = lerpVal(2.0, 1.5, t);
        tCamZ = lerpVal(camDistBase + 1, camDistBase, t);
        tLookY = lerpVal(0.5, 0.0, t);
      } else if (p < 0.5) {
        const t = easeInOutCubic((p - 0.2) / 0.3);
        const angle = t * Math.PI * 0.6;
        tCamX = Math.sin(angle) * camDistOrbit + mp.x * (isMobile ? 0.08 : 0.15);
        tCamY = lerpVal(1.5, 1.8, t);
        tCamZ = Math.cos(angle) * camDistOrbit;
        tLookY = 0;
      } else if (p < 0.75) {
        const t = easeInOutCubic((p - 0.5) / 0.25);
        const angle = Math.PI * 0.6 + t * Math.PI * 0.3;
        tCamX = Math.sin(angle) * (camDistOrbit - 0.5) + mp.x * (isMobile ? 0.05 : 0.1);
        tCamY = lerpVal(1.8, 2.5, t);
        tCamZ = Math.cos(angle) * (camDistOrbit - 0.5);
        tLookY = lerpVal(0, 3.0, t);
      } else {
        const t = easeInOutCubic((p - 0.75) / 0.25);
        const angle = Math.PI * 0.9 + t * Math.PI * 0.2;
        tCamX = Math.sin(angle) * (camDistOrbit - 1.0) + mp.x * (isMobile ? 0.03 : 0.05);
        tCamY = lerpVal(2.5, 4.0, t);
        tCamZ = Math.cos(angle) * (camDistOrbit - 1.0);
        tLookY = lerpVal(3.0, 8.0, t);
      }

      const lerpFactor = dt * 3.5;
      cs.x = lerpVal(cs.x, tCamX, lerpFactor);
      cs.y = lerpVal(cs.y, tCamY, lerpFactor);
      cs.z = lerpVal(cs.z, tCamZ, lerpFactor);
      cs.lookY = lerpVal(cs.lookY, tLookY, lerpFactor);

      camera.position.set(cs.x, cs.y, cs.z);
      camera.lookAt(0, cs.lookY, 0);

      let tRotY, tPosY;
      if (p < 0.2) {
        tRotY = mp.x * (isMobile ? 0.04 : 0.08);
        tPosY = Math.sin(elapsed * 0.8) * 0.08;
      } else if (p < 0.5) {
        const t = easeInOutCubic((p - 0.2) / 0.3);
        tRotY = lerpVal(mp.x * (isMobile ? 0.04 : 0.08), Math.PI * 0.3, t) + mp.x * (isMobile ? 0.02 : 0.05) * (1 - t);
        tPosY = Math.sin(elapsed * 0.8) * 0.08 * (1 - t);
      } else if (p < 0.75) {
        const t = easeInOutCubic((p - 0.5) / 0.25);
        tRotY = lerpVal(Math.PI * 0.3, 0, t);
        tPosY = lerpVal(0, t * 4.0, t);
      } else {
        const t = easeInOutCubic((p - 0.75) / 0.25);
        tRotY = 0;
        tPosY = lerpVal(4.0, 12.0 + t * 6.0, t);
      }

      rs.rotY = lerpVal(rs.rotY, tRotY, lerpFactor);
      rs.posY = lerpVal(rs.posY, tPosY, lerpFactor);

      rocketGroup.rotation.y = rs.rotY;
      rocketGroup.position.y = rs.posY;

      let exhaustIntensity = 0;
      let exhaustSpread = 0;
      if (p > 0.25 && p < 0.5) {
        exhaustIntensity = easeInOutCubic((p - 0.25) / 0.25) * 0.3;
        exhaustSpread = exhaustIntensity * 0.3;
      } else if (p >= 0.5 && p < 0.75) {
        const t = easeInOutCubic((p - 0.5) / 0.25);
        exhaustIntensity = 0.3 + t * 0.5;
        exhaustSpread = 0.3 + t * 0.5;
      } else if (p >= 0.75) {
        const t = easeInOutCubic((p - 0.75) / 0.25);
        exhaustIntensity = 0.8 + t * 0.2;
        exhaustSpread = 0.8 + t * 0.2;
      }

      glowMat.opacity = exhaustIntensity * 0.6;
      glowMesh.scale.set(
        1 + exhaustIntensity * 0.5,
        0.5 + exhaustIntensity * 1.5,
        1 + exhaustIntensity * 0.5,
      );
      engineLight.intensity = exhaustIntensity * 3;

      const exPos = exGeo.attributes.position.array;
      for (let i = 0; i < exhaustCount; i++) {
        const d = exData[i];
        const baseX = (Math.random() - 0.5) * 0.15 * exhaustSpread;
        const baseZ = (Math.random() - 0.5) * 0.15 * exhaustSpread;
        exPos[i * 3] += (baseX + d.drift * dt) * exhaustIntensity;
        exPos[i * 3 + 1] -= d.speed * dt * (0.5 + exhaustIntensity * 2);
        exPos[i * 3 + 2] += baseZ * exhaustIntensity;
        const y = exPos[i * 3 + 1];
        if (y < -1.5 - 4 - exhaustIntensity * 3) {
          exPos[i * 3] = (Math.random() - 0.5) * 0.15 * exhaustSpread;
          exPos[i * 3 + 1] = -1.5;
          exPos[i * 3 + 2] = (Math.random() - 0.5) * 0.15 * exhaustSpread;
        }
      }
      exGeo.attributes.position.needsUpdate = true;
      exMat.opacity = exhaustIntensity * 0.8;
      exMat.size = 0.04 + exhaustIntensity * 0.06;

      const starPos = stGeo.attributes.position.array;
      for (let i = 0; i < starCount; i++) {
        starPos[i * 3 + 1] += dt * (0.3 + p * 2);
        if (starPos[i * 3 + 1] > 50) {
          starPos[i * 3 + 1] = -50;
        }
      }
      stGeo.attributes.position.needsUpdate = true;

      const bgR = lerpVal(0.008, 0.02, p);
      const bgG = lerpVal(0.016, 0.04, p);
      const bgB = lerpVal(0.039, 0.12, p);
      scene.background.setRGB(bgR, bgG, bgB);
      scene.fog.color.setRGB(bgR, bgG, bgB);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, [reduce, deviceTier, isMobile, isSmallMobile, isTablet, particleMultiplier, starMultiplier]);

  const progressValue = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [currentProgress, setCurrentProgress] = useState(0);
  useMotionValueEvent(progressValue, "change", (v) => setCurrentProgress(v));

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${scrollHeight}vh`, background: "#02040A" }}
    >
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden" style={{ zIndex: 0 }}>
        {webglFailed ? (
          <div className="absolute inset-0 flex items-center justify-center" style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.12) 0%, #02040A 70%)",
          }}>
            <div className="text-center px-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-cyan-400/30 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-cyan-400/10" />
              </div>
              <p className="text-white/30 text-xs tracking-wider">Rocket Scene</p>
            </div>
          </div>
        ) : (
          <>
            {!reduce && (
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ display: "block" }}
              />
            )}

            {reduce && (
              <div className="absolute inset-0" style={{
                background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.15) 0%, #02040A 70%)",
              }} />
            )}
          </>
        )}

        {/* Scroll Progress Indicator */}
        <div className={`absolute right-3 md:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-20 pointer-events-none ${isMobile ? "gap-1" : ""}`}>
          {STAGES.map((stage, i) => {
            const segStart = i / STAGES.length;
            const segEnd = (i + 1) / STAGES.length;
            const fill = clamp01((currentProgress - segStart) / (segEnd - segStart));
            return (
              <div key={i} className={`relative rounded-full overflow-hidden ${isMobile ? "w-[2px] h-4" : "w-[3px] h-6"}`} style={{ background: "rgba(255,255,255,0.08)" }}>
                <div
                  className="absolute bottom-0 left-0 w-full rounded-full transition-none"
                  style={{
                    height: `${fill * 100}%`,
                    background: fill > 0 ? "linear-gradient(to top, #22D3EE, #3B82F6)" : "transparent",
                    boxShadow: fill > 0 ? "0 0 6px rgba(34,211,238,0.4)" : "none",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Stage Text Overlays */}
        {STAGES.map((stage, i) => (
          <StageOverlay key={i} stage={stage} progress={currentProgress} visible={currentProgress > 0} isMobile={isMobile} />
        ))}

        {/* Scroll CTA */}
        {currentProgress < 0.05 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none ${isMobile ? "bottom-6" : "bottom-8"}`}
          >
            <span className={`tracking-[0.25em] uppercase text-white/25 font-mono ${isMobile ? "text-[7px]" : "text-[9px]"}`}>
              Scroll to Launch
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-white/25">
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        )}

        {/* Editorial grid lines — responsive */}
        <div className="absolute inset-0 pointer-events-none z-5 opacity-[0.03]">
          {isSmallMobile ? (
            <>
              <div className="absolute top-0 bottom-0 left-[33%] w-px bg-white" />
              <div className="absolute top-0 bottom-0 left-[66%] w-px bg-white" />
            </>
          ) : isMobile ? (
            <>
              <div className="absolute top-0 bottom-0 left-[25%] w-px bg-white" />
              <div className="absolute top-0 bottom-0 left-[50%] w-px bg-white" />
              <div className="absolute top-0 bottom-0 left-[75%] w-px bg-white" />
            </>
          ) : (
            <>
              <div className="absolute top-0 bottom-0 left-[20%] w-px bg-white" />
              <div className="absolute top-0 bottom-0 left-[40%] w-px bg-white" />
              <div className="absolute top-0 bottom-0 left-[60%] w-px bg-white" />
              <div className="absolute top-0 bottom-0 left-[80%] w-px bg-white" />
              <div className="absolute left-0 right-0 top-[50%] h-px bg-white" />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
