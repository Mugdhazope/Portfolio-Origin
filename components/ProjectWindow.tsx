"use client";

import { ExternalLink, FileText, Grid2X2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { activeProjects, archiveProjects, primaryProjects, type Project } from "@/data/projects";

type ProjectWindowProps = {
  project: Project;
  onOpenProject: (project: Project) => void;
  onOpenDocument: (documentId: string) => void;
  onOpenDocumentation?: (project: Project) => void;
};

function ProjectArtwork({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div
      className={`project-artwork ${large ? "project-artwork--large" : ""}`}
      style={{ "--project-accent": project.accent } as React.CSSProperties}
    >
      {project.image || project.images?.[0] ? (
        <Image src={project.image ?? project.images![0]} alt="" fill sizes="(max-width: 760px) 90vw, 45vw" className="project-artwork-image" />
      ) : null}
      <div className="artwork-grid" aria-hidden="true" />
      <span className="artwork-word">{project.name}</span>
      <span className="artwork-mark">4</span>
      <span className="artwork-caption">ORIGIN4 / {project.category}</span>
    </div>
  );
}

export function ProjectWindow({
  project,
  onOpenProject,
  onOpenDocument,
  onOpenDocumentation,
}: ProjectWindowProps) {
  if (project.collection) {
    return (
      <ProjectsWindow
        project={project}
        onOpenProject={onOpenProject}
        onOpenDocument={onOpenDocument}
      />
    );
  }

  return (
    <article className="project-window">
      <div className="project-window-topline">
        <span className="micro-label">PROJECT / {project.year || project.status}</span>
        <span className="project-status">
          <span className="status-dot" /> ORIGIN4 SELECTED
        </span>
      </div>
      <div className="project-hero">
        <div className="project-summary">
          <span className="project-number">0{activeProjects.indexOf(project) + 1}</span>
          <h3>{project.name}</h3>
          <p className="project-category">{project.category}</p>
          <p className="project-description">{project.longDescription || project.description}</p>
        </div>
        <ProjectArtwork project={project} large />
      </div>
      <div className="project-detail-sections">
        <div>
          <span className="micro-label">WHAT IT IS</span>
          <p>{project.description}</p>
        </div>
        {project.capabilities?.length ? (
          <div>
            <span className="micro-label">CAPABILITIES</span>
            <div className="project-chip-list">{project.capabilities.map((capability) => <span key={capability}>{capability}</span>)}</div>
          </div>
        ) : null}
        {project.whatIBuilt?.length ? (
          <div>
            <span className="micro-label">WHAT I BUILT</span>
            <div className="project-chip-list">{project.whatIBuilt.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        ) : null}
        {project.techGroups?.length ? (
          <div>
            <span className="micro-label">TECH STACK</span>
            <div className="project-tech-groups">
              {project.techGroups.map((group) => <div key={group.label}><small>{group.label}</small><p>{group.items.join(" / ")}</p></div>)}
            </div>
          </div>
        ) : null}
        {project.id === "hune" ? (
          <>
            {project.userCount ? (
              <div>
                <span className="micro-label">USERS</span>
                <p>{project.userCount} on the live platform.</p>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
      <div className="project-meta-grid">
        <div>
          <span className="micro-label">ROLE</span>
          <p>{project.role || "Details to be added"}</p>
        </div>
        <div>
          <span className="micro-label">STATUS</span>
          <p>{project.status}</p>
        </div>
      </div>
      {project.stats?.length || project.technologies.length ? (
        <div className="project-facts">
          {project.stats?.map((stat) => <span key={stat}>{stat}</span>)}
          {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
      ) : null}
      <div className="window-actions">
        {project.liveUrl ? (
          <a
            className="action-button action-button--accent"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.liveUrlLabel ?? "View live"} <ExternalLink size={13} />
          </a>
        ) : null}
        {project.caseStudyId ? (
          <button
            className="action-button"
            type="button"
            onClick={() => onOpenDocument(project.caseStudyId)}
          >
            Read case study.txt <FileText size={13} />
          </button>
        ) : null}
        {project.githubUrl ? (
          <a className="action-button" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub <ExternalLink size={13} />
          </a>
        ) : null}
        {project.externalLinks?.map((link) => (
          <a
            className="action-button"
            href={link.url}
            key={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label} <ExternalLink size={13} />
          </a>
        ))}
        {onOpenDocumentation && project.documents?.length ? (
          <button className="action-button" type="button" onClick={() => onOpenDocumentation(project)}>
            Open documentation <FileText size={13} />
          </button>
        ) : null}
      </div>
    </article>
  );
}

function ProjectsWindow({
  project,
  onOpenProject,
  onOpenDocument,
}: Pick<ProjectWindowProps, "onOpenProject" | "onOpenDocument"> & { project: Project }) {
  const archive = activeProjects.find((project) => project.collection);
  const visibleProjects = [
    ...(project.id === "other-projects" ? archiveProjects : primaryProjects),
    ...(project.id === "other-projects" ? [] : archive ? [archive] : []),
  ];

  return (
    <article className="projects-browser">
      <div className="browser-intro">
        <div>
          <span className="document-eyebrow">ORIGIN4 / WORKSPACE</span>
          <h3>Selected work<span className="accent-dot">.</span></h3>
        </div>
        <span className="browser-count">{String(visibleProjects.length).padStart(2, "0")} ITEMS</span>
      </div>
      <p className="browser-copy">
        A living index of digital products, identities, and experiments. Open any project to explore its shape.
      </p>
      <div className="project-grid">
        {visibleProjects.map((project) => (
          <motion.button
            type="button"
            className="project-tile"
            key={project.id}
            onClick={() => onOpenProject(project)}
            whileHover={{ y: -4 }}
          >
            <ProjectArtwork project={project} />
            <span className="project-tile-details">
              <span>
                <strong>{project.name}</strong>
            <small>{project.shortLabel}</small>
              </span>
              <Grid2X2 size={14} />
            </span>
          </motion.button>
        ))}
      </div>
      <button className="text-link browser-manifesto" type="button" onClick={() => onOpenDocument("manifesto")}>
        <Sparkles size={14} /> Open manifesto.txt
      </button>
    </article>
  );
}

export { ProjectArtwork };
