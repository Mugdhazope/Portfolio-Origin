"use client";

import { motion } from "framer-motion";
import type { MobileApp } from "@/data/mobileApps";

type MobileAppIconProps = {
  app: MobileApp;
  onOpen: (app: MobileApp) => void;
  layoutId?: string;
};

export function MobileAppIcon({ app, onOpen, layoutId }: MobileAppIconProps) {
  return (
    <motion.button
      className="mobile-app"
      type="button"
      onClick={() => onOpen(app)}
      whileTap={{ scale: 0.9, filter: "brightness(1.2)" }}
      layoutId={layoutId}
      aria-label={`Open ${app.label}, ${app.subtitle}`}
    >
      <span
        className={`mobile-app-glyph mobile-app-glyph--${app.glyph}`}
        style={{ "--app-accent": app.accent } as React.CSSProperties}
        aria-hidden="true"
      >
        <span />
      </span>
      <span className="mobile-app-label">{app.label}</span>
      <span className="mobile-app-subtitle">{app.subtitle}</span>
    </motion.button>
  );
}
