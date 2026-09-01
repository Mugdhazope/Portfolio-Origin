"use client";

import { ExternalLink, Play } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { ProjectArtwork } from "@/components/ProjectWindow";

type ProjectPreviewWindowProps = {
  project: Project;
};

export function ProjectPreviewWindow({ project }: ProjectPreviewWindowProps) {
  const media = project.images?.length ? project.images : project.gallery;
  const [selected, setSelected] = useState(0);
  const selectedImage = media[selected];

  return (
    <article className="project-preview-window">
      <div className="project-preview-heading">
        <div>
          <span className="micro-label">PREVIEW / {project.category}</span>
          <h3>{project.name}</h3>
        </div>
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-link">
            View live <ExternalLink size={13} />
          </a>
        ) : null}
      </div>

      <div className="project-preview-stage">
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt={`${project.name} preview ${selected + 1}`}
            fill
            sizes="(max-width: 760px) 92vw, 70vw"
            className="project-preview-image"
            priority={selected === 0}
          />
        ) : (
          <ProjectArtwork project={project} large />
        )}
      </div>

      {media.length > 1 ? (
        <div className="project-preview-thumbnails" aria-label={`${project.name} previews`}>
          {media.map((image, index) => (
            <button
              key={image}
              type="button"
              className={index === selected ? "is-selected" : ""}
              onClick={() => setSelected(index)}
              aria-label={`Show preview ${index + 1}`}
            >
              <Image src={image} alt="" fill sizes="72px" loading="lazy" />
            </button>
          ))}
        </div>
      ) : null}

      {project.videos?.length ? (
        <div className="project-preview-video-list">
          {project.videos.map((video) => (
            <video key={video} controls preload="metadata" poster={selectedImage}>
              <source src={video} />
            </video>
          ))}
          <span><Play size={12} /> Optional project media</span>
        </div>
      ) : null}
      {!media.length && !project.videos?.length ? (
        <p className="project-preview-note">Preview artwork is configurable for this project.</p>
      ) : null}
    </article>
  );
}
