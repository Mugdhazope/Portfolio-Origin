"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Home, Mail, PanelsTopLeft, Search, UserRound, X } from "lucide-react";
import { ProjectWindow } from "@/components/ProjectWindow";
import { DocumentationWindow } from "@/components/DocumentationWindow";
import { origin4Positioning } from "@/data/personal";
import { getProject, primaryProjects, type Project } from "@/data/projects";
import { getResearchProject, researchProjects } from "@/data/research";
import { MobileDocumentScreen } from "@/components/mobile/MobileScreens";
import { useTabletLayout, type TabletObjectId } from "@/hooks/useTabletLayout";
import { TabletObject } from "@/components/tablet/TabletObject";

const folderObjects: Array<{ id: TabletObjectId; label: string; subtitle: string; accent: string; projectId?: string }> = [
  projectFolder("mesh"),
  projectFolder("morph"),
  projectFolder("hune"),
  { id: "research", label: "RESEARCH", subtitle: "Systems + Notes", accent: "#a9bcff" },
  { id: "other", label: "OTHER PROJECTS", subtitle: "Selected Work", accent: "#f08dbd", projectId: "other-projects" },
];

function projectFolder(projectId: string) {
  const project = getProject(projectId);
  return {
    id: projectId === "hune" ? "hune" as const : projectId as "mesh" | "morph",
    label: project?.name ?? projectId.toUpperCase(),
    subtitle: project?.shortLabel ?? "Project",
    accent: project?.accent ?? "#c8ee3d",
    projectId,
  };
}

type TabletPanel =
  | { kind: "project"; project: Project }
  | { kind: "documentation"; project: Project }
  | { kind: "document"; documentId: string }
  | { kind: "research"; researchId: string };

export function TabletWorkspace() {
  const { layout, focusObject, moveObject } = useTabletLayout();
  const [panel, setPanel] = useState<TabletPanel | null>(null);

  const openFolder = (folder: typeof folderObjects[number]) => {
    if (folder.projectId) {
      const project = getProject(folder.projectId);
      if (project) setPanel({ kind: "project", project });
    } else if (folder.id === "research") {
      setPanel({ kind: "research", researchId: researchProjects[0]?.id ?? "" });
    }
  };

  const openDocument = (documentId: string) => setPanel({ kind: "document", documentId });
  const openDocumentation = (project: Project) => setPanel({ kind: "documentation", project });

  const toggleProjectsPanel = () => {
    if (panel?.kind === "project") {
      setPanel(null);
      return;
    }
    setPanel({ kind: "project", project: primaryProjects[0]! });
  };

  const toggleResearchPanel = () => {
    if (panel?.kind === "research") {
      setPanel(null);
      return;
    }
    setPanel({ kind: "research", researchId: researchProjects[0]?.id ?? "" });
  };

  const toggleDocumentPanel = (documentId: string) => {
    if (panel?.kind === "document" && panel.documentId === documentId) {
      setPanel(null);
      return;
    }
    setPanel({ kind: "document", documentId });
  };

  return (
    <main className="tablet-shell">
      <div className="tablet-brand" aria-hidden="true">
        <small>{origin4Positioning.kicker}</small>
        <span>ORIGIN4</span>
      </div>

      <TabletObject
        id="workspace"
        position={layout.workspace}
        className="tablet-object--workspace"
        onFocus={() => focusObject("workspace")}
        onMove={moveObject}
      >
        <aside className="tablet-workspace-panel">
          <span className="tablet-kicker">ORIGIN4 / WORKSPACE</span>
          <nav className="tablet-nav" aria-label="Tablet workspace navigation">
            <button type="button" onClick={() => setPanel(null)}><Home size={17} /> HOME</button>
            <button type="button" onClick={toggleProjectsPanel}><PanelsTopLeft size={17} /> PROJECTS</button>
            <button type="button" onClick={toggleResearchPanel}><Search size={17} /> RESEARCH</button>
            <button type="button" onClick={() => toggleDocumentPanel("about")}><UserRound size={17} /> ABOUT</button>
            <button type="button" onClick={() => toggleDocumentPanel("contact")}><Mail size={17} /> CONTACT</button>
          </nav>
        </aside>
      </TabletObject>

      {folderObjects.map((folder) => (
        <TabletObject
          key={folder.id}
          id={folder.id}
          position={layout[folder.id]}
          className="tablet-object--folder"
          onFocus={() => focusObject(folder.id)}
          onMove={moveObject}
          onOpen={() => openFolder(folder)}
        >
          <button className="tablet-folder-button" type="button" onClick={() => openFolder(folder)}>
            <span className="tablet-folder-glyph" style={{ "--folder-accent": folder.accent } as React.CSSProperties}><span /></span>
            <strong>{folder.label}</strong>
            <small>{folder.subtitle}</small>
          </button>
        </TabletObject>
      ))}

      <nav className="tablet-dock" aria-label="Tablet navigation">
        <button type="button" onClick={() => setPanel(null)}><Home size={18} /> HOME</button>
        <button type="button" onClick={toggleProjectsPanel}><PanelsTopLeft size={18} /> PROJECTS</button>
        <button type="button" onClick={() => toggleDocumentPanel("about")}><UserRound size={18} /> ABOUT</button>
        <button type="button" onClick={() => toggleDocumentPanel("contact")}><Mail size={18} /> CONTACT</button>
      </nav>

      <AnimatePresence>
        {panel ? (
          <motion.section className="tablet-panel-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.section className="tablet-panel" initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }} transition={{ duration: 0.28 }} aria-label="Open Origin4 panel">
              <button className="tablet-panel-close" type="button" onClick={() => setPanel(null)} aria-label="Close panel"><X size={20} /></button>
              {panel.kind === "project" ? (
                <ProjectWindow project={panel.project} onOpenProject={(project) => setPanel({ kind: "project", project })} onOpenDocument={openDocument} onOpenDocumentation={openDocumentation} />
              ) : panel.kind === "documentation" ? (
                <DocumentationWindow project={panel.project} onOpenDocument={openDocument} />
              ) : panel.kind === "document" ? (
                <MobileDocumentScreen documentId={panel.documentId} onBack={() => setPanel(null)} />
              ) : (
                <TabletResearchPanel researchId={panel.researchId} onOpenResearch={(researchId) => setPanel({ kind: "research", researchId })} />
              )}
            </motion.section>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </main>
  );
}

function TabletResearchPanel({ researchId, onOpenResearch }: { researchId: string; onOpenResearch: (id: string) => void }) {
  const research = getResearchProject(researchId);
  return (
    <article className="tablet-info-panel">
      <span className="tablet-kicker">ORIGIN4 / RESEARCH</span>
      <h2>{research?.name ?? "Research"}<span className="accent-dot">.</span></h2>
      <p>{research?.description}</p>
      <div className="tablet-list">
        {researchProjects.map((item) => <button key={item.id} type="button" onClick={() => onOpenResearch(item.id)}>{item.name}<ArrowUpRight size={15} /></button>)}
      </div>
    </article>
  );
}
