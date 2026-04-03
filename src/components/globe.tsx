"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState, useCallback } from "react";
import type { Ambassador } from "@/data/ambassadors";
import { useTheme } from "./theme-provider";
import { GithubLogo } from "@/components/logos/github";
import { TwitterLogo } from "@/components/logos/twitter";
import { LinkedinLogo } from "@/components/logos/linkedin";
import { ThreadsLogo } from "@/components/logos/threads";

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

const THEME_CONFIG = {
  dark: {
    dark: 1 as const,
    diffuse: 2.5,
    mapBrightness: 4,
    mapBaseBrightness: 0.02,
    baseColor: [0.12, 0.12, 0.14] as [number, number, number],
    markerColor: [0.34, 0.82, 0.52] as [number, number, number],
    glowColor: [0.05, 0.05, 0.08] as [number, number, number],
    opacity: 0.85,
    tooltipBg: "bg-popover/95",
    tooltipBorder: "border-border",
    tooltipArrowBg: "bg-popover/95",
    tooltipArrowBorder: "border-border",
  },
  light: {
    dark: 0 as const,
    diffuse: 3,
    mapBrightness: 6,
    mapBaseBrightness: 0.1,
    baseColor: [0.92, 0.92, 0.94] as [number, number, number],
    markerColor: [0.15, 0.6, 0.35] as [number, number, number],
    glowColor: [0.95, 0.95, 0.98] as [number, number, number],
    opacity: 0.9,
    tooltipBg: "bg-popover/95",
    tooltipBorder: "border-border",
    tooltipArrowBg: "bg-popover/95",
    tooltipArrowBorder: "border-border",
  },
};

export function Globe({ ambassadors, selected, onSelectAmbassador }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const thetaRef = useRef(0.15);
  const hoveredGlobe = useRef(false);
  const focusRef = useRef<[number, number] | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<Ambassador | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const { resolved } = useTheme();
  const config = THEME_CONFIG[resolved];

  useEffect(() => {
    if (selected) {
      focusRef.current = locationToAngles(selected.lat, selected.lng);
    } else {
      focusRef.current = null;
    }
  }, [selected]);

  const handleAnchorHover = useCallback(
    (ambassador: Ambassador, anchorDiv: HTMLElement) => {
      setHoveredMarker(ambassador);
      const left = parseFloat(anchorDiv.style.left);
      const top = parseFloat(anchorDiv.style.top);
      const parent = anchorDiv.parentElement;
      if (parent) {
        const w = parent.offsetWidth;
        const h = parent.offsetHeight;
        setTooltipPos({ x: (left / 100) * w, y: (top / 100) * h });
      }
    },
    []
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    let width = 0;
    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const cobeMarkers = ambassadors.map((a, i) => ({
      location: [a.lat, a.lng] as [number, number],
      size: 0.04,
      id: `amb-${i}`,
      color: selected?.name === a.name
        ? [1, 0.84, 0] as [number, number, number]
        : undefined,
    }));

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: config.dark,
      diffuse: config.diffuse,
      mapSamples: 24000,
      mapBrightness: config.mapBrightness,
      mapBaseBrightness: config.mapBaseBrightness,
      baseColor: config.baseColor,
      markerColor: config.markerColor,
      glowColor: config.glowColor,
      markers: cobeMarkers,
      scale: 1,
      offset: [0, 0],
      opacity: config.opacity,
      markerElevation: 0.05,
    });

    const setupAnchors = () => {
      const wrapper = canvasRef.current?.parentElement;
      if (!wrapper) return;
      const anchors = wrapper.querySelectorAll<HTMLElement>(
        'div[style*="anchor-name"]'
      );
      anchors.forEach((anchor) => {
        const name = anchor.style.getPropertyValue("anchor-name") || (anchor.style as unknown as Record<string, string>)["anchorName"] || "";
        const match = name.match(/--cobe-amb-(\d+)/);
        if (!match) return;
        const idx = parseInt(match[1]);
        const amb = ambassadors[idx];
        if (!amb) return;

        anchor.style.width = "16px";
        anchor.style.height = "16px";
        anchor.style.transform = "translate(-50%, -50%)";
        anchor.style.pointerEvents = "auto";
        anchor.style.cursor = "pointer";
        anchor.style.zIndex = "10";

        anchor.onmouseenter = () => handleAnchorHover(amb, anchor);
        anchor.onmouseleave = () => {
          setHoveredMarker(null);
          setTooltipPos(null);
        };
        anchor.onclick = () => onSelectAmbassador?.(amb);
      });
    };

    const doublePi = Math.PI * 2;
    let rafId: number;

    const animate = () => {
      const focus = focusRef.current;

      if (focus) {
        const [focusPhi, focusTheta] = focus;
        const distPositive = (focusPhi - phiRef.current + doublePi) % doublePi;
        const distNegative = (phiRef.current - focusPhi + doublePi) % doublePi;
        if (distPositive < distNegative) {
          phiRef.current += distPositive * 0.08;
        } else {
          phiRef.current -= distNegative * 0.08;
        }
        thetaRef.current = thetaRef.current * 0.92 + focusTheta * 0.08;
      } else if (!pointerInteracting.current && !hoveredGlobe.current) {
        phiRef.current += 0.002;
        thetaRef.current = thetaRef.current * 0.95 + 0.15 * 0.05;
      }

      const currentPhi =
        phiRef.current + pointerInteractionMovement.current / 200;

      globe.update({
        phi: currentPhi,
        theta: thetaRef.current,
        width: width * 2,
        height: width * 2,
        markers: ambassadors.map((a, i) => ({
          location: [a.lat, a.lng] as [number, number],
          size: selected?.name === a.name ? 0.08 : 0.04,
          id: `amb-${i}`,
          color: selected?.name === a.name
            ? [1, 0.84, 0] as [number, number, number]
            : undefined,
        })),
      });

      setupAnchors();
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [ambassadors, selected, handleAnchorHover, onSelectAmbassador, config]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full"
      onMouseEnter={() => {
        hoveredGlobe.current = true;
      }}
      onMouseLeave={() => {
        hoveredGlobe.current = false;
        setHoveredMarker(null);
        setTooltipPos(null);
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
          setHoveredMarker(null);
          setTooltipPos(null);
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            pointerInteractionMovement.current =
              e.clientX - pointerInteracting.current;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            pointerInteractionMovement.current =
              e.touches[0].clientX - pointerInteracting.current;
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />

      {hoveredMarker && tooltipPos && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y - 16,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className={`${config.tooltipBg} backdrop-blur-sm border ${config.tooltipBorder} rounded-lg px-3 py-2 shadow-2xl flex items-center gap-2.5`}>
            <span
              className={`fi fi-${hoveredMarker.country.toLowerCase()} fis rounded-sm shrink-0`}
              style={{ width: 20, height: 15 }}
            />
            <div>
              <p className="text-sm font-medium whitespace-nowrap">
                {hoveredMarker.name}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground whitespace-nowrap">
                  {hoveredMarker.city}, {hoveredMarker.country}
                </p>
                {(hoveredMarker.github || hoveredMarker.twitter || hoveredMarker.linkedin || hoveredMarker.threads) && (
                  <div className="flex items-center gap-1 text-muted-foreground/60">
                    {hoveredMarker.github && <GithubLogo className="w-2.5 h-2.5" />}
                    {hoveredMarker.twitter && <TwitterLogo className="w-2.5 h-2.5" />}
                    {hoveredMarker.linkedin && <LinkedinLogo className="w-2.5 h-2.5" colorScheme="grayscale" />}
                    {hoveredMarker.threads && <ThreadsLogo className="w-2.5 h-2.5" />}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={`w-2 h-2 ${config.tooltipArrowBg} border-b border-r ${config.tooltipArrowBorder} rotate-45 mx-auto -mt-1`} />
        </div>
      )}
    </div>
  );
}
