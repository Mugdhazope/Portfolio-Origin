"use client";

import { ExternalLink, FileText, LockKeyhole } from "lucide-react";
import type { Project } from "@/data/projects";
import { getProjectDocuments } from "@/data/projectDocuments";

type DocumentationWindowProps = {
  project: Project;
  onOpenDocument: (documentId: string) => void;
};

export function DocumentationWindow({ project, onOpenDocument }: DocumentationWindowProps) {
  const documents = getProjectDocuments(project.id);

  return (
    <article className="documentation-window">
      <div className="browser-intro">
        <div>
          <span className="document-eyebrow">ORIGIN4 / {project.shortName}</span>
          <h3>Documentation<span className="accent-dot">.</span></h3>
        </div>
        <span className="browser-count">{String(documents.length).padStart(2, "0")} FILES</span>
      </div>
      <p className="browser-copy">Project materials, playbooks, and case study notes.</p>
      <div className="documentation-list">
        {documents.map((document) => (
          <div className="documentation-row" key={document.id}>
            <span className="documentation-icon">{document.available ? <FileText size={15} /> : <LockKeyhole size={14} />}</span>
            <span className="documentation-row-copy">
              <strong>{document.filename}</strong>
              <small>{document.description}</small>
            </span>
            {document.available && document.assetUrl ? (
              <a className="text-link" href={document.assetUrl} target="_blank" rel="noopener noreferrer">
                Open <ExternalLink size={12} />
              </a>
            ) : document.available && document.documentId ? (
              <button type="button" className="text-link" onClick={() => onOpenDocument(document.documentId!)}>
                Open
              </button>
            ) : (
              <span className="documentation-configurable">CONFIGURABLE</span>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
