"use client";

import { useMemo, useRef, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowDown,
  Compass,
  FileText,
  FolderOpen,
  Home,
  Mail,
  PanelsTopLeft,
  Route,
  RotateCcw,
  Search,
  UserRound,
} from "lucide-react";
import {
  activeProjects,
  archiveProjects,
  getProject,
  primaryProjects,
  type Project,
} from "@/data/projects";
import { navigationItems, type NavigationId } from "@/data/navigation";
import {
  useDesktopLayout,
  type DesktopObjectId,
  type DesktopPosition,
} from "@/hooks/useDesktopLayout";
import { DesktopObject } from "@/components/DesktopObject";
// import { Dock } from "@/components/Dock";
import { FolderIcon } from "@/components/FolderIcon";
import { Window } from "@/components/Window";
import { ProjectArtwork, ProjectWindow } from "@/components/ProjectWindow";
import { TextWindow } from "@/components/TextWindow";
import { ContactWindow } from "@/components/ContactWindow";
import { FinderWindow, type FinderEntry } from "@/components/FinderWindow";
import { ResearchWindow } from "@/components/ResearchWindow";
import { CollaboratorWindow } from "@/components/CollaboratorWindow";
import { ResumeWindow } from "@/components/ResumeWindow";
import { DocumentationWindow } from "@/components/DocumentationWindow";
import { ProfileSocialLinks } from "@/components/ProfileSocialLinks";
import { collaborators, getCollaborator } from "@/data/collaborators";
import { getResearchProject, researchProjects } from "@/data/research";
import { origin4Positioning } from "@/data/personal";
import {
  useWindowManager,
  type DirectoryId,
  type ManagedWindow,
} from "@/hooks/useWindowManager";

const navigationIcons = {
  home: Home,
  projects: PanelsTopLeft,
  research: Search,
  about: UserRound,
  experience: FileText,
  approach: Route,
  contact: Mail,
  resume: FileText,
};

const folderObjectIds: Record<string, DesktopObjectId> = {
  mesh: "mesh-folder",
  morph: "morph-folder",
  hune: "hune-folder",
  "other-projects": "other-folder",
};

const directoryFolders = [
  { id: "research-folder" as const, name: "RESEARCH", shortLabel: "Systems + Notes", accent: "#a9bcff" },
];

export function Desktop() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [activeNav, setActiveNav] = useState<NavigationId>("home");
  const { layout, focusObject, moveObject, resetLayout } = useDesktopLayout();
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    restoreWindow,
    focusWindow,
    moveWindow,
    toggleMaximize,
    closeAll,
  } = useWindowManager();

  const minimizedWindows = useMemo(
    () => windows.filter((window) => window.isMinimized),
    [windows],
  );

  const openDocument = (documentId: string) => {
    const titles: Record<string, string> = {
      about: "ABOUT.txt",
      approach: "APPROACH.txt",
      manifesto: "MANIFESTO.txt",
      experience: "EXPERIENCE.txt",
      contact: "CONTACT.txt",
    };
    openWindow({
      id: `document:${documentId}`,
      kind: "document",
      title: titles[documentId] ?? `${documentId.toUpperCase()}.txt`,
      documentId,
    });
    if (documentId === "about" || documentId === "approach" || documentId === "experience" || documentId === "contact") {
      setActiveNav(documentId);
    }
  };

  const openProject = (project: Project) => {
    if (project.collection) {
      openDirectory("other-projects");
      return;
    }
    openWindow({
      id: `project:${project.id}`,
      kind: "project",
      title: `${project.name} / ${project.shortLabel}`,
      projectId: project.id,
    });
    setActiveNav("projects");
  };

  const openProjects = () => {
    openWindow({
      id: "projects",
      kind: "directory",
      title: "Projects / Selected work",
      directoryId: "projects",
    });
    setActiveNav("projects");
  };

  const openDirectory = (directoryId: "research" | "collaborators" | "other-projects") => {
    const titles = {
      research: "Research / Index",
      collaborators: "Collaborators / Network",
      "other-projects": "Other projects / Archive",
    };
    openWindow({
      id: `directory:${directoryId}`,
      kind: "directory",
      title: titles[directoryId],
      directoryId,
    });
    setActiveNav(directoryId === "research" ? "research" : "projects");
  };

  const openResearch = (researchId: string) => {
    const research = getResearchProject(researchId);
    if (!research) return;
    openWindow({
      id: `research:${researchId}`,
      kind: "research",
      title: `${research.name} / Research`,
      researchId,
    });
    setActiveNav("research");
  };

  const openCollaborator = (collaboratorId: string) => {
    const collaborator = getCollaborator(collaboratorId);
    if (!collaborator) return;
    openWindow({
      id: `collaborator:${collaboratorId}`,
      kind: "collaborator",
      title: `${collaborator.name} / Collaborator`,
      collaboratorId,
    });
    setActiveNav("research");
  };

  const openResume = () => {
    openWindow({
      id: "resume",
      kind: "resume",
      title: "Resume.pdf",
    });
    setActiveNav("resume");
  };

  const openContact = () => {
    openWindow({
      id: "contact",
      kind: "contact",
      title: "Contact / New project",
    });
    setActiveNav("contact");
  };

  const openDocumentation = (project: Project) => {
    openWindow({
      id: `documentation:${project.id}`,
      kind: "documentation",
      title: `${project.name} / Documentation`,
      projectId: project.id,
    });
  };

  const goHome = () => {
    closeAll();
    setActiveNav("home");
  };

  const navigationWindowId = (id: NavigationId): string | null => {
    switch (id) {
      case "projects":
        return "projects";
      case "research":
        return "directory:research";
      case "about":
        return "document:about";
      case "experience":
        return "document:experience";
      case "approach":
        return "document:approach";
      case "contact":
        return "contact";
      case "resume":
        return "resume";
      default:
        return null;
    }
  };

  const isNavigationOpen = (id: NavigationId) => {
    const windowId = navigationWindowId(id);
    if (!windowId) return false;
    return windows.some((window) => window.id === windowId && !window.isMinimized);
  };

  const closeNavigation = (id: NavigationId) => {
    const windowId = navigationWindowId(id);
    if (windowId) closeWindow(windowId);
    setActiveNav("home");
  };

  const togglePrimaryWindow = (windowId: string, open: () => void) => {
    if (windows.some((window) => window.id === windowId && !window.isMinimized)) {
      closeWindow(windowId);
      setActiveNav("home");
      return;
    }
    open();
  };

  const handleNavigation = (id: NavigationId) => {
    if (id === "home") {
      goHome();
      return;
    }
    if (isNavigationOpen(id)) {
      closeNavigation(id);
      return;
    }
    if (id === "projects") openProjects();
    if (id === "research") openDirectory("research");
    if (id === "about") openDocument("about");
    if (id === "experience") openDocument("experience");
    if (id === "approach") openDocument("approach");
    if (id === "contact") openContact();
    if (id === "resume") openResume();
  };

  const featuredProject = getProject("mesh") ?? activeProjects[0]!;

  return (
    <MotionConfig
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      reducedMotion="user"
    >
      <main className="desktop" ref={constraintsRef}>
        <DesktopObject
          id="workspace"
          className="desktop-object--workspace"
          position={layout.workspace}
          constraintsRef={constraintsRef}
          dragHandleOnly
          onFocus={() => focusObject("workspace")}
          onMove={moveObject}
        >
        <aside className="workspace-sidebar" aria-label="Primary navigation">
          <div>
            <p className="sidebar-caption" data-desktop-drag-handle="workspace">ORIGIN4 / WORKSPACE</p>
            <nav className="sidebar-nav">
              {navigationItems.map((item) => {
                const Icon = navigationIcons[item.id];
                return (
                  <button
                    className={`sidebar-item ${activeNav === item.id ? "is-active" : ""}`}
                    type="button"
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    title={item.description}
                  >
                    <Icon size={15} strokeWidth={1.65} />
                    <span className="sidebar-item-label">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          <button className="reset-desktop" type="button" onClick={resetLayout}>
            <RotateCcw size={11} /> Reset desktop
          </button>
        </aside>
        </DesktopObject>

        <motion.section
          className="home-intro"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
        >
          <p className="home-intro-kicker"><span className="status-dot" /> {origin4Positioning.kicker}</p>
          <h1>ORIGIN<span>4</span></h1>
          <p className="home-intro-copy">{origin4Positioning.tagline}</p>
          <p className="desktop-hint"><span>↓</span> Click a folder to explore</p>
        </motion.section>

        <section className="desktop-folder-field" aria-label="Projects">
          {activeProjects.map((project) => {
            const objectId = folderObjectIds[project.id];
            if (!objectId) return null;
            return (
              <DesktopObject
                key={project.id}
                id={objectId}
                className="desktop-object--folder"
                position={layout[objectId]}
                constraintsRef={constraintsRef}
                onFocus={() => focusObject(objectId)}
                onMove={moveObject}
                onOpen={() => openProject(project)}
              >
                <FolderIcon project={project} />
              </DesktopObject>
            );
          })}
          {directoryFolders.map((folder) => (
            <DesktopObject
              key={folder.id}
              id={folder.id}
              className="desktop-object--folder desktop-object--directory"
              position={layout[folder.id]}
              constraintsRef={constraintsRef}
              onFocus={() => focusObject(folder.id)}
              onMove={moveObject}
              onOpen={() => openDirectory("research")}
            >
              <FolderIcon project={folder} />
            </DesktopObject>
          ))}
        </section>

        <DesktopObject
          id="profile"
          className="desktop-object--profile"
          position={layout.profile}
          constraintsRef={constraintsRef}
          onFocus={() => focusObject("profile")}
          onMove={moveObject}
        >
          <section
            className="profile-card"
            aria-label="Mugdha Zope profile"
            onClick={(event) => {
              if (!(event.target as HTMLElement).closest("a, button")) openDocument("about");
            }}
          >
            <button className="profile-trigger" type="button" onClick={() => openDocument("about")}>
              <span className="profile-portrait">
                <Image src="/assets/mugdha-zope.png" alt="Mugdha Zope" width={84} height={84} />
              </span>
              <span>
                <span className="profile-studio">ORIGIN4</span>
                <span className="profile-name">Mugdha Zope</span>
                <span className="profile-role">Software Engineer · Product Designer</span>
              </span>
            </button>
            <ProfileSocialLinks className="profile-links" size={13} />
          </section>
        </DesktopObject>

        <DesktopObject
          id="availability"
          className="desktop-object--availability"
          position={layout.availability}
          constraintsRef={constraintsRef}
          onFocus={() => focusObject("availability")}
          onMove={moveObject}
          onOpen={openContact}
        >
          <section className="availability-card" aria-label="Project availability">
            <span className="availability-line"><span><span className="status-dot" /> AVAILABLE</span><ArrowDown size={13} /></span>
            <span className="availability-copy">Let&apos;s build something meaningful.</span>
          </section>
        </DesktopObject>

        <DesktopObject
          id="featured"
          className="desktop-object--featured"
          position={layout.featured}
          constraintsRef={constraintsRef}
          onFocus={() => focusObject("featured")}
          onMove={moveObject}
        >
          <section className="featured-card" aria-label="Featured project">
            <div className="featured-header" data-desktop-drag-handle="featured">
              <span><span className="featured-title">{featuredProject.shortName}</span> <span className="featured-category">/ {featuredProject.shortLabel.toUpperCase()}</span></span>
              <span className="status-dot" />
            </div>
            <button className="featured-button" type="button" onClick={() => openProject(featuredProject)}>
              <div className="featured-art"><ProjectArtwork project={featuredProject} /></div>
            </button>
            <div className="featured-footer">
              <span>{featuredProject.status.toUpperCase()}</span>
              <button className="text-link" type="button" onClick={() => openProject(featuredProject)}>OPEN <FolderOpen size={12} /></button>
            </div>
          </section>
        </DesktopObject>

        <section className="desktop-files" aria-label="Desktop documents">
          <DesktopFile id="about-file" filename="about.txt" icon={<FileText size={13} />} position={layout["about-file"]} constraintsRef={constraintsRef} onFocus={focusObject} onMove={moveObject} onOpen={() => openDocument("about")} />
          <DesktopFile id="experience-file" filename="experience.txt" icon={<FileText size={13} />} position={layout["experience-file"]} constraintsRef={constraintsRef} onFocus={focusObject} onMove={moveObject} onOpen={() => openDocument("experience")} />
          <DesktopFile id="approach-file" filename="approach.txt" icon={<Compass size={13} />} position={layout["approach-file"]} constraintsRef={constraintsRef} onFocus={focusObject} onMove={moveObject} onOpen={() => openDocument("approach")} />
          <DesktopFile id="resume-file" filename="resume.pdf" icon={<FileText size={13} />} position={layout["resume-file"]} constraintsRef={constraintsRef} onFocus={focusObject} onMove={moveObject} onOpen={openResume} />
          <DesktopFile id="contact-file" filename="contact.txt" icon={<Mail size={13} />} position={layout["contact-file"]} constraintsRef={constraintsRef} onFocus={focusObject} onMove={moveObject} onOpen={() => openDocument("contact")} />
          <DesktopFile id="manifesto-file" filename="manifesto.txt" icon={<SparkIcon />} position={layout["manifesto-file"]} constraintsRef={constraintsRef} onFocus={focusObject} onMove={moveObject} onOpen={() => openDocument("manifesto")} />
        </section>

        <section className="window-layer" aria-label="Open windows">
          {windows.filter((window) => !window.isMinimized).map((window) => (
            <DesktopWindow
              key={window.id}
              window={window}
              constraintsRef={constraintsRef}
              onFocus={() => focusWindow(window.id)}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onToggleMaximize={() => toggleMaximize(window.id)}
              onMove={moveWindow}
              onOpenProject={openProject}
              onOpenDocument={openDocument}
              onOpenDocumentation={openDocumentation}
              onOpenResearch={openResearch}
              onOpenCollaborator={openCollaborator}
            />
          ))}
        </section>

        {/* Desktop dock — hidden for now
        <Dock
          onHome={goHome}
          onProjects={() => handleNavigation("projects")}
          onResearch={() => handleNavigation("research")}
          onAbout={() => handleNavigation("about")}
          onApproach={() => handleNavigation("approach")}
          onContact={() => handleNavigation("contact")}
          onResume={() => handleNavigation("resume")}
          onManifesto={() => togglePrimaryWindow("document:manifesto", () => openDocument("manifesto"))}
          activeWindowIds={windows.map((window) => window.id)}
          minimizedWindows={minimizedWindows}
          onRestore={restoreWindow}
        />
        */}

      </main>
    </MotionConfig>
  );
}

function DesktopWindow({
  window,
  constraintsRef,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  onOpenProject,
  onOpenDocument,
  onOpenDocumentation,
  onOpenResearch,
  onOpenCollaborator,
}: {
  window: ManagedWindow;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onMove: (id: string, position: { x: number; y: number }) => void;
  onOpenProject: (project: Project) => void;
  onOpenDocument: (documentId: string) => void;
  onOpenDocumentation: (project: Project) => void;
  onOpenResearch: (researchId: string) => void;
  onOpenCollaborator: (collaboratorId: string) => void;
}) {
  let content: React.ReactNode = null;
  if (window.kind === "document" && window.documentId) {
    content = <TextWindow documentId={window.documentId} />;
  }
  if (window.kind === "contact") content = <ContactWindow />;
  if (window.kind === "directory" && window.directoryId) {
    const entries = getDirectoryEntries(window.directoryId);
    content = (
      <FinderWindow
        eyebrow={`ORIGIN4 / ${window.directoryId.replace("-", " ")}`}
        title={window.directoryId === "other-projects" ? "Other projects" : window.directoryId}
        description={getDirectoryDescription(window.directoryId)}
        entries={entries}
        filters={window.directoryId === "other-projects" ? ["PRODUCT", "WEB", "EXPERIMENTAL", "RESEARCH", "BRAND"] : undefined}
        onSelect={(entry) => {
          if (entry.kind === "project") {
            const project = getProject(entry.id);
            if (project) onOpenProject(project);
          }
          if (entry.kind === "research") onOpenResearch(entry.id);
          if (entry.kind === "collaborator") onOpenCollaborator(entry.id);
        }}
      />
    );
  }
  if (window.kind === "projects") {
    content = (
      <ProjectWindow
        project={activeProjects.find((project) => project.collection) ?? activeProjects[0]}
        onOpenProject={onOpenProject}
        onOpenDocument={onOpenDocument}
        onOpenDocumentation={onOpenDocumentation}
      />
    );
  }
  if (window.kind === "project" && window.projectId) {
    const project = getProject(window.projectId);
    if (project) {
      content = (
        <ProjectWindow
          project={project}
          onOpenProject={onOpenProject}
          onOpenDocument={onOpenDocument}
          onOpenDocumentation={onOpenDocumentation}
        />
      );
    }
  }
  if (window.kind === "documentation" && window.projectId) {
    const project = getProject(window.projectId);
    if (project) content = <DocumentationWindow project={project} onOpenDocument={onOpenDocument} />;
  }
  if (window.kind === "research" && window.researchId) {
    const research = getResearchProject(window.researchId);
    if (research) content = <ResearchWindow research={research} />;
  }
  if (window.kind === "collaborator" && window.collaboratorId) {
    const collaborator = getCollaborator(window.collaboratorId);
    if (collaborator) content = <CollaboratorWindow collaborator={collaborator} />;
  }
  if (window.kind === "resume") content = <ResumeWindow />;

  return (
    <Window
      window={window}
      constraintsRef={constraintsRef}
      onFocus={onFocus}
      onClose={onClose}
      onMinimize={onMinimize}
      onToggleMaximize={onToggleMaximize}
      onMove={onMove}
    >
      {content}
    </Window>
  );
}

function SparkIcon() {
  return <span aria-hidden="true" style={{ fontSize: 13, color: "var(--accent)" }}>✦</span>;
}

function DesktopFile({
  id,
  filename,
  icon,
  position,
  constraintsRef,
  onFocus,
  onMove,
  onOpen,
}: {
  id: DesktopObjectId;
  filename: string;
  icon: React.ReactNode;
  position: DesktopPosition;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  onFocus: (id: DesktopObjectId) => void;
  onMove: (id: DesktopObjectId, x: number, y: number) => void;
  onOpen: () => void;
}) {
  return (
    <DesktopObject
      id={id}
      className="desktop-object--file"
      position={position}
      constraintsRef={constraintsRef}
      onFocus={() => onFocus(id)}
      onMove={onMove}
      onOpen={onOpen}
    >
      <div className="file-button">
        <span className="file-icon">{icon}</span>{filename}
      </div>
    </DesktopObject>
  );
}

function getDirectoryEntries(directoryId: DirectoryId): FinderEntry[] {
  if (directoryId === "projects") {
    const collection = getProject("other-projects");
    return [
      ...primaryProjects.map((project) => ({
        id: project.id,
        name: project.name,
        detail: project.category,
        kind: "project" as const,
        accent: project.accent,
        filter: projectFilter(project),
      })),
      ...(collection ? [{
        id: collection.id,
        name: collection.name,
        detail: collection.shortLabel,
        kind: "project" as const,
        accent: collection.accent,
      }] : []),
    ];
  }

  if (directoryId === "other-projects") {
    return archiveProjects.map((project) => ({
      id: project.id,
      name: project.name,
      detail: project.category,
      kind: "project" as const,
      accent: project.accent,
      filter: projectFilter(project),
    }));
  }

  if (directoryId === "research") {
    return researchProjects.map((research) => ({
      id: research.id,
      name: research.name,
      detail: research.category,
      kind: "research" as const,
      accent: research.id === "origin-timer" ? "#f1a64a" : research.id === "relayai" ? "#8ee0c2" : "#a9bcff",
    }));
  }

  return collaborators.map((collaborator) => ({
    id: collaborator.id,
    name: collaborator.name,
    detail: collaborator.role || collaborator.type,
    group: collaborator.type === "agency" ? "ORGANIZATIONS" : "PEOPLE",
    kind: "collaborator" as const,
    accent: collaborator.type === "agency" ? "#f08dbd" : "#c8ee3d",
  }));
}

function projectFilter(project: Project) {
  const category = project.category.toLowerCase();
  if (category.includes("brand") || category.includes("fashion") || category.includes("lighting")) return "BRAND";
  if (project.type === "research" || category.includes("research") || category.includes("3d")) return "RESEARCH";
  if (project.type === "experimental" || category.includes("experimental") || category.includes("open source")) return "EXPERIMENTAL";
  if (project.type === "product" || category.includes("saas") || category.includes("platform")) return "PRODUCT";
  return "WEB";
}

function getDirectoryDescription(directoryId: DirectoryId) {
  if (directoryId === "research") return "Systems work, program analysis, and experiments still in motion.";
  if (directoryId === "collaborators") return "People and organizations connected to the work.";
  if (directoryId === "other-projects") return "A quieter archive of smaller projects and experiments.";
  return "Primary products and the archive that surrounds them.";
}
