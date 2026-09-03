"use client";

import { ArrowUpRight, ChevronLeft, Download, ExternalLink, FileText, Mail } from "lucide-react";
import Image from "next/image";
import { ProjectArtwork } from "@/components/ProjectWindow";
import { ProfileSocialLinks } from "@/components/ProfileSocialLinks";
import { activeProjects, archiveProjects, primaryProjects, type Project } from "@/data/projects";
import { collaborators, getCollaborator } from "@/data/collaborators";
import { getDocument } from "@/data/documents";
import { getResearchProject, researchProjects } from "@/data/research";
import { origin4Positioning, personalLinks, resumeAsset } from "@/data/personal";
import type { MobileApp } from "@/data/mobileApps";
import { linkifyText } from "@/lib/linkifyText";

export type MobileView =
  | { kind: "project"; project: Project }
  | { kind: "document"; documentId: string }
  | { kind: "research"; researchId: string }
  | { kind: "collaborator"; collaboratorId: string }
  | { kind: "contact" }
  | { kind: "resume" }
  | { kind: "directory"; directoryId: "projects" | "research" | "collaborators" };

type ScreenFrameProps = {
  title: string;
  eyebrow?: string;
  onBack: () => void;
  children: React.ReactNode;
};

function ScreenFrame({ title, eyebrow = "ORIGIN4", onBack, children }: ScreenFrameProps) {
  return (
    <section className="mobile-app-screen" aria-label={title}>
      <header className="mobile-screen-header">
        <button type="button" className="mobile-back-button" onClick={onBack} aria-label="Back to Origin4 home">
          <ChevronLeft size={20} /> <span>BACK</span>
        </button>
        <span className="mobile-screen-eyebrow">{eyebrow}</span>
        <span className="mobile-screen-menu" aria-hidden="true">::</span>
      </header>
      <div className="mobile-screen-scroll">{children}</div>
    </section>
  );
}

export function MobileAppScreen({
  view,
  onBack,
  onOpenProject,
  onOpenDocument,
  onOpenResearch,
  onOpenCollaborator,
}: {
  view: MobileView;
  onBack: () => void;
  onOpenProject: (project: Project) => void;
  onOpenDocument: (documentId: string) => void;
  onOpenResearch: (researchId: string) => void;
  onOpenCollaborator: (collaboratorId: string) => void;
}) {
  if (view.kind === "project") {
    return (
      <ScreenFrame title={view.project.name} eyebrow={`ORIGIN4 / ${view.project.shortLabel}`} onBack={onBack}>
        <MobileProjectScreen
          project={view.project}
          onOpenDocument={onOpenDocument}
        />
      </ScreenFrame>
    );
  }
  if (view.kind === "document") {
    return <MobileDocumentScreen documentId={view.documentId} onBack={onBack} />;
  }
  if (view.kind === "contact") return <MobileContactScreen onBack={onBack} />;
  if (view.kind === "resume") return <MobileResumeScreen onBack={onBack} />;
  if (view.kind === "research") {
    return <MobileResearchScreen researchId={view.researchId} onBack={onBack} />;
  }
  if (view.kind === "collaborator") {
    return <MobileCollaboratorScreen collaboratorId={view.collaboratorId} onBack={onBack} />;
  }
  return (
    <MobileDirectoryScreen
      directoryId={view.directoryId}
      onBack={onBack}
      onOpenProject={onOpenProject}
      onOpenResearch={onOpenResearch}
      onOpenCollaborator={onOpenCollaborator}
    />
  );
}

function MobileProjectScreen({
  project,
  onOpenDocument,
}: {
  project: Project;
  onOpenDocument: (documentId: string) => void;
}) {
  return (
    <article className="mobile-project-content">
      <div className="mobile-project-heading">
        <span className="mobile-kicker"><span className="status-dot" /> PROJECT / {project.status}</span>
        <span className="mobile-project-index">0{Math.max(0, [...primaryProjects, ...archiveProjects].indexOf(project) + 1)}</span>
      </div>
      <h1>{project.name}</h1>
      <p className="mobile-project-category">{project.category}</p>
      <ProjectArtwork project={project} large />
      <p className="mobile-project-description">{project.longDescription || project.description}</p>
      {project.capabilities?.length ? (
        <section className="mobile-project-section">
          <span className="mobile-kicker">CAPABILITIES</span>
          <div className="mobile-project-tags">
            {project.capabilities.map((capability) => <span key={capability}>{capability}</span>)}
          </div>
        </section>
      ) : null}
      {project.techGroups?.length ? (
        <section className="mobile-project-section">
          <span className="mobile-kicker">TECH STACK</span>
          <div className="mobile-project-tech">
            {project.techGroups.map((group) => <p key={group.label}><small>{group.label}</small>{group.items.join(" / ")}</p>)}
          </div>
        </section>
      ) : null}
      <div className="mobile-project-facts">
        <span><small>ROLE</small>{project.role || "Details to be added"}</span>
        <span><small>STATUS</small>{project.status}</span>
      </div>
      {project.stats?.length || project.technologies.length ? (
        <div className="mobile-project-tags">
          {[...(project.stats ?? []), ...project.technologies].map((fact) => <span key={fact}>{fact}</span>)}
        </div>
      ) : null}
      <div className="mobile-screen-actions">
        {project.liveUrl ? (
          <a className="mobile-action mobile-action--accent" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            {(project.liveUrlLabel ?? "View live").toUpperCase()} <ExternalLink size={14} />
          </a>
        ) : null}
        {project.externalLinks?.map((link) => (
          <a className="mobile-action" href={link.url} key={link.url} target="_blank" rel="noopener noreferrer">
            {link.label.toUpperCase()} <ExternalLink size={14} />
          </a>
        ))}
        {project.caseStudyId ? (
          <button className="mobile-action" type="button" onClick={() => onOpenDocument(project.caseStudyId)}>
            READ CASE STUDY.txt <FileText size={14} />
          </button>
        ) : null}
      </div>
    </article>
  );
}

export function MobileDocumentScreen({ documentId, onBack }: { documentId: string; onBack: () => void }) {
  const document = getDocument(documentId);
  const isAbout = documentId === "about";
  return (
    <ScreenFrame title={document?.filename ?? "Document"} eyebrow={document?.eyebrow} onBack={onBack}>
      {document ? (
        <article className="mobile-document-content">
          <span className="mobile-kicker"><FileText size={13} /> {document.filename}</span>
          <h1>{document.title}</h1>
          <p className="mobile-document-intro">{document.intro}</p>
          {isAbout ? (
            <>
              <Image className="mobile-portrait" src="/assets/mugdha-zope.png" alt="Mugdha Zope" width={420} height={420} />
              <ProfileSocialLinks className="mobile-social-links" size={18} />
            </>
          ) : null}
          <div className="mobile-document-sections">
            {document.sections.map((section, index) => (
              <section className="mobile-document-section" key={section.label}>
                <span>{String(index + 1).padStart(2, "0")} / {section.label}</span>
                <p>{linkifyText(section.body)}</p>
              </section>
            ))}
          </div>
        </article>
      ) : <p className="mobile-empty">Document unavailable.</p>}
    </ScreenFrame>
  );
}

function MobileAboutScreen({ onBack }: { onBack: () => void }) {
  return (
    <ScreenFrame title="About" eyebrow="ORIGIN4 / PROFILE" onBack={onBack}>
      <article className="mobile-about-content">
        <span className="mobile-kicker">THE PERSON BEHIND ORIGIN4</span>
        <h1>Mugdha<br />Zope<span className="accent-dot">.</span></h1>
        <Image className="mobile-portrait" src="/assets/mugdha-zope.png" alt="Mugdha Zope" width={420} height={420} />
        <p className="mobile-about-role">Software Engineer · Product Designer</p>
        <p className="mobile-document-intro">
          Building digital products, systems, and experiments with curiosity and care.
        </p>
        <div className="mobile-link-list">
          <span>ORIGIN4 / {origin4Positioning.kicker}</span>
          <ProfileSocialLinks className="mobile-social-links" size={18} />
        </div>
      </article>
    </ScreenFrame>
  );
}

function MobileContactScreen({ onBack }: { onBack: () => void }) {
  return (
    <ScreenFrame title="Contact" eyebrow="ORIGIN4 / CONTACT" onBack={onBack}>
      <article className="mobile-contact-content">
        <span className="mobile-kicker"><span className="status-dot" /> AVAILABLE FOR NEW PROJECTS</span>
        <h1>Let&apos;s build<br /><em>something.</em></h1>
        <p>Have a project, idea, weird thought, or problem worth solving? Reach out over email, LinkedIn, or GitHub.</p>
        <ProfileSocialLinks className="mobile-social-links" size={20} />
        <a className="mobile-action mobile-action--accent" href={`mailto:${personalLinks.email}`}>
          EMAIL ME <Mail size={14} />
        </a>
      </article>
    </ScreenFrame>
  );
}

function MobileResumeScreen({ onBack }: { onBack: () => void }) {
  return (
    <ScreenFrame title="Resume" eyebrow="MUGDHA / PROFESSIONAL RECORD" onBack={onBack}>
      <article className="mobile-resume-content">
        <span className="mobile-kicker">RESUME.PDF</span>
        {resumeAsset ? (
          <>
            <iframe className="mobile-resume-frame" src={resumeAsset} title="Mugdha Zope resume" />
            <a className="mobile-action mobile-action--accent" href={resumeAsset} download>
              DOWNLOAD RESUME <Download size={14} />
            </a>
          </>
        ) : (
          <>
            <h1>Resume asset<br />not staged<span className="accent-dot">.</span></h1>
            <p>The approved resume PDF will appear here when staged at <code>public/assets/resume.pdf</code>.</p>
          </>
        )}
      </article>
    </ScreenFrame>
  );
}

function MobileDirectoryScreen({
  directoryId,
  onBack,
  onOpenProject,
  onOpenResearch,
  onOpenCollaborator,
}: {
  directoryId: "projects" | "research" | "collaborators";
  onBack: () => void;
  onOpenProject: (project: Project) => void;
  onOpenResearch: (researchId: string) => void;
  onOpenCollaborator: (collaboratorId: string) => void;
}) {
  const isResearch = directoryId === "research";
  const isProjects = directoryId === "projects";
  const projectEntries = [...primaryProjects, ...archiveProjects];
  return (
    <ScreenFrame title={isResearch ? "Research" : isProjects ? "Projects" : "Worked with"} eyebrow={`ORIGIN4 / ${isResearch ? "RESEARCH" : isProjects ? "PROJECTS" : "NETWORK"}`} onBack={onBack}>
      <article className="mobile-directory-content">
        <span className="mobile-kicker">{isResearch ? "SYSTEMS + NOTES" : isProjects ? "SELECTED WORK" : "ORIGIN4 NETWORK"}</span>
        <h1>{isResearch ? "Research." : isProjects ? "Projects." : "Worked with."}</h1>
        <div className="mobile-directory-list">
          {isResearch ? researchProjects.map((research) => (
            <button type="button" key={research.id} onClick={() => onOpenResearch(research.id)}>
              <span><strong>{research.name}</strong><small>{research.category}</small></span><ArrowUpRight size={15} />
            </button>
          )) : isProjects ? projectEntries.map((project) => (
            <button type="button" key={project.id} onClick={() => onOpenProject(project)}>
              <span><strong>{project.name}</strong><small>{project.shortLabel}</small></span><ArrowUpRight size={15} />
            </button>
          )) : collaborators.map((collaborator) => (
            <button type="button" key={collaborator.id} onClick={() => onOpenCollaborator(collaborator.id)}>
              <span><strong>{collaborator.name}</strong><small>{collaborator.role || collaborator.type}</small></span><ArrowUpRight size={15} />
            </button>
          ))}
        </div>
        {!isResearch || isProjects ? null : (
          <div className="mobile-directory-note">
            <span>SELECTED WORK</span>
            {archiveProjects.slice(0, 1).map((project) => <button type="button" key={project.id} onClick={() => onOpenProject(project)}>{project.name}</button>)}
          </div>
        )}
      </article>
    </ScreenFrame>
  );
}

function MobileResearchScreen({ researchId, onBack }: { researchId: string; onBack: () => void }) {
  const research = getResearchProject(researchId);
  return (
    <ScreenFrame title={research?.name ?? "Research"} eyebrow="ORIGIN4 / RESEARCH" onBack={onBack}>
      <article className="mobile-detail-content">
        <span className="mobile-kicker">{research?.status ?? "UNAVAILABLE"}</span>
        <h1>{research?.name ?? "Research unavailable"}<span className="accent-dot">.</span></h1>
        <p>{research?.description}</p>
        <div className="mobile-detail-meta">
          {research?.researcher ? <span><small>RESEARCHER</small>{research.researcher}</span> : null}
          {research?.institution ? <span><small>INSTITUTION</small>{research.institution}</span> : null}
          <span><small>TECHNOLOGIES</small>{research?.technologies.join(" · ") || "In progress"}</span>
        </div>
        {research?.links.map((link) => <a className="mobile-action mobile-action--accent" href={link.url} target="_blank" rel="noopener noreferrer" key={link.url}>{link.label.toUpperCase()} <ExternalLink size={14} /></a>)}
      </article>
    </ScreenFrame>
  );
}

function MobileCollaboratorScreen({ collaboratorId, onBack }: { collaboratorId: string; onBack: () => void }) {
  const collaborator = getCollaborator(collaboratorId);
  return (
    <ScreenFrame title={collaborator?.name ?? "Collaborator"} eyebrow="ORIGIN4 / NETWORK" onBack={onBack}>
      <article className="mobile-detail-content">
        <span className="mobile-kicker">{collaborator?.type ?? "COLLABORATOR"}</span>
        <h1>{collaborator?.name ?? "Collaborator unavailable"}<span className="accent-dot">.</span></h1>
        <p>{collaborator?.description || "Profile details are being prepared."}</p>
        <div className="mobile-detail-meta">
          <span><small>ROLE</small>{collaborator?.role || "Details to be added"}</span>
          <span><small>PROJECTS</small>{collaborator?.projects.map((projectId) => activeProjects.find((project) => project.id === projectId)?.name ?? projectId).join(" · ") || "Origin4 network"}</span>
        </div>
        {collaborator?.websiteUrl ? <a className="mobile-action mobile-action--accent" href={collaborator.websiteUrl} target="_blank" rel="noopener noreferrer">OPEN WEBSITE <ExternalLink size={14} /></a> : null}
      </article>
    </ScreenFrame>
  );
}

export function mobileViewsMatch(current: MobileView, next: MobileView): boolean {
  if (current.kind !== next.kind) return false;
  switch (current.kind) {
    case "project":
      return next.kind === "project" && current.project.id === next.project.id;
    case "document":
      return next.kind === "document" && current.documentId === next.documentId;
    case "research":
      return next.kind === "research" && current.researchId === next.researchId;
    case "collaborator":
      return next.kind === "collaborator" && current.collaboratorId === next.collaboratorId;
    case "directory":
      return next.kind === "directory" && current.directoryId === next.directoryId;
    default:
      return true;
  }
}

export function appToView(app: MobileApp, projects: Project[]): MobileView | null {
  if (app.kind === "project") {
    return { kind: "project", project: projects.find((project) => project.id === app.projectId) ?? projects[0] };
  }
  if (app.kind === "document" && app.documentId) return { kind: "document", documentId: app.documentId };
  if (app.kind === "contact") return { kind: "contact" };
  if (app.kind === "resume") return { kind: "resume" };
  if (app.kind === "collaborator") return { kind: "collaborator", collaboratorId: app.collaboratorId };
  if (app.kind === "directory" && (app.directoryId === "research" || app.directoryId === "collaborators")) {
    return { kind: "directory", directoryId: app.directoryId };
  }
  if (app.kind === "directory" && app.directoryId === "projects") {
    return { kind: "directory", directoryId: "projects" };
  }
  return null;
}

export function MobileAbout({ onBack }: { onBack: () => void }) {
  return <MobileAboutScreen onBack={onBack} />;
}
