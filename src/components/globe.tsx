"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useCallback } from "react";
import type { Ambassador } from "@/data/ambassadors";
import { useTheme } from "./theme-provider";

interface GlobeProps {
  ambassadors: Ambassador[];
  selected?: Ambassador | null;
  onSelectAmbassador?: (ambassador: Ambassador | null) => void;
}

function locationToAngles(lat: number, lng: number): [number, number] {
  return [
    Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
    (lat * Math.PI) / 180,
  ];
}

function isFrontFace(lat: number, lng: number, phi: number, theta: number): boolean {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180 - Math.PI;
  const cosLat = Math.cos(latRad);
  const x = -cosLat * Math.cos(lngRad);
  const y = Math.sin(latRad);
  const z = cosLat * Math.sin(lngRad);
  return -Math.sin(phi) * Math.cos(theta) * x + Math.sin(theta) * y + Math.cos(phi) * Math.cos(theta) * z >= 0;
}

const THEME = {
  dark: {
    dark: 1 as const, diffuse: 2.5, mapBrightness: 4, mapBaseBrightness: 0.02,
    baseColor: [0.12, 0.12, 0.14] as [number, number, number],
    markerColor: [0.34, 0.82, 0.52] as [number, number, number],
    glowColor: [0.05, 0.05, 0.08] as [number, number, number],
    opacity: 0.85,
  },
  light: {
    dark: 0 as const, diffuse: 3, mapBrightness: 6, mapBaseBrightness: 0.1,
    baseColor: [0.92, 0.92, 0.94] as [number, number, number],
    markerColor: [0.15, 0.6, 0.35] as [number, number, number],
    glowColor: [0.95, 0.95, 0.98] as [number, number, number],
    opacity: 0.9,
  },
};

interface LabelState {
  el: HTMLElement;
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  currentOpacity: number;
  targetOpacity: number;
}

export function Globe({ ambassadors, selected, onSelectAmbassador }: GlobeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const thetaRef = useRef(0.15);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const hoveredLabel = useRef(false);
  const focusRef = useRef<[number, number] | null>(null);
  const gsRef = useRef(0);
  const hoveredAmbRef = useRef<string | null>(null);

  const ambassadorsRef = useRef(ambassadors);
  ambassadorsRef.current = ambassadors;
  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  const onSelectRef = useRef(onSelectAmbassador);
  onSelectRef.current = onSelectAmbassador;

  const { resolved } = useTheme();
  const config = THEME[resolved];

  useEffect(() => {
    if (selected) focusRef.current = locationToAngles(selected.lat, selected.lng);
    else focusRef.current = null;
  }, [selected]);

  const handleClick = useCallback((amb: Ambassador) => {
    const sel = selectedRef.current;
    if (sel?.name === amb.name) onSelectRef.current?.(null);
    else onSelectRef.current?.(amb);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const measure = () => { gsRef.current = wrapper.offsetWidth; };
    measure();
    window.addEventListener("resize", measure);

    const gs = gsRef.current;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: gs * dpr, height: gs * dpr,
      phi: phiRef.current, theta: thetaRef.current,
      dark: config.dark, diffuse: config.diffuse,
      mapSamples: 16000,
      mapBrightness: config.mapBrightness,
      mapBaseBrightness: config.mapBaseBrightness,
      baseColor: config.baseColor,
      markerColor: config.markerColor,
      glowColor: config.glowColor,
      markers: [], scale: 1, offset: [0, 0],
      opacity: config.opacity, markerElevation: 0.05,
    });

    const labelStates = new Map<string, LabelState>();
    const LERP = 0.18;

    const createLabel = (amb: Ambassador): LabelState => {
      const key = amb.name;
      const existing = labelStates.get(key);
      if (existing) return existing;

      const el = document.createElement("div");
      el.style.cssText = "position:absolute;z-index:20;pointer-events:auto;transform:translate(-50%,-100%);opacity:0;display:none;cursor:pointer;margin-top:-12px;will-change:transform,opacity";

      const inner = document.createElement("div");
      inner.style.cssText = "display:flex;align-items:center;gap:8px;padding:6px 12px;border-radius:10px;white-space:nowrap;border:1px solid;backdrop-filter:blur(12px)";

      const flag = document.createElement("span");
      flag.className = `fi fi-${amb.country.toLowerCase()} fis`;
      flag.style.cssText = "width:24px;height:18px;border-radius:2px;flex-shrink:0";

      const info = document.createElement("div");
      info.style.cssText = "display:flex;flex-direction:column;gap:1px";

      const nameEl = document.createElement("span");
      nameEl.textContent = amb.name;
      nameEl.style.cssText = "font-size:13px;font-weight:600;line-height:1.2";

      const row = document.createElement("div");
      row.style.cssText = "display:flex;align-items:center;gap:6px";

      const loc = document.createElement("span");
      loc.textContent = `${amb.city}, ${amb.country}`;
      loc.style.cssText = "font-size:11px;opacity:0.6;line-height:1.2";

      row.appendChild(loc);

      const socials: { url: string; icon: string }[] = [];
      if (amb.github) socials.push({ url: `https://github.com/${amb.github}`, icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" });
      if (amb.twitter) socials.push({ url: `https://x.com/${amb.twitter}`, icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" });
      if (amb.linkedin) socials.push({ url: amb.linkedin, icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" });

      for (const s of socials) {
        const a = document.createElement("a");
        a.href = s.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.style.cssText = "opacity:0.45;display:flex;transition:opacity 0.15s";
        a.addEventListener("mouseenter", () => { a.style.opacity = "1"; });
        a.addEventListener("mouseleave", () => { a.style.opacity = "0.45"; });
        a.addEventListener("click", (e) => e.stopPropagation());
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "currentColor");
        svg.style.cssText = "width:12px;height:12px";
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", s.icon);
        svg.appendChild(path);
        a.appendChild(svg);
        row.appendChild(a);
      }

      info.append(nameEl, row);
      inner.append(flag, info);
      el.appendChild(inner);
      el.addEventListener("click", (e) => { e.stopPropagation(); handleClick(amb); });
      el.addEventListener("mouseenter", () => { hoveredLabel.current = true; });
      el.addEventListener("mouseleave", () => { hoveredLabel.current = false; });
      wrapper.appendChild(el);

      const state: LabelState = { el, currentX: 0, currentY: 0, targetX: 0, targetY: 0, currentOpacity: 0, targetOpacity: 0 };
      labelStates.set(key, state);
      return state;
    };

    const styleLabel = (state: LabelState, isSel: boolean) => {
      const inner = state.el.firstElementChild as HTMLElement;
      if (!inner) return;
      if (isSel) {
        inner.style.backgroundColor = "rgba(234,179,8,0.95)";
        inner.style.borderColor = "rgb(250,204,21)";
        inner.style.color = "rgb(66,32,6)";
        inner.style.boxShadow = "0 4px 20px rgba(234,179,8,0.3)";
      } else {
        inner.style.backgroundColor = "rgba(255,255,255,0.92)";
        inner.style.borderColor = "rgba(0,0,0,0.08)";
        inner.style.color = "rgb(20,20,25)";
        inner.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
      }
    };

    const hitZones = new Map<string, { el: HTMLElement; amb: Ambassador }>();

    const createHitZone = (amb: Ambassador): HTMLElement => {
      const key = amb.name;
      const existing = hitZones.get(key);
      if (existing) return existing.el;

      const el = document.createElement("div");
      el.style.cssText = "position:absolute;width:20px;height:20px;transform:translate(-50%,-50%);pointer-events:auto;cursor:pointer;z-index:15;border-radius:50%";
      el.addEventListener("mouseenter", () => {
        hoveredAmbRef.current = amb.name;
        hoveredLabel.current = true;
      });
      el.addEventListener("mouseleave", () => {
        hoveredAmbRef.current = null;
        hoveredLabel.current = false;
      });
      el.addEventListener("click", (e) => { e.stopPropagation(); handleClick(amb); });
      wrapper.appendChild(el);
      hitZones.set(key, { el, amb });
      return el;
    };

    const doublePi = Math.PI * 2;
    let rafId: number;
    let frameCount = 0;

    const animate = () => {
      const focus = focusRef.current;
      const ambs = ambassadorsRef.current;
      const sel = selectedRef.current;
      const gs = gsRef.current;

      if (focus) {
        const [fp, ft] = focus;
        const dp = (fp - phiRef.current + doublePi) % doublePi;
        const dn = (phiRef.current - fp + doublePi) % doublePi;
        if (dp < dn) phiRef.current += dp * 0.08;
        else phiRef.current -= dn * 0.08;
        thetaRef.current = thetaRef.current * 0.92 + ft * 0.08;
      } else if (!pointerInteracting.current && !hoveredLabel.current) {
        phiRef.current += 0.002;
        thetaRef.current = thetaRef.current * 0.95 + 0.15 * 0.05;
      }

      const curPhi = phiRef.current + pointerInteractionMovement.current / 200;

      globe.update({
        phi: curPhi, theta: thetaRef.current,
        width: gs * dpr, height: gs * dpr,
        markers: ambs.map((a, i) => ({
          location: [a.lat, a.lng] as [number, number],
          size: sel?.name === a.name ? 0.08 : 0.04,
          id: `amb-${i}`,
          color: sel?.name === a.name
            ? [1, 0.84, 0] as [number, number, number]
            : undefined,
        })),
      });

      frameCount++;
      if (frameCount % 6 === 0 && gs > 0) {
        const anchors = wrapper.querySelectorAll<HTMLElement>('div[style*="anchor-name"]');
        const anchorMap = new Map<number, { lp: number; tp: number }>();
        anchors.forEach((a) => {
          const nm = a.style.getPropertyValue("anchor-name") || (a.style as unknown as Record<string, string>)["anchorName"] || "";
          const m = nm.match(/--cobe-amb-(\d+)/);
          if (!m) return;
          const l = parseFloat(a.style.left);
          const t = parseFloat(a.style.top);
          if (!Number.isNaN(l) && !Number.isNaN(t)) anchorMap.set(parseInt(m[1]), { lp: l, tp: t });
        });

        const hovered = hoveredAmbRef.current;
        const activeHitKeys = new Set<string>();
        const showLabelKeys = new Set<string>();

        for (let i = 0; i < ambs.length; i++) {
          const ap = anchorMap.get(i);
          if (!ap) continue;
          const amb = ambs[i];
          const front = isFrontFace(amb.lat, amb.lng, curPhi, thetaRef.current);
          const x = (ap.lp / 100) * gs;
          const y = (ap.tp / 100) * gs;

          if (front) {
            activeHitKeys.add(amb.name);
            const hz = createHitZone(amb);
            hz.style.left = `${x}px`;
            hz.style.top = `${y}px`;
            hz.style.display = "";

            if (sel?.name === amb.name || hovered === amb.name) {
              showLabelKeys.add(amb.name);
              const state = createLabel(amb);
              const isSel = sel?.name === amb.name;
              state.targetX = x;
              state.targetY = y - 14;
              state.targetOpacity = 1;
              state.el.style.display = "";
              state.el.style.pointerEvents = "auto";
              styleLabel(state, isSel);
            }
          }
        }

        for (const [key, { el }] of hitZones) {
          if (!activeHitKeys.has(key)) {
            el.style.display = "none";
          }
        }

        for (const [key, state] of labelStates) {
          if (!showLabelKeys.has(key)) {
            state.targetOpacity = 0;
          }
        }
      }

      for (const [, state] of labelStates) {
        state.currentX += (state.targetX - state.currentX) * LERP;
        state.currentY += (state.targetY - state.currentY) * LERP;
        state.currentOpacity += (state.targetOpacity - state.currentOpacity) * LERP;
        if (state.currentOpacity < 0.01) {
          state.el.style.display = "none";
          state.el.style.pointerEvents = "none";
          continue;
        }
        state.el.style.left = `${state.currentX}px`;
        state.el.style.top = `${state.currentY}px`;
        state.el.style.opacity = `${state.currentOpacity}`;
      }

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    setTimeout(() => { if (canvas) canvas.style.opacity = "1"; });

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
      window.removeEventListener("resize", measure);
      for (const s of labelStates.values()) s.el.remove();
      labelStates.clear();
      for (const { el } of hitZones.values()) el.remove();
      hitZones.clear();
    };
  }, [config, handleClick]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div ref={wrapperRef} className="relative"
        style={{ width: "min(100%, min(calc(100dvh - 120px), 700px))", aspectRatio: "1" }}
      >
        <canvas ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
            if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
          }}
          onPointerUp={() => { pointerInteracting.current = null; phiRef.current += pointerInteractionMovement.current / 200; pointerInteractionMovement.current = 0; if (canvasRef.current) canvasRef.current.style.cursor = "grab"; }}
          onPointerOut={() => { pointerInteracting.current = null; phiRef.current += pointerInteractionMovement.current / 200; pointerInteractionMovement.current = 0; if (canvasRef.current) canvasRef.current.style.cursor = "grab"; }}
          onMouseMove={(e) => { if (pointerInteracting.current !== null) pointerInteractionMovement.current = e.clientX - pointerInteracting.current; }}
          onTouchMove={(e) => { if (pointerInteracting.current !== null && e.touches[0]) pointerInteractionMovement.current = e.touches[0].clientX - pointerInteracting.current; }}
          style={{ width: "100%", height: "100%", cursor: "grab", contain: "layout paint size", opacity: 0, transition: "opacity 1s ease" }}
        />
      </div>
    </div>
  );
}
