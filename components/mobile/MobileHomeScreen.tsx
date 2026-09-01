"use client";

import { useMemo, useRef, useState } from "react";
import { origin4Positioning } from "@/data/personal";
import { AnimatePresence, motion } from "framer-motion";
import { MobileAppIcon } from "@/components/mobile/MobileAppIcon";
import { MobileDock } from "@/components/mobile/MobileDock";
import { MobileFolder } from "@/components/mobile/MobileFolder";
import { MobileStatusBar } from "@/components/mobile/MobileStatusBar";
import { appToView, MobileAbout, MobileAppScreen, mobileViewsMatch, type MobileView } from "@/components/mobile/MobileScreens";
import { collaborators } from "@/data/collaborators";
import { mobilePages, type MobileApp } from "@/data/mobileApps";
import { activeProjects } from "@/data/projects";

export function MobileHomeScreen() {
  const [page, setPage] = useState(0);
  const [view, setView] = useState<MobileView | null>(null);
  const [folder, setFolder] = useState<MobileApp | null>(null);
  const pointerStart = useRef<number | null>(null);
  const apps = mobilePages[page] ?? mobilePages[0];

  const collaboratorApps = useMemo<MobileApp[]>(
    () => collaborators.map((collaborator) => ({
      id: collaborator.id,
      label: collaborator.name,
      subtitle: collaborator.role || collaborator.type,
      kind: "collaborator" as const,
      glyph: "network" as const,
      accent: "#f08dbd",
      collaboratorId: collaborator.id,
    })),
    [],
  );

  const openApp = (app: MobileApp) => {
    if (app.kind === "folder") {
      if (folder?.id === app.id) {
        setFolder(null);
        return;
      }
      setFolder(app);
      return;
    }
    if (app.kind === "project" && app.projectId === "other-projects") {
      const nextView = { kind: "directory" as const, directoryId: "projects" as const };
      if (view?.kind === nextView.kind && view.directoryId === nextView.directoryId) {
        setView(null);
        return;
      }
      setFolder(null);
      setView(nextView);
      return;
    }
    const nextView = appToView(app, activeProjects);
    if (!nextView) return;
    if (view && mobileViewsMatch(view, nextView)) {
      setView(null);
      return;
    }
    setFolder(null);
    setView(nextView);
  };

  const goHome = () => {
    setView(null);
    setFolder(null);
  };

  const openDocument = (documentId: string) => {
    setFolder(null);
    setView({ kind: "document", documentId });
  };

  return (
    <main
      className="mobile-shell"
      onPointerDown={(event) => {
        pointerStart.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (view || folder || pointerStart.current === null) return;
        const delta = event.clientX - pointerStart.current;
        if (Math.abs(delta) > 48) {
          setPage((current) => Math.min(Math.max(current + (delta < 0 ? 1 : -1), 0), mobilePages.length - 1));
        }
        pointerStart.current = null;
      }}
    >
      <MobileStatusBar />
      <div className="mobile-home-brand" aria-hidden="true">
        <small>{origin4Positioning.kicker}</small>
        <span>ORIGIN4</span>
        <p className="mobile-home-tagline">{origin4Positioning.tagline}</p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {view ? (
          <motion.div
            key={`${view.kind}-${"project" in view ? view.project.id : "documentId" in view ? view.documentId : "id" in view ? view.id : "screen"}`}
            className="mobile-screen-transition"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {view.kind === "document" && view.documentId === "about" ? (
              <MobileAbout onBack={goHome} />
            ) : (
              <MobileAppScreen
                view={view}
                onBack={goHome}
                onOpenProject={(project) => setView({ kind: "project", project })}
                onOpenDocument={openDocument}
                onOpenResearch={(researchId) => setView({ kind: "research", researchId })}
                onOpenCollaborator={(collaboratorId) => setView({ kind: "collaborator", collaboratorId })}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key={`home-${page}`}
            className="mobile-home-page"
            initial={{ opacity: 0, x: page === 0 ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: page === 0 ? 12 : -12 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mobile-app-grid">
              {apps.map((app) => <MobileAppIcon key={app.id} app={app} onOpen={openApp} />)}
            </div>
            <div className="mobile-page-indicator" aria-label={`Home screen page ${page + 1} of ${mobilePages.length}`}>
              {mobilePages.map((_, index) => <button type="button" key={index} className={index === page ? "is-active" : ""} onClick={() => setPage(index)} aria-label={`Go to page ${index + 1}`} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileDock onOpen={openApp} onHome={goHome} />

      <AnimatePresence>
        {folder ? (
          <MobileFolder
            app={folder}
            items={
              folder.id === "collaborators-folder"
                ? collaboratorApps
                : folder.kind === "folder"
                  ? folder.items ?? []
                  : []
            }
            onOpen={openApp}
            onClose={() => setFolder(null)}
          />
        ) : null}
      </AnimatePresence>
    </main>
  );
}
