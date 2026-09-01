"use client";

import { Desktop } from "@/components/Desktop";
import { MobileHomeScreen } from "@/components/mobile/MobileHomeScreen";
import { TabletWorkspace } from "@/components/tablet/TabletWorkspace";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";

export function ResponsiveExperience() {
  const mode = useResponsiveMode();

  if (mode === "mobile") return <MobileHomeScreen />;
  if (mode === "tablet") return <TabletWorkspace />;
  if (mode === "desktop") return <Desktop />;
  return <div className="responsive-loading-shell" aria-hidden="true" />;
}
