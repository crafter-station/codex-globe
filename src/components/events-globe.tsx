"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useCallback } from "react";
import type { CodexEvent } from "@/data/events";
import { useTheme } from "./theme-provider";

interface EventsGlobeProps {
  events: CodexEvent[];
  selected: CodexEvent | null;
  onSelect: (event: CodexEvent | null) => void;
}

const MEETUP_COLOR: [number, number, number] = [0.33, 0.43, 0.98];
const HACKATHON_COLOR: [number, number, number] = [0.78, 0.30, 0.85];
const SELECTED_COLOR: [number, number, number] = [1, 0.84, 0];

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
  const sinP = Math.sin(phi);
  const cosP = Math.cos(phi);
  const sinT = Math.sin(theta);
  const cosT = Math.cos(theta);
  return -sinP * cosT * x + sinT * y + cosP * cosT * z >= 0;
}

interface LabelRect { x: number; y: number; w: number; h: number }

function resolveCollisions(labels: LabelRect[]): void {
  for (let pass = 0; pass < 5; pass++) {
    for (let i = 0; i < labels.length; i++) {
      for (let j = i + 1; j < labels.length; j++) {
        const a = labels[i];
        const b = labels[j];
        const ox = Math.min(a.x + a.w + 4, b.x + b.w + 4) - Math.max(a.x - 4, b.x - 4);
        const oy = Math.min(a.y + a.h + 3, b.y + b.h + 3) - Math.max(a.y - 3, b.y - 3);
        if (ox > 0 && oy > 0) {
          const s = oy / 2 + 3;
          if (a.y < b.y) { a.y -= s; b.y += s; }
          else { a.y += s; b.y -= s; }
        }
      }
    }
  }
}

function isEventEqual(a: CodexEvent | null, b: CodexEvent): boolean {
  return !!a && a.lat === b.lat && a.lng === b.lng && a.date === b.date && a.name === b.name;
}

const THEME = {
  dark: {
    dark: 1 as const, diffuse: 2.5, mapBrightness: 6, mapBaseBrightness: 0.08,
    baseColor: [0.08, 0.08, 0.14] as [number, number, number],
    markerColor: [0.33, 0.43, 0.98] as [number, number, number],
    glowColor: [0.05, 0.05, 0.12] as [number, number, number],
    opacity: 0.85,
  },
  light: {
    dark: 0 as const, diffuse: 3, mapBrightness: 6, mapBaseBrightness: 0.1,
    baseColor: [0.92, 0.92, 0.96] as [number, number, number],
    markerColor: [0.33, 0.43, 0.98] as [number, number, number],
    glowColor: [0.93, 0.93, 0.98] as [number, number, number],
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

export function EventsGlobe({ events, selected, onSelect }: EventsGlobeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const thetaRef = useRef(0.15);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const hoveredGlobe = useRef(false);
  const focusRef = useRef<[number, number] | null>(null);
  const gsRef = useRef(0);

  const eventsRef = useRef(events);
  eventsRef.current = events;
  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const { resolved } = useTheme();
  const config = THEME[resolved];

  useEffect(() => {
    if (selected) focusRef.current = locationToAngles(selected.lat, selected.lng);
    else focusRef.current = null;
  }, [selected]);

  const handleLabelClick = useCallback((event: CodexEvent) => {
    if (isEventEqual(selectedRef.current, event)) onSelectRef.current(null);
    else onSelectRef.current(event);
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
    const LERP = 0.15;

    const createLabel = (event: CodexEvent): LabelState => {
      const key = `${event.city}-${event.date}-${event.name}`;
      const existing = labelStates.get(key);
      if (existing) return existing;

      const el = document.createElement("div");
      el.style.cssText = "position:absolute;z-index:20;pointer-events:auto;transform:translate(-50%,-100%);opacity:0;display:none;cursor:pointer;margin-top:-8px;will-change:transform,opacity";

      const inner = document.createElement("div");
      inner.style.cssText = "display:flex;align-items:center;gap:4px;padding:2px 8px;border-radius:6px;font-size:11px;font-weight:500;white-space:nowrap;border:1px solid";

      const flag = document.createElement("span");
      flag.className = `fi fi-${event.country.toLowerCase()} fis`;
      flag.style.cssText = "width:14px;height:10px;border-radius:1px;flex-shrink:0";

      const city = document.createElement("span");
      city.textContent = event.city;
      city.style.cssText = "max-width:100px;overflow:hidden;text-overflow:ellipsis";

      const date = document.createElement("span");
      date.textContent = event.date.replace("Apr ", "4/").replace("May ", "5/");
      date.style.cssText = "font-size:8px;opacity:0.7";

      const linkIcon = document.createElement("a");
      linkIcon.href = event.url;
      linkIcon.target = "_blank";
      linkIcon.rel = "noopener noreferrer";
      linkIcon.style.cssText = "display:none;opacity:0.7;flex-shrink:0;margin-left:2px;transition:opacity 0.15s";
      linkIcon.addEventListener("mouseenter", () => { linkIcon.style.opacity = "1"; });
      linkIcon.addEventListener("mouseleave", () => { linkIcon.style.opacity = "0.7"; });
      linkIcon.addEventListener("click", (e) => e.stopPropagation());
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("stroke-width", "2");
      svg.style.cssText = "width:10px;height:10px";
      const p1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p1.setAttribute("d", "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6");
      const p2 = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      p2.setAttribute("points", "15 3 21 3 21 9");
      const p3 = document.createElementNS("http://www.w3.org/2000/svg", "line");
      p3.setAttribute("x1", "10"); p3.setAttribute("y1", "14");
      p3.setAttribute("x2", "21"); p3.setAttribute("y2", "3");
      svg.append(p1, p2, p3);
      linkIcon.appendChild(svg);

      inner.append(flag, city, date, linkIcon);
      el.appendChild(inner);
      el.dataset.linkIcon = "1";
      el.addEventListener("click", () => handleLabelClick(event));
      el.addEventListener("mouseenter", () => { hoveredGlobe.current = true; });
      el.addEventListener("mouseleave", () => { hoveredGlobe.current = false; });
      wrapper.appendChild(el);

      const state: LabelState = { el, currentX: 0, currentY: 0, targetX: 0, targetY: 0, currentOpacity: 0, targetOpacity: 0 };
      labelStates.set(key, state);
      return state;
    };

    const styleLabel = (state: LabelState, event: CodexEvent, isSel: boolean) => {
      const inner = state.el.firstElementChild as HTMLElement;
      if (!inner) return;
      const link = inner.querySelector("a");
      if (link) link.style.display = isSel ? "flex" : "none";
      if (isSel) {
        inner.style.backgroundColor = "rgba(234,179,8,0.9)";
        inner.style.borderColor = "rgb(250,204,21)";
        inner.style.color = "rgb(66,32,6)";
        inner.style.boxShadow = "0 0 12px rgba(234,179,8,0.4)";
      } else if (event.type === "hackathon") {
        inner.style.backgroundColor = "rgba(192,72,210,0.9)";
        inner.style.borderColor = "rgba(212,112,230,0.6)";
        inner.style.color = "white";
        inner.style.boxShadow = "0 1px 4px rgba(192,72,210,0.3)";
      } else {
        inner.style.backgroundColor = "rgba(75,100,245,0.9)";
        inner.style.borderColor = "rgba(105,130,255,0.6)";
        inner.style.color = "white";
        inner.style.boxShadow = "0 1px 4px rgba(75,100,245,0.3)";
      }
    };

    const doublePi = Math.PI * 2;
    let rafId: number;
    let frameCount = 0;

    const animate = () => {
      const focus = focusRef.current;
      const evts = eventsRef.current;
      const sel = selectedRef.current;
      const gs = gsRef.current;

      if (focus) {
        const [fp, ft] = focus;
        const dp = (fp - phiRef.current + doublePi) % doublePi;
        const dn = (phiRef.current - fp + doublePi) % doublePi;
        if (dp < dn) phiRef.current += dp * 0.08;
        else phiRef.current -= dn * 0.08;
        thetaRef.current = thetaRef.current * 0.92 + ft * 0.08;
      } else if (!pointerInteracting.current && !hoveredGlobe.current) {
        phiRef.current += 0.002;
        thetaRef.current = thetaRef.current * 0.95 + 0.15 * 0.05;
      }

      const curPhi = phiRef.current + pointerInteractionMovement.current / 200;

      globe.update({
        phi: curPhi, theta: thetaRef.current,
        width: gs * dpr, height: gs * dpr,
        markers: evts.map((e, i) => {
          const isSel = isEventEqual(sel, e);
          return {
            location: [e.lat, e.lng] as [number, number],
            size: isSel ? 0.08 : 0.04,
            id: `amb-${i}`,
            color: isSel ? SELECTED_COLOR : e.type === "hackathon" ? HACKATHON_COLOR : MEETUP_COLOR,
          };
        }),
      });

      frameCount++;
      if (frameCount % 4 === 0 && gs > 0) {
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

        const LABEL_W = 110;
        const LABEL_H = 24;
        const front: { event: CodexEvent; x: number; y: number }[] = [];

        for (let i = 0; i < evts.length; i++) {
          const ap = anchorMap.get(i);
          if (!ap) continue;
          if (!isFrontFace(evts[i].lat, evts[i].lng, curPhi, thetaRef.current)) continue;
          front.push({ event: evts[i], x: (ap.lp / 100) * gs, y: (ap.tp / 100) * gs });
        }

        const rects: LabelRect[] = front.map((l) => ({
          x: l.x - LABEL_W / 2, y: l.y - LABEL_H - 10, w: LABEL_W, h: LABEL_H,
        }));
        resolveCollisions(rects);

        const activeKeys = new Set<string>();
        for (let i = 0; i < front.length; i++) {
          const d = front[i];
          const key = `${d.event.city}-${d.event.date}-${d.event.name}`;
          activeKeys.add(key);
          const state = createLabel(d.event);
          const isSel = isEventEqual(sel, d.event);
          state.targetX = d.x;
          state.targetY = rects[i].y + LABEL_H;
          state.targetOpacity = 1;
          state.el.style.display = "";
          state.el.style.pointerEvents = "auto";
          styleLabel(state, d.event, isSel);
        }

        for (const [key, state] of labelStates) {
          if (!activeKeys.has(key)) {
            state.targetOpacity = 0;
          }
        }
      }

      for (const [key, state] of labelStates) {
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
    };
  }, [config, handleLabelClick]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden"
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
    >
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
