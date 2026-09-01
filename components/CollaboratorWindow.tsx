"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import type { Collaborator } from "@/data/collaborators";
import { getProject } from "@/data/projects";

type CollaboratorWindowProps = {
  collaborator: Collaborator;
};

export function CollaboratorWindow({ collaborator }: CollaboratorWindowProps) {
  return (
    <article className="collaborator-window">
      <div className="project-window-topline">
        <span className="micro-label">COLLABORATOR / {collaborator.type}</span>
        <span className="project-status"><span className="status-dot" /> ORIGIN4 NETWORK</span>
      </div>
      <div className="collaborator-heading">
        {collaborator.image ? (
          <Image src={collaborator.image} alt="" width={72} height={72} className="collaborator-image" />
        ) : (
          <span className="collaborator-monogram" aria-hidden="true">{collaborator.name.slice(0, 1)}</span>
        )}
        <div>
          <h3>{collaborator.name}</h3>
          {collaborator.role ? <p>{collaborator.role}</p> : null}
        </div>
      </div>
      {collaborator.description ? <p className="collaborator-description">{collaborator.description}</p> : null}
      {collaborator.projects.length > 0 ? (
        <div className="collaborator-section">
          <span className="micro-label">WORKED ON</span>
          <div className="collaborator-projects">
            {collaborator.projects.map((projectId) => <span key={projectId}>{getProject(projectId)?.name ?? projectId}</span>)}
          </div>
        </div>
      ) : null}
      {collaborator.linkedinUrl || collaborator.websiteUrl ? (
        <div className="window-actions">
          {collaborator.linkedinUrl ? <a className="action-button" href={collaborator.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn <ExternalLink size={13} /></a> : null}
          {collaborator.websiteUrl ? <a className="action-button action-button--accent" href={collaborator.websiteUrl} target="_blank" rel="noopener noreferrer">Website <ExternalLink size={13} /></a> : null}
        </div>
      ) : null}
    </article>
  );
}
