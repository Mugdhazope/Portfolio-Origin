"use client";

import { ExternalLink, FileText } from "lucide-react";
import { researchProjects, type ResearchProject } from "@/data/research";

type ResearchWindowProps = {
  research: ResearchProject;
  onOpenNotes?: () => void;
};

export function ResearchWindow({ research, onOpenNotes }: ResearchWindowProps) {
  const isInProgress = research.status === "content-in-progress";

  return (
    <article className="research-window">
      <div className="project-window-topline">
        <span className="micro-label">RESEARCH / {research.category}</span>
        <span className="project-status">
          <span className="status-dot" /> {isInProgress ? "CONTENT IN PROGRESS" : research.status.toUpperCase()}
        </span>
      </div>
      <div className="research-heading">
        <span className="project-number">R{String(Math.max(researchProjects.findIndex((item) => item.id === research.id) + 1, 1)).padStart(2, "0")}</span>
        <h3>{research.name}</h3>
        <p>{research.category}</p>
      </div>
      {research.institution || research.researcher ? (
        <div className="research-association">
          {research.institution ? <span>{research.institution}</span> : null}
          {research.researcher ? <span>with {research.researcher}</span> : null}
        </div>
      ) : null}
      <p className="research-description">{research.description}</p>
      {research.technologies.length > 0 ? (
        <div className="research-section">
          <span className="micro-label">TECHNICAL AREAS</span>
          <div className="research-tags">
            {research.technologies.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </div>
      ) : null}
      {research.topics.length > 0 ? (
        <div className="research-section">
          <span className="micro-label">TOPICS</span>
          <ul className="research-topics">
            {research.topics.map((topic) => <li key={topic}>{topic}</li>)}
          </ul>
        </div>
      ) : null}
      {research.links.length > 0 || onOpenNotes ? (
        <div className="window-actions">
          {research.links.map((link) => (
            <a className="action-button action-button--accent" href={link.url} key={link.url} target="_blank" rel="noopener noreferrer">
              {link.label} <ExternalLink size={13} />
            </a>
          ))}
          {onOpenNotes ? (
            <button className="action-button" type="button" onClick={onOpenNotes}>
              Research notes.txt <FileText size={13} />
            </button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
