"use client";

import { motion } from "framer-motion";
import { mobileDockApps, type MobileApp } from "@/data/mobileApps";
import { MobileAppIcon } from "@/components/mobile/MobileAppIcon";

type MobileDockProps = {
  onOpen: (app: MobileApp) => void;
  onHome: () => void;
};

export function MobileDock({ onOpen, onHome }: MobileDockProps) {
  return (
    <motion.nav className="mobile-dock" aria-label="Origin4 mobile navigation">
      {mobileDockApps.slice(0, 4).map((app) => (
        <MobileAppIcon
          key={app.id}
          app={app}
          onOpen={app.id === "home" ? () => onHome() : onOpen}
        />
      ))}
    </motion.nav>
  );
}
