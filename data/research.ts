export type ResearchStatus = "active" | "experimental" | "content-in-progress";

export type ResearchProject = {
  id: string;
  name: string;
  category: string;
  description: string;
  projectId?: string;
  researcher?: string;
  institution?: string;
  technologies: string[];
  topics: string[];
  status: ResearchStatus;
  image?: string;
  links: Array<{ label: string; url: string }>;
  notes: string[];
};

export const researchProjects: ResearchProject[] = [
  {
    id: "lind-wasm",
    name: "LIND-WASM",
    category: "Systems / Security / WebAssembly",
    description:
      "Contributing to Lind-Wasm, a substantial OS and security research system that provides software fault isolation for POSIX-like applications inside WebAssembly runtimes. Lind is a single-process sandbox combining software fault isolation with a kernel microvisor to limit exposure to bugs and security flaws. The lind-wasm extension integrates in-house and third-party components — fdtables, rawposix, threei (syscall mediation and policy), typemap, cage (virtual-memory mapping and signal handling), sysdefs, and lind-boot — with modified glibc, embedded Wasmtime, and Binaryen to run POSIX-like programs with mediated syscalls, memory and process isolation, and runtime integration across C, Rust, C++, and WebAssembly.",
    researcher: "Justin Cappos",
    institution: "New York University",
    technologies: [
      "Rust",
      "C",
      "C++",
      "WebAssembly",
      "Wasmtime",
      "modified glibc",
      "Binaryen",
      "fdtables",
      "rawposix",
      "threei",
      "cage",
      "lind-boot",
    ],
    topics: [
      "Software fault isolation",
      "Kernel microvisor",
      "POSIX compatibility",
      "Syscall mediation and policy",
      "Memory and process isolation",
      "File-descriptor management",
      "Virtual-memory mapping",
      "Signal handling",
      "Runtime integration",
      "WebAssembly optimization",
    ],
    status: "active",
    links: [
      { label: "Lind-Wasm docs", url: "https://lind-project.github.io/lind-wasm/" },
      { label: "GitHub", url: "https://github.com/Lind-Project/lind-wasm" },
    ],
    notes: [],
  },
  {
    id: "coderevival",
    name: "CODEREVIVAL",
    category: "Software systems / Automated recovery",
    description:
      "Developing CodeRevival, a system for automatically reviving older GitHub repositories with as little human intervention as possible. The work discovers outdated software dependencies and test setups, then searches for newer package-version configurations that preserve successful execution. Built around VersionClimber — a Python package aimed at data scientists and engineers that automates multi-package software evolution by upgrading dependency configurations to a working state through command-driven, automated workflows rather than manual trial and error.",
    researcher: "Dennis Shasha",
    institution: "New York University",
    technologies: ["VersionClimber", "Python", "Dependency evolution", "Automated testing"],
    topics: [
      "Repository revival",
      "Dependency evolution",
      "Test configuration discovery",
      "Package-version search",
      "Automated migration workflows",
      "Multi-package system upgrades",
    ],
    status: "active",
    links: [
      { label: "VersionClimber docs", url: "https://versionclimber.readthedocs.io/en/latest/" },
    ],
    notes: [],
  },
  {
    id: "rig-veda",
    name: "RIG VEDA 3D EXPLORER",
    category: "Research / 3D Web Experience / AI Search",
    description:
      "An immersive 3D visualization platform for exploring ancient Rig Veda texts — navigate 10 Mandalas in interactive space with AI-powered semantic search, multi-format Sanskrit text, transliteration, English translation, audio narration, and a Sanskrit dictionary.",
    projectId: "rig-veda",
    technologies: ["Interactive 3D Web", "OpenAI embeddings", "Semantic search"],
    topics: ["3D Navigation", "Semantic Search", "Sanskrit Text", "Audio Narration", "Deep Linking"],
    status: "experimental",
    links: [{ label: "View live", url: "https://rigveda.origin4.co" }],
    notes: [],
  },
  {
    id: "origin-timer",
    name: "ORIGIN TIMER",
    category: "Research / Experimental",
    description: "Description to be added.",
    technologies: [],
    topics: [],
    status: "content-in-progress",
    links: [],
    notes: [],
  },
];

export function getResearchProject(researchId: string) {
  return researchProjects.find((research) => research.id === researchId);
}
