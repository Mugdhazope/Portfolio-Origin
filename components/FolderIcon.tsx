import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

type FolderIconProps = {
  project: Pick<Project, "name" | "shortLabel" | "accent">;
};

export function FolderIcon({ project }: FolderIconProps) {
  return (
    <div
      className="folder-button"
      style={{ "--folder-accent": project.accent } as CSSProperties}
    >
      <span className="folder-icon" aria-hidden="true">
        <span className="folder-tab" />
        <span className="folder-body">
          <span className="folder-reflection" />
          <ArrowUpRight className="folder-arrow" size={15} />
        </span>
      </span>
      <span className="folder-name">{project.name}</span>
      <span className="folder-description">{project.shortLabel}</span>
    </div>
  );
}
