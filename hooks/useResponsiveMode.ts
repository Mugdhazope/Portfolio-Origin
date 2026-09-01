"use client";

import { useEffect, useState } from "react";

export type ResponsiveMode = "desktop" | "tablet" | "mobile";

function getResponsiveMode(): ResponsiveMode {
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1200) return "tablet";
  return "desktop";
}

export function useResponsiveMode() {
  const [mode, setMode] = useState<ResponsiveMode | null>(null);

  useEffect(() => {
    const updateMode = () => setMode(getResponsiveMode());
    updateMode();
    window.addEventListener("resize", updateMode);
    window.addEventListener("orientationchange", updateMode);
    return () => {
      window.removeEventListener("resize", updateMode);
      window.removeEventListener("orientationchange", updateMode);
    };
  }, []);

  return mode;
}
