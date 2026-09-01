"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type WindowKind =
  | "project"
  | "projects"
  | "directory"
  | "document"
  | "documentation"
  | "contact"
  | "preview"
  | "research"
  | "collaborator"
  | "resume";

export type DirectoryId = "projects" | "research" | "collaborators" | "other-projects";

export type ManagedWindow = {
  id: string;
  kind: WindowKind;
  title: string;
  projectId?: string;
  documentId?: string;
  directoryId?: DirectoryId;
  researchId?: string;
  collaboratorId?: string;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
};

export type WindowRequest = Omit<
  ManagedWindow,
  "zIndex" | "isMinimized" | "isMaximized" | "position"
> & {
  position?: { x: number; y: number };
};

const startingPosition = (index: number) => ({
  x: 170 + (index % 4) * 38,
  y: 88 + (index % 4) * 32,
});

const WINDOW_POSITION_KEY = "origin4-window-positions-v1";

type StoredWindowPositions = Record<string, { x: number; y: number }>;

export function useWindowManager() {
  const [windows, setWindows] = useState<ManagedWindow[]>([]);
  const [storedPositions, setStoredPositions] = useState<StoredWindowPositions>({});
  const [positionsHydrated, setPositionsHydrated] = useState(false);
  const zIndex = useRef(20);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(WINDOW_POSITION_KEY);
        if (stored) setStoredPositions(JSON.parse(stored) as StoredWindowPositions);
      } catch {
        setStoredPositions({});
      }
      setPositionsHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!positionsHydrated) return;
    window.localStorage.setItem(WINDOW_POSITION_KEY, JSON.stringify(storedPositions));
  }, [positionsHydrated, storedPositions]);

  const focusWindow = useCallback((id: string) => {
    const nextZIndex = zIndex.current + 1;
    zIndex.current = nextZIndex;
    setWindows((current) =>
      current.map((window) =>
        window.id === id ? { ...window, zIndex: nextZIndex } : window,
      ),
    );
  }, []);

  const openWindow = useCallback(
    (request: WindowRequest) => {
      const nextZIndex = zIndex.current + 1;
      zIndex.current = nextZIndex;
      setWindows((current) => {
        const existing = current.find((window) => window.id === request.id);
        if (existing) {
          return current.map((window) =>
            window.id === request.id
              ? {
                  ...window,
                  zIndex: nextZIndex,
                  isMinimized: false,
                  isMaximized: false,
                }
              : window,
          );
        }

        return [
          ...current,
          {
            ...request,
            zIndex: nextZIndex,
            isMinimized: false,
            isMaximized: false,
            position:
              storedPositions[request.id] ??
              request.position ??
              startingPosition(current.length),
          },
        ];
      });
    },
    [storedPositions],
  );

  const closeWindow = useCallback((id: string) => {
    setWindows((current) => current.filter((window) => window.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((current) =>
      current.map((window) =>
        window.id === id ? { ...window, isMinimized: true } : window,
      ),
    );
  }, []);

  const restoreWindow = useCallback(
    (id: string) => {
      setWindows((current) =>
        current.map((window) =>
          window.id === id ? { ...window, isMinimized: false } : window,
        ),
      );
      focusWindow(id);
    },
    [focusWindow],
  );

  const toggleMaximize = useCallback((id: string) => {
    setWindows((current) =>
      current.map((window) =>
        window.id === id
          ? { ...window, isMaximized: !window.isMaximized }
          : window,
      ),
    );
  }, []);

  const moveWindow = useCallback((id: string, position: { x: number; y: number }) => {
    const nextPosition = {
      x: Math.max(0, position.x),
      y: Math.max(0, position.y),
    };
    setWindows((current) =>
      current.map((window) =>
        window.id === id ? { ...window, position: nextPosition } : window,
      ),
    );
    setStoredPositions((current) => ({ ...current, [id]: nextPosition }));
  }, []);

  const closeAll = useCallback(() => setWindows([]), []);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    restoreWindow,
    focusWindow,
    toggleMaximize,
    moveWindow,
    closeAll,
  };
}
