"use client";

import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import { getDocument } from "@/data/documents";

type TextWindowProps = {
  documentId: string;
};

export function TextWindow({ documentId }: TextWindowProps) {
  const document = getDocument(documentId);
  const [expanded, setExpanded] = useState<string | null>(document?.sections[0]?.label ?? null);

  if (!document) {
    return <p className="empty-state">Document unavailable.</p>;
  }

  return (
    <article className="text-document">
      <div className="document-toolbar">
        <span className="document-file">
          <FileText size={14} /> {document.filename}
        </span>
        <span className="document-status">TEXT / {document.sections.length} NOTES</span>
      </div>
      <div className="document-body">
        <span className="document-eyebrow">{document.eyebrow}</span>
        <h3>{document.title}</h3>
        <p className="document-intro">{document.intro}</p>
        <div className="document-sections">
          {document.sections.map((section, index) => {
            const isExpanded = expanded === section.label;
            return (
              <div className={`document-section ${isExpanded ? "is-expanded" : ""}`} key={section.label}>
                <button
                  type="button"
                  className="document-section-toggle"
                  onClick={() => setExpanded(isExpanded ? null : section.label)}
                  aria-expanded={isExpanded}
                >
                  <span>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    {section.label}
                  </span>
                  <ChevronDown size={14} />
                </button>
                {isExpanded ? <p className="document-section-body">{section.body}</p> : null}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
