"use client";

import {
  Download,
  FolderKanban,
  Home,
  Mail,
  Route,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";
import { personalLinks } from "@/data/personal";

type MinimizedWindow = {
  id: string;
  title: string;
};

type DockProps = {
  onHome: () => void;
  onProjects: () => void;
  onResearch: () => void;
  onAbout: () => void;
  onApproach: () => void;
  onContact: () => void;
  onResume: () => void;
  onManifesto: () => void;
  activeWindowIds: string[];
  minimizedWindows: MinimizedWindow[];
  onRestore: (id: string) => void;
};

export function Dock({
  onHome,
  onProjects,
  onResearch,
  onAbout,
  onApproach,
  onContact,
  onResume,
  onManifesto,
  activeWindowIds,
  minimizedWindows,
  onRestore,
}: DockProps) {
  const items = [
    { label: "Home", icon: Home, action: onHome, id: "home" },
    { label: "Projects", icon: FolderKanban, action: onProjects, id: "projects" },
    { label: "Research", icon: Search, action: onResearch, id: "directory:research" },
    { label: "About", icon: UserRound, action: onAbout, id: "document:about" },
    { label: "Approach", icon: Route, action: onApproach, id: "document:approach" },
    { label: "Contact", icon: Mail, action: onContact, id: "contact" },
  ];

  return (
    <nav className="dock" aria-label="Workspace dock">
      <div className="dock-group">
        {items.map(({ label, icon: Icon, action, id }) => (
          <button
            type="button"
            className={`dock-item ${activeWindowIds.includes(id) ? "is-active" : ""}`}
            key={label}
            onClick={action}
            aria-label={label}
            title={label}
          >
            <Icon size={19} strokeWidth={1.65} />
            <span className="dock-tooltip">{label}</span>
          </button>
        ))}
      </div>
      <span className="dock-divider" aria-hidden="true" />
      <div className="dock-group">
        {minimizedWindows.map((window) => (
          <button
            type="button"
            className="dock-item dock-item--minimized"
            key={window.id}
            onClick={() => onRestore(window.id)}
            aria-label={`Restore ${window.title}`}
            title={`Restore ${window.title}`}
          >
            <FolderKanban size={17} strokeWidth={1.65} />
            <span className="dock-tooltip">Restore {window.title}</span>
          </button>
        ))}
        <button type="button" className={`dock-item ${activeWindowIds.includes("resume") ? "is-active" : ""}`} onClick={onResume} aria-label="Open resume" title="Resume">
          <Download size={18} strokeWidth={1.65} />
          <span className="dock-tooltip">Resume</span>
        </button>
        <button
          type="button"
          className={`dock-item ${activeWindowIds.includes("document:manifesto") ? "is-active" : ""}`}
          onClick={onManifesto}
          aria-label="Open manifesto"
          title="Manifesto"
        >
          <Sparkles size={18} strokeWidth={1.65} />
          <span className="dock-tooltip">Manifesto</span>
        </button>
        <a className="dock-item" href={`mailto:${personalLinks.email}`} aria-label="Email Origin4" title="Email">
          <Mail size={18} strokeWidth={1.65} />
          <span className="dock-tooltip">Mail</span>
        </a>
      </div>
    </nav>
  );
}
