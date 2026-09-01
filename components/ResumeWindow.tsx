"use client";

import { Download, Maximize2 } from "lucide-react";
import { resumeAsset } from "@/data/personal";

export function ResumeWindow() {
  return (
    <article className="resume-window">
      <div className="project-window-topline">
        <span className="micro-label">MUGDHA / PROFESSIONAL RECORD</span>
        <span className="project-status"><span className="status-dot" /> PDF</span>
      </div>
      {resumeAsset ? (
        <>
          <iframe className="resume-frame" src={resumeAsset} title="Mugdha Zope resume" />
          <div className="window-actions">
            <a className="action-button action-button--accent" href={resumeAsset} target="_blank" rel="noreferrer">
              Open fullscreen <Maximize2 size={13} />
            </a>
            <a className="action-button" href={resumeAsset} download>
              Download <Download size={13} />
            </a>
          </div>
        </>
      ) : (
        <div className="resume-missing">
          <span className="micro-label">RESUME.PDF</span>
          <h3>Resume asset not staged.</h3>
          <p>Add approved PDF at <code>public/assets/resume/Mugdha_resume2026-2.pdf</code>, then set <code>resumeAsset</code> in <code>data/personal.ts</code>.</p>
        </div>
      )}
    </article>
  );
}
