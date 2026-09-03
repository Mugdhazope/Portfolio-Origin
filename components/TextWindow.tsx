"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import { ProfileSocialLinks } from "@/components/ProfileSocialLinks";
import { getDocument } from "@/data/documents";
import { linkifyText } from "@/lib/linkifyText";

type TextWindowProps = {
  documentId: string;
};

export function TextWindow({ documentId }: TextWindowProps) {
  const document = getDocument(documentId);
  const isAbout = documentId === "about";
  const profileSection = isAbout ? document?.sections[0] : null;
  const otherSections = isAbout ? document?.sections.slice(1) ?? [] : document?.sections ?? [];
  const [expanded, setExpanded] = useState<string | null>(
    isAbout ? null : (document?.sections[0]?.label ?? null),
  );

  if (!document) {
    return <p className="empty-state">Document unavailable.</p>;
  }

  return (
    <article className={`text-document ${isAbout ? "text-document--about" : ""}`}>
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

        {isAbout && profileSection ? (
          <div className="about-hero">
            <div className="document-portrait">
              <Image src="/assets/mugdha-zope.png" alt="Mugdha Zope" width={220} height={280} />
            </div>
            <div className="about-hero-copy">
              <div className="about-hero-label">
                <small>01</small>
                <span>{profileSection.label}</span>
              </div>
              <p className="document-section-body about-hero-body">{linkifyText(profileSection.body)}</p>
              <ProfileSocialLinks className="about-social-links" size={15} />
            </div>
          </div>
        ) : null}

        <div className="document-sections">
          {(isAbout ? otherSections : document.sections).map((section, index) => {
            const displayIndex = isAbout ? index + 2 : index + 1;
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
                    <small>{String(displayIndex).padStart(2, "0")}</small>
                    {section.label}
                  </span>
                  <ChevronDown size={14} />
                </button>
                {isExpanded ? <p className="document-section-body">{linkifyText(section.body)}</p> : null}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
