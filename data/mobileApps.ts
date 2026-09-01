import { archiveProjects, getProject, primaryProjects, type Project } from "@/data/projects";

export type MobileAppGlyph =
  | "mesh"
  | "morph"
  | "hune"
  | "about"
  | "projects"
  | "research"
  | "network"
  | "approach"
  | "resume"
  | "contact"
  | "manifesto"
  | "project";

export type MobileApp =
  | {
      id: string;
      label: string;
      subtitle: string;
      kind: "project";
      glyph: MobileAppGlyph;
      accent: string;
      projectId: string;
    }
  | {
      id: string;
      label: string;
      subtitle: string;
      kind: "document" | "directory" | "contact" | "resume" | "folder";
      glyph: MobileAppGlyph;
      accent: string;
      documentId?: string;
      directoryId?: "projects" | "research" | "collaborators";
      items?: MobileApp[];
    }
  | {
      id: string;
      label: string;
      subtitle: string;
      kind: "collaborator";
      glyph: MobileAppGlyph;
      accent: string;
      collaboratorId: string;
    };

function projectApp(project: Project): MobileApp {
  return {
    id: project.id,
    label: project.name,
    subtitle: project.shortLabel,
    kind: "project",
    glyph: project.id === "mesh" ? "mesh" : project.id === "morph" ? "morph" : project.id === "hune" ? "hune" : "project",
    accent: project.accent,
    projectId: project.id,
  };
}

const mesh = projectApp(getProject("mesh")!);
const morph = projectApp(getProject("morph")!);
const hune = projectApp(getProject("hune")!);

export const projectsFolder: MobileApp = {
  id: "projects-folder",
  label: "PROJECTS",
  subtitle: "Selected work",
  kind: "folder",
  glyph: "projects",
  accent: "#c8ee3d",
  items: [...primaryProjects, ...archiveProjects].filter((project) => !project.collection).map(projectApp),
};

export const collaboratorsFolder: MobileApp = {
  id: "collaborators-folder",
  label: "WORKED WITH",
  subtitle: "Origin4 network",
  kind: "folder",
  glyph: "network",
  accent: "#f08dbd",
};

export const mobilePages: MobileApp[][] = [
  [
    mesh,
    morph,
    hune,
    projectApp(getProject("rig-veda")!),
    {
      id: "about",
      label: "ABOUT",
      subtitle: "Mugdha + Origin4",
      kind: "document",
      glyph: "about",
      accent: "#f1a64a",
      documentId: "about",
    },
    projectsFolder,
    {
      id: "research",
      label: "RESEARCH",
      subtitle: "Experiments",
      kind: "directory",
      glyph: "research",
      accent: "#a9bcff",
      directoryId: "research",
    },
    {
      id: "approach",
      label: "APPROACH",
      subtitle: "Practice and method",
      kind: "document",
      glyph: "approach",
      accent: "#8fc5b4",
      documentId: "approach",
    },
    {
      id: "resume",
      label: "RESUME",
      subtitle: "Professional record",
      kind: "resume",
      glyph: "resume",
      accent: "#d8d2bd",
    },
  ],
  [
    {
      id: "manifesto",
      label: "MANIFESTO",
      subtitle: "Origin4 notes",
      kind: "document",
      glyph: "manifesto",
      accent: "#f08dbd",
      documentId: "manifesto",
    },
    {
      id: "contact",
      label: "CONTACT",
      subtitle: "Start a conversation",
      kind: "contact",
      glyph: "contact",
      accent: "#c8ee3d",
    },
  ],
];

export const mobileDockApps: MobileApp[] = [
  {
    id: "home",
    label: "HOME",
    subtitle: "Origin4",
    kind: "document",
    glyph: "about",
    accent: "#c8ee3d",
  },
  projectsFolder,
  {
    id: "about-dock",
    label: "ABOUT",
    subtitle: "Mugdha + Origin4",
    kind: "document",
    glyph: "about",
    accent: "#f1a64a",
    documentId: "about",
  },
  {
    id: "contact-dock",
    label: "CONTACT",
    subtitle: "Start a conversation",
    kind: "contact",
    glyph: "contact",
    accent: "#c8ee3d",
  },
  {
    id: "resume-dock",
    label: "RESUME",
    subtitle: "Professional record",
    kind: "resume",
    glyph: "resume",
    accent: "#d8d2bd",
  },
];
