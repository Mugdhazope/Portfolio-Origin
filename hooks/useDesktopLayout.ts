"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type DesktopPosition = {
  x: number;
  y: number;
  zIndex: number;
};

export type DesktopObjectId =
  | "workspace"
  | "profile"
  | "availability"
  | "featured"
  | "mesh-folder"
  | "morph-folder"
  | "hune-folder"
  | "other-folder"
  | "research-folder"
  | "collaborators-folder"
  | "about-file"
  | "experience-file"
  | "approach-file"
  | "resume-file"
  | "contact-file"
  | "manifesto-file";

const STORAGE_KEY = "origin4-desktop-layout-v2";
const DEFAULT_Z_INDEX = 10;

export const DEFAULT_DESKTOP_LAYOUT: Record<DesktopObjectId, DesktopPosition> = {
  workspace: { x: 28, y: 40, zIndex: 30 },
  profile: { x: 28, y: 520, zIndex: 24 },
  availability: { x: 1190, y: 40, zIndex: 24 },
  featured: { x: 1050, y: 520, zIndex: 18 },
  "mesh-folder": { x: 760, y: 140, zIndex: 12 },
  "morph-folder": { x: 930, y: 140, zIndex: 12 },
  "hune-folder": { x: 1100, y: 140, zIndex: 12 },
  "research-folder": { x: 760, y: 320, zIndex: 8 },
  "other-folder": { x: 930, y: 320, zIndex: 8 },
  "collaborators-folder": { x: 1100, y: 320, zIndex: 8 },
  "about-file": { x: 28, y: 760, zIndex: 8 },
  "experience-file": { x: 100, y: 760, zIndex: 8 },
  "approach-file": { x: 172, y: 760, zIndex: 8 },
  "resume-file": { x: 244, y: 760, zIndex: 8 },
  "contact-file": { x: 316, y: 760, zIndex: 8 },
  "manifesto-file": { x: 388, y: 760, zIndex: 8 },
};

const mobileDesktopLayout: Record<DesktopObjectId, DesktopPosition> = {
  workspace: { x: 15, y: 64, zIndex: 30 },
  profile: { x: 15, y: 570, zIndex: 24 },
  availability: { x: 205, y: 570, zIndex: 24 },
  featured: { x: 15, y: 390, zIndex: 18 },
  "mesh-folder": { x: 15, y: 210, zIndex: 12 },
  "morph-folder": { x: 215, y: 210, zIndex: 12 },
  "hune-folder": { x: 15, y: 325, zIndex: 12 },
  "other-folder": { x: 215, y: 325, zIndex: 12 },
  "research-folder": { x: 15, y: 440, zIndex: 12 },
  "collaborators-folder": { x: 215, y: 440, zIndex: 12 },
  "about-file": { x: 15, y: 705, zIndex: 14 },
  "experience-file": { x: 100, y: 705, zIndex: 14 },
  "approach-file": { x: 185, y: 705, zIndex: 14 },
  "resume-file": { x: 270, y: 705, zIndex: 14 },
  "contact-file": { x: 100, y: 780, zIndex: 14 },
  "manifesto-file": { x: 185, y: 780, zIndex: 14 },
};

const compactDesktopLayout: Record<DesktopObjectId, DesktopPosition> = {
  workspace: { x: 28, y: 40, zIndex: 30 },
  profile: { x: 28, y: 400, zIndex: 24 },
  availability: { x: 806, y: 40, zIndex: 24 },
  featured: { x: 700, y: 470, zIndex: 18 },
  "mesh-folder": { x: 560, y: 140, zIndex: 12 },
  "morph-folder": { x: 700, y: 140, zIndex: 12 },
  "hune-folder": { x: 840, y: 140, zIndex: 12 },
  "research-folder": { x: 560, y: 300, zIndex: 12 },
  "other-folder": { x: 700, y: 300, zIndex: 12 },
  "collaborators-folder": { x: 840, y: 300, zIndex: 12 },
  "about-file": { x: 28, y: 550, zIndex: 8 },
  "experience-file": { x: 100, y: 550, zIndex: 8 },
  "approach-file": { x: 172, y: 550, zIndex: 8 },
  "resume-file": { x: 244, y: 550, zIndex: 8 },
  "contact-file": { x: 316, y: 550, zIndex: 8 },
  "manifesto-file": { x: 388, y: 550, zIndex: 8 },
};

type StoredLayout = Partial<Record<DesktopObjectId, Partial<DesktopPosition>>>;
type ObjectBounds = { width: number; height: number };

const objectBounds: Record<DesktopObjectId, ObjectBounds> = {
  workspace: { width: 186, height: 460 },
  profile: { width: 186, height: 116 },
  availability: { width: 190, height: 106 },
  featured: { width: 300, height: 206 },
  "mesh-folder": { width: 145, height: 125 },
  "morph-folder": { width: 145, height: 125 },
  "hune-folder": { width: 145, height: 125 },
  "other-folder": { width: 145, height: 125 },
  "research-folder": { width: 145, height: 125 },
  "collaborators-folder": { width: 145, height: 125 },
  "about-file": { width: 64, height: 80 },
  "experience-file": { width: 64, height: 80 },
  "approach-file": { width: 64, height: 80 },
  "resume-file": { width: 64, height: 80 },
  "contact-file": { width: 64, height: 80 },
  "manifesto-file": { width: 64, height: 80 },
};

function clampPosition(id: DesktopObjectId, position: DesktopPosition): DesktopPosition {
  if (typeof window === "undefined") return position;
  const bounds = id === "workspace"
    ? window.innerWidth <= 760
      ? { width: Math.max(186, window.innerWidth - 30), height: 120 }
      : window.innerWidth <= 1100
        ? { width: 186, height: 240 }
        : objectBounds[id]
    : id.includes("folder")
      ? window.innerWidth <= 760
        ? { width: 110, height: 105 }
        : window.innerWidth <= 1100
          ? { width: 110, height: 105 }
          : objectBounds[id]
      : objectBounds[id];
  const maxX = Math.max(0, window.innerWidth - bounds.width);
  const maxY = Math.max(0, window.innerHeight - bounds.height);
  return {
    ...position,
    x: Math.min(Math.max(0, position.x), maxX),
    y: Math.min(Math.max(0, position.y), maxY),
  };
}

function readStoredLayout(): StoredLayout {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    const parsed: unknown = JSON.parse(stored);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as StoredLayout;
  } catch {
    return {};
  }
}

function createDefaultLayout(viewportWidth: number, viewportHeight: number) {
  if (viewportWidth <= 760) {
    const folderTop = viewportHeight < 830 ? 300 : 400;
    const folderGap = 105;
    const folderRows = [folderTop, folderTop + folderGap, folderTop + folderGap * 2];
    const folderColumn = Math.max(125, viewportWidth - 175);
    const profileY = folderRows[2] + 125;
    return {
      ...mobileDesktopLayout,
      availability: { x: folderColumn, y: profileY, zIndex: 24 },
      profile: { x: 15, y: profileY, zIndex: 24 },
      "mesh-folder": { x: 15, y: folderRows[0], zIndex: 12 },
      "morph-folder": { x: folderColumn, y: folderRows[0], zIndex: 12 },
      "hune-folder": { x: 15, y: folderRows[1], zIndex: 12 },
      "other-folder": { x: folderColumn, y: folderRows[1], zIndex: 12 },
      "research-folder": { x: 15, y: folderRows[2], zIndex: 12 },
      "collaborators-folder": { x: folderColumn, y: folderRows[2], zIndex: 12 },
    };
  }

  if (viewportWidth <= 1100) {
    const folderWidth = 110;
    const folderGap = 20;
    const folderZoneStart = Math.max(400, viewportWidth - (folderWidth * 3 + folderGap * 2) - 30);
    const folderColumns = [0, 1, 2].map(
      (column) => folderZoneStart + column * (folderWidth + folderGap),
    );
    const folderRows = viewportWidth < 900 ? [140, 285, 430] : [140, 300];
    const folderPositions = viewportWidth < 900
      ? [
          ["mesh-folder", 0, 0],
          ["morph-folder", 1, 0],
          ["hune-folder", 0, 1],
          ["research-folder", 1, 1],
          ["other-folder", 0, 2],
          ["collaborators-folder", 1, 2],
        ] as const
      : [
          ["mesh-folder", 0, 0],
          ["morph-folder", 1, 0],
          ["hune-folder", 2, 0],
          ["research-folder", 0, 1],
          ["other-folder", 1, 1],
          ["collaborators-folder", 2, 1],
        ] as const;
    const folders = Object.fromEntries(
      folderPositions.map(([id, column, row]) => [
        id,
        { x: folderColumns[column], y: folderRows[row], zIndex: 12 },
      ]),
    ) as Partial<Record<DesktopObjectId, DesktopPosition>>;

    return {
      ...compactDesktopLayout,
      availability: { x: Math.max(folderZoneStart, viewportWidth - 220), y: 40, zIndex: 24 },
      featured: {
        x: viewportWidth < 900 ? 28 : Math.max(folderZoneStart, viewportWidth - 324),
        y: Math.max(500, viewportHeight - 260),
        zIndex: 18,
      },
      ...folders,
    };
  }

  const folderWidth = 145;
  const folderGap = Math.max(25, Math.min(45, Math.round(viewportWidth * 0.03)));
  const folderZoneStart = Math.max(620, Math.round(viewportWidth * 0.53));
  const folderColumns = [0, 1, 2].map(
    (column) => folderZoneStart + column * (folderWidth + folderGap),
  );
  const folderRows = [140, 320];
  const folderPositions = [
    ["mesh-folder", 0, 0],
    ["morph-folder", 1, 0],
    ["hune-folder", 2, 0],
    ["research-folder", 0, 1],
    ["other-folder", 1, 1],
    ["collaborators-folder", 2, 1],
  ] as const;
  const folders = Object.fromEntries(
    folderPositions.map(([id, column, row]) => [
      id,
      { x: folderColumns[column], y: folderRows[row], zIndex: 12 },
    ]),
  ) as Partial<Record<DesktopObjectId, DesktopPosition>>;

  return {
    ...DEFAULT_DESKTOP_LAYOUT,
    availability: { x: viewportWidth - 220, y: 40, zIndex: 24 },
    featured: {
      x: viewportWidth - 390,
      y: Math.min(520, Math.max(470, viewportHeight - 280)),
      zIndex: 18,
    },
    ...folders,
  };
}

function hydrateLayout(): Record<DesktopObjectId, DesktopPosition> {
  const stored = readStoredLayout();
  const hydrated = createDefaultLayout(window.innerWidth, window.innerHeight);
  (Object.keys(hydrated) as DesktopObjectId[]).forEach((id) => {
    const saved = stored[id];
    hydrated[id] = clampPosition(
      id,
      saved && typeof saved.x === "number" && typeof saved.y === "number"
        ? {
            x: saved.x,
            y: saved.y,
            zIndex: typeof saved.zIndex === "number" ? saved.zIndex : hydrated[id].zIndex,
          }
        : hydrated[id],
    );
  });
  return hydrated;
}

export function useDesktopLayout() {
  const [layout, setLayout] = useState(DEFAULT_DESKTOP_LAYOUT);
  const [hydrated, setHydrated] = useState(false);
  const nextZIndex = useRef(DEFAULT_Z_INDEX);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedLayout = hydrateLayout();
      const highestZIndex = Math.max(...Object.values(storedLayout).map((item) => item.zIndex));
      nextZIndex.current = Math.max(DEFAULT_Z_INDEX, highestZIndex);
      setLayout(storedLayout);
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  }, [hydrated, layout]);

  useEffect(() => {
    const handleResize = () => {
      setLayout((current) => {
        const next = { ...current };
        (Object.keys(next) as DesktopObjectId[]).forEach((id) => {
          next[id] = clampPosition(id, next[id]);
        });
        return next;
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const focusObject = useCallback((id: DesktopObjectId) => {
    nextZIndex.current += 1;
    setLayout((current) => ({
      ...current,
      [id]: { ...current[id], zIndex: nextZIndex.current },
    }));
  }, []);

  const moveObject = useCallback((id: DesktopObjectId, x: number, y: number) => {
    setLayout((current) => ({
      ...current,
      [id]: clampPosition(id, { ...current[id], x, y }),
    }));
  }, []);

  const resetLayout = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    const defaults = createDefaultLayout(window.innerWidth, window.innerHeight);
    const clampedDefaults = { ...defaults };
    (Object.keys(clampedDefaults) as DesktopObjectId[]).forEach((id) => {
      clampedDefaults[id] = clampPosition(id, clampedDefaults[id]);
    });
    setLayout(clampedDefaults);
    nextZIndex.current = Math.max(
      DEFAULT_Z_INDEX,
      ...Object.values(clampedDefaults).map((item) => item.zIndex),
    );
  }, []);

  return {
    layout,
    hydrated,
    focusObject,
    moveObject,
    resetLayout,
  };
}
