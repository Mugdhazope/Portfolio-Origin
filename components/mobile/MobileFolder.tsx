"use client";

import { motion } from "framer-motion";
import type { MobileApp } from "@/data/mobileApps";
import { MobileAppIcon } from "@/components/mobile/MobileAppIcon";

type MobileFolderProps = {
  app: MobileApp;
  items: MobileApp[];
  onOpen: (app: MobileApp) => void;
  onClose: () => void;
};

export function MobileFolder({ app, items, onOpen, onClose }: MobileFolderProps) {
  return (
    <motion.div
      className="mobile-folder-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="presentation"
    >
      <motion.section
        className="mobile-folder-panel"
        initial={{ opacity: 0, scale: 0.84, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 12 }}
        transition={{ duration: 0.25 }}
        onClick={(event) => event.stopPropagation()}
        aria-label={`${app.label} folder`}
      >
        <div className="mobile-folder-heading">
          <span className="mobile-kicker">ORIGIN4 / FOLDER</span>
          <h2>{app.label}</h2>
          <p>{app.subtitle}</p>
        </div>
        <div className="mobile-folder-grid">
          {items.map((item) => <MobileAppIcon key={item.id} app={item} onOpen={onOpen} />)}
        </div>
        <button className="mobile-folder-close" type="button" onClick={onClose}>DONE</button>
      </motion.section>
    </motion.div>
  );
}
