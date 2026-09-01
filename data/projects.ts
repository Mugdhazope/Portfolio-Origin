export type Project = {
  id: string;
  name: string;
  shortName: string;
  category: string;
  type: "product" | "research" | "frontend" | "experimental" | "archive";
  shortLabel: string;
  description: string;
  longDescription?: string;
  role: string;
  year: string;
  technologies: string[];
  techGroups?: Array<{ label: string; items: string[] }>;
  capabilities?: string[];
  whatIBuilt?: string[];
  socialGrowth?: string;
  userCount?: string;
  image?: string;
  images?: string[];
  videos?: string[];
  documents?: string[];
  externalLinks?: Array<{ label: string; url: string }>;
  liveUrl?: string;
  liveUrlLabel?: string;
  githubUrl?: string;
  caseStudy?: string;
  caseStudyId: string;
  gallery: string[];
  accent: string;
  enabled: boolean;
  featured?: boolean;
  primary?: boolean;
  collection?: boolean;
  status: string;
  stats?: string[];
};

export const projects: Project[] = [
  {
    id: "mesh",
    name: "MESH",
    shortName: "MESH",
    category: "Agency OS / SaaS / Workplace Platform",
    type: "product",
    shortLabel: "Workplace OS",
    description:
      "A live multi-agency workplace and business management demo — sales, people ops, attendance, tasks, performance, and reporting in one configurable workspace.",
    longDescription:
      "Mesh is a configurable multi-agency SaaS operating system used by 200+ active users. It unifies sales pipelines, deal tracking, employees, attendance, leave, tasks, and performance management with role-based permissions, workflow states, and operational reporting — customizable and white-labelable per agency.",
    role: "Design & full-stack development",
    year: "2024–2026",
    technologies: [
      "REST APIs",
      "Relational data models",
      "Authentication",
      "RBAC",
      "Workflow states",
      "Operational reporting",
    ],
    techGroups: [
      { label: "APIs & data", items: ["REST APIs", "Relational data models", "Workflow states"] },
      { label: "Auth & access", items: ["Authentication", "RBAC", "Role-based permissions"] },
      { label: "Operations", items: ["Sales pipelines", "Deal tracking", "Attendance", "Leave", "Tasks", "Performance (EPI)"] },
      { label: "Reporting", items: ["Operational reporting", "PDF/CSV exports"] },
    ],
    capabilities: [
      "Dashboard & analytics",
      "Tasks (P1–P3, proof, timeline)",
      "Leave management",
      "Work logs",
      "Attendance (check-in/out, calendar)",
      "Holidays",
      "Performance / EPI scoring",
      "Reports (PDF/CSV)",
      "Sales pipeline & deals",
      "Campaigns",
      "User management",
      "Permissions matrix",
      "Brand customization",
      "Notifications",
    ],
    whatIBuilt: [
      "7 core modules across sales and people operations",
      "Role-based workspace for Founder, Manager, and Employee",
      "Configurable agency white-labeling",
    ],
    userCount: "200+ active users",
    documents: ["overview.txt", "architecture.txt", "modules.txt", "workflows.txt", "documentation.txt"],
    liveUrl: "https://mesh.origin4.co",
    liveUrlLabel: "View Demo",
    caseStudy: "mesh",
    caseStudyId: "mesh",
    gallery: [],
    accent: "#c8ee3d",
    enabled: true,
    primary: true,
    featured: true,
    status: "Active / Live",
    stats: ["200+ users", "7 modules"],
  },
  {
    id: "morph",
    name: "MORPH",
    shortName: "MORPH",
    category: "Restaurant Technology / Digital Menu / CRM",
    type: "product",
    shortLabel: "Restaurant Platform",
    description:
      "A multi-restaurant digital menu SaaS — QR guest flows, layout editor, customer CRM, analytics, and WhatsApp-powered communication.",
    longDescription:
      "Morph is a configurable multi-restaurant platform covering digital menus, QR ordering, customer onboarding, a canvas-style visual layout editor, feedback and review workflows, and end-to-end WhatsApp Business / Meta API integration for campaigns and automated customer communication.",
    role: "Design & full-stack development",
    year: "2024–2026",
    technologies: ["Python", "Django", "Redis", "Docker", "WhatsApp Business API", "Meta API", "Webhooks", "OTP"],
    techGroups: [
      { label: "Backend", items: ["Python", "Django", "REST APIs"] },
      { label: "Infrastructure", items: ["Redis", "Docker"] },
      { label: "Integrations", items: ["WhatsApp Business / Meta API", "Webhooks", "OTP", "Google Reviews"] },
      { label: "Product", items: ["Canvas layout editor", "QR guest flows", "Multi-outlet management", "Customer CRM"] },
    ],
    capabilities: [
      "Multi-outlet digital menus",
      "QR & entry flow",
      "Layout Editor (Welcome, Checked In, Menu, Item Detail)",
      "Menu builder (categories, dishes, photos, tags/badges)",
      "Branding & appearance",
      "Customer CRM (visits, tags, notes, bulk import)",
      "Analytics",
      "WhatsApp campaigns & feedback",
      "Automated customer communication",
      "Google Reviews integration",
    ],
    whatIBuilt: [
      "Canvas-style visual layout editor",
      "WhatsApp Business / Meta API integration",
      "Multi-outlet menu and guest flow system",
    ],
    documents: ["overview.txt", "menu-system.txt", "feedback.txt", "documentation.txt"],
    liveUrl: "https://morph.origin4.co",
    caseStudy: "morph",
    caseStudyId: "morph",
    gallery: [],
    accent: "#a9bcff",
    enabled: true,
    primary: true,
    status: "Active / Live",
  },
  {
    id: "hune",
    name: "HIUEN",
    shortName: "HIUEN",
    category: "Social Travel / Mobile Application",
    type: "experimental",
    shortLabel: "Social Travel",
    description:
      "A live social travel app — meet, match, and travel together. iOS and Android.",
    longDescription:
      "HIUEN is a social travel platform for explorers who want connections, not just destinations. Matching, trip planning, group itineraries, local plans, threads, events, and real-time chat — with verified profiles and 150+ users on the live platform.",
    role: "Design & full-stack development",
    year: "2024–2026",
    technologies: ["React Native", "Expo", "Node.js", "Express.js", "MongoDB", "AWS EC2", "AWS S3"],
    techGroups: [
      { label: "Mobile", items: ["React Native", "Expo", "iOS", "Android"] },
      { label: "Backend", items: ["Node.js", "Express.js", "REST APIs", "MongoDB"] },
      { label: "Infrastructure", items: ["AWS EC2", "AWS S3", "Asynchronous data flows"] },
      { label: "Product", items: ["Authentication", "Profiles", "Discovery", "Matching", "Chat", "Real-time"] },
    ],
    capabilities: [
      "Traveler profiles & Traveler DNA",
      "AI trip planner",
      "Matching & compatibility scores",
      "Group formation & itinerary merges",
      "Explore feed",
      "Nearby spontaneous plans",
      "Threads (anonymous local posts)",
      "Events & deals",
      "Real-time chat",
      "Profile verification",
    ],
    whatIBuilt: [
      "Live iOS and Android application",
      "Backend APIs, MongoDB schemas, and real-time interactions",
      "AWS deployment infrastructure",
    ],
    userCount: "150+ users",
    externalLinks: [
      { label: "App Store", url: "https://apps.apple.com/in/app/hiuen-travel-with-your-vibe/id6753187800" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.hiuen.hiuen&pcampaignid=web_share" },
      { label: "Instagram", url: "https://instagram.com/hiuen.app" },
      { label: "Threads", url: "https://threads.net/@hiuen.app" },
      { label: "Facebook", url: "https://facebook.com/hiuen.app" },
      { label: "LinkedIn", url: "https://linkedin.com/company/hiuen" },
    ],
    documents: ["overview.txt", "product.txt", "social-brand.txt"],
    liveUrl: "https://hiuen.com",
    caseStudy: "hune",
    caseStudyId: "hune",
    gallery: [],
    accent: "#f1a64a",
    enabled: true,
    primary: true,
    status: "Active / Live",
    stats: ["150+ users", "iOS & Android"],
  },
  {
    id: "rig-veda",
    name: "RIG VEDA 3D EXPLORER",
    shortName: "RIG VEDA",
    category: "3D Web Experience / Interactive Visualization / AI Search",
    type: "research",
    shortLabel: "3D Text Explorer",
    description: "An immersive 3D visualization platform for exploring ancient Rig Veda texts with AI-powered semantic search.",
    longDescription:
      "Navigate 10 Mandalas in interactive 3D space. Sanskrit / Devanagari text with transliteration and English translation, AI-powered semantic search via OpenAI embeddings, audio narration, Sanskrit dictionary, and deep linking.",
    role: "Design & development",
    year: "2025–2026",
    technologies: ["Interactive 3D Web", "OpenAI embeddings", "Semantic search"],
    techGroups: [
      { label: "Experience", items: ["Interactive 3D navigation", "10 Mandalas"] },
      { label: "Text", items: ["Sanskrit / Devanagari", "Transliteration", "English translation"] },
      { label: "AI", items: ["Semantic search", "OpenAI embeddings"] },
      { label: "Media", items: ["Audio narration (Hindi & English)", "Sanskrit dictionary", "Deep linking"] },
    ],
    capabilities: ["3D Navigation", "AI-Powered Search", "Sanskrit / Devanagari", "Transliteration", "English Translation", "Audio Narration", "Sanskrit Dictionary", "Deep Linking", "Responsive UI"],
    whatIBuilt: ["3D explorer", "Semantic search layer", "Multi-format text and audio experience"],
    documents: ["overview.txt", "features.txt"],
    liveUrl: "https://rigveda.origin4.co",
    caseStudyId: "rig-veda",
    gallery: [],
    accent: "#b3aaa0",
    enabled: true,
    primary: true,
    status: "Live / Experimental",
  },
  {
    id: "other-projects",
    name: "OTHER PROJECTS",
    shortName: "ARCHIVE",
    category: "Selected work",
    type: "archive",
    shortLabel: "Selected Work",
    description:
      "A curated archive of smaller projects and experiments.",
    role: "",
    year: "",
    technologies: [],
    caseStudy: "manifesto",
    caseStudyId: "manifesto",
    gallery: [],
    accent: "#f08dbd",
    enabled: true,
    collection: true,
    status: "Archive",
  },
  {
    id: "ash-brownie",
    name: "BRWNIE",
    shortName: "BRWNIE",
    category: "Fashion / Brand Concept / Landing Page",
    type: "frontend",
    shortLabel: "Web Experience",
    description: "A premium fashion landing-page concept exploring visual direction, brand atmosphere and digital presentation.",
    role: "",
    year: "",
    technologies: [],
    liveUrl: "https://brwnie.origin4.co",
    githubUrl: undefined,
    caseStudyId: "ash-brownie",
    gallery: [],
    accent: "#d69b79",
    enabled: true,
    status: "Concept / Live",
  },
  {
    id: "plevid",
    name: "PLEVID",
    shortName: "PLEVID",
    category: "Luxury Lighting / Lighting Architecture / Web Experience",
    type: "frontend",
    shortLabel: "Web Experience",
    description: "A highly immersive digital experience for a luxury lighting and lighting architecture brand, built around motion and visual storytelling.",
    role: "",
    year: "",
    technologies: [],
    capabilities: ["Immersive Digital Experience", "Visual Storytelling"],
    liveUrl: "https://plevid.origin4.co",
    githubUrl: undefined,
    caseStudyId: "plevid",
    gallery: [],
    accent: "#cda5e8",
    enabled: true,
    status: "Live",
  },
  {
    id: "map-my-sutta",
    name: "MAP MY SUTTA",
    shortName: "MAP MY SUTTA",
    category: "Open Source / Experimental / Community Platform",
    type: "experimental",
    shortLabel: "Product Experiment",
    description: "An open-source experimental cigarette finder platform built around community-contributed spots and activity.",
    role: "",
    year: "",
    technologies: [],
    capabilities: ["Community Contributions", "Upvoting Spots", "Spot Matrix", "Activity Score", "Weighted Scores", "Last Confirmed", "Spot Notes", "Spot Tags", "Spots"],
    liveUrl: "https://mapmysutta.in",
    githubUrl: undefined,
    caseStudyId: "map-my-sutta",
    gallery: [],
    accent: "#8fc5b4",
    enabled: true,
    status: "Live / Open Source / Experimental",
  },
  {
    id: "gyg",
    name: "GYG / GROOM YOUR GRAM",
    shortName: "GYG",
    category: "Brand Website / Creative Web Design",
    type: "frontend",
    shortLabel: "Brand Website",
    description: "A colorful brand website built around a highly expressive brand identity and visual system.",
    role: "",
    year: "",
    technologies: [],
    caseStudyId: "gyg",
    gallery: [],
    accent: "#cda5e8",
    enabled: true,
    liveUrl: "https://gyg.groomyourgram.in",
    status: "Live",
  },
  {
    id: "babladi",
    name: "BABLADI",
    shortName: "BABLADI",
    category: "Selected Work",
    type: "experimental",
    shortLabel: "Selected Work",
    description: "Project details are configurable.",
    role: "",
    year: "",
    technologies: [],
    caseStudyId: "babladi",
    gallery: [],
    accent: "#d69b79",
    enabled: true,
    status: "Selected Work",
  },
  {
    id: "smoke",
    name: "SMOKE",
    shortName: "SMOKE",
    category: "Experimental",
    type: "experimental",
    shortLabel: "Experiment",
    description: "Project details are being prepared.",
    role: "",
    year: "",
    technologies: [],
    liveUrl: undefined,
    githubUrl: undefined,
    caseStudyId: "smoke",
    gallery: [],
    accent: "#b3aaa0",
    enabled: true,
    status: "Content in progress",
  },
];

export const activeProjects = projects.filter((project) => project.enabled);
export const primaryProjects = activeProjects.filter(
  (project) => project.primary === true,
);
export const archiveProjects = activeProjects.filter(
  (project) => !project.primary && !project.collection,
);

export function getProject(projectId: string) {
  return activeProjects.find((project) => project.id === projectId);
}
