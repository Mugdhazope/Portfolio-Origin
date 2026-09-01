"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type TabletObjectId = "workspace" | "mesh" | "morph" | "hune" | "research" | "other";
export type TabletPosition = { x: number; y: number; zIndex: number };

const bounds: Record<TabletObjectId, { width: number; height: number }> = {
  workspace: { width: 220, height: 290 },
  mesh: { width: 150, height: 130 },
  morph: { width: 150, height: 130 },
  hune: { width: 150, height: 130 },
  research: { width: 150, height: 130 },
  other: { width: 150, height: 130 },
};

function createTabletLayout(width: number, height: number): Record<TabletObjectId, TabletPosition> {
  const landscape = width >= height;
  if (landscape) {
    const right = Math.max(390, width - 530);
    return {
      workspace: { x: 28, y: 48, zIndex: 20 },
      mesh: { x: right, y: 150, zIndex: 12 },
      morph: { x: right + 175, y: 150, zIndex: 12 },
      hune: { x: right + 350, y: 150, zIndex: 12 },
      research: { x: right, y: 330, zIndex: 12 },
      other: { x: right + 175, y: 330, zIndex: 12 },
    };
  }
  return {
    workspace: { x: 24, y: 46, zIndex: 20 },
    mesh: { x: Math.max(270, width - 350), y: 250, zIndex: 12 },
    morph: { x: Math.max(445, width - 175), y: 250, zIndex: 12 },
    hune: { x: Math.max(270, width - 350), y: 410, zIndex: 12 },
    research: { x: Math.max(445, width - 175), y: 410, zIndex: 12 },
    other: { x: Math.max(270, width - 350), y: 570, zIndex: 12 },
  };
}

function clamp(id: TabletObjectId, position: TabletPosition) {
  if (typeof window === "undefined") return position;
  const size = bounds[id];
  return {
    ...position,
    x: Math.min(Math.max(0, position.x), Math.max(0, window.innerWidth - size.width)),
    y: Math.min(Math.max(0, position.y), Math.max(0, window.innerHeight - size.height)),
  };
}

export function useTabletLayout() {
  const [layout, setLayout] = useState(() =>
    createTabletLayout(
      typeof window === "undefined" ? 1024 : window.innerWidth,
      typeof window === "undefined" ? 768 : window.innerHeight,
    ),
  );
  const nextZ = useRef(20);
  const hasMovedObject = useRef(false);

  useEffect(() => {
    const handleResize = () => setLayout((current) => {
      if (!hasMovedObject.current) {
        return createTabletLayout(window.innerWidth, window.innerHeight);
      }
      const next = { ...current };
      (Object.keys(next) as TabletObjectId[]).forEach((id) => { next[id] = clamp(id, next[id]); });
      return next;
    });
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  const focusObject = useCallback((id: TabletObjectId) => {
    nextZ.current += 1;
    setLayout((current) => ({ ...current, [id]: { ...current[id], zIndex: nextZ.current } }));
  }, []);

  const moveObject = useCallback((id: TabletObjectId, x: number, y: number) => {
    hasMovedObject.current = true;
    setLayout((current) => ({ ...current, [id]: clamp(id, { ...current[id], x, y }) }));
  }, []);

  return { layout, focusObject, moveObject };
}
