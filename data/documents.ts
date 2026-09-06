export type DocumentId =
  | "about"
  | "approach"
  | "manifesto"
  | "experience"
  | "contact"
  | "mesh"
  | "morph"
  | "hune"
  | "rig-veda"
  | "ash-brownie"
  | "plevid"
  | "map-my-sutta"
  | "gyg"
  | "babladi"
  | "smoke";

export type DocumentSection = {
  label: string;
  body: string;
};

export type StudioDocument = {
  id: DocumentId;
  filename: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: DocumentSection[];
};

export const documents: StudioDocument[] = [
  {
    id: "about",
    filename: "about.txt",
    eyebrow: "ORIGIN4 / PROFILE",
    title: "Make space for better ideas.",
    intro:
      "Origin4 is an independent studio by Mugdha Zope — software engineer, product designer, and builder.",
    sections: [
      {
        label: "Mugdha Zope",
        body: "Software Engineer · Product Designer\n\nBuilding digital products, systems, and experiments with curiosity and care.",
      },
      {
        label: "Practice",
        body: "Workplace and operations systems — building tools like Mesh that run day-to-day business in one place.\nRestaurant and digital menu platforms — Morph and the craft of making hospitality software feel human.\nMobile social products — Hiuen and the messiness of real-world connection.\nSystems and security research — Lind-Wasm, sandboxing, and POSIX in WebAssembly.\nAutomated code recovery — CodeRevival and VersionClimber for reviving legacy repositories.\n3D and AI experiences — Rig Veda and experiments at the edge of text, space, and search.\nBrand and web experiences — BRWNIE, PLEVID, and smaller sites that still need a point of view.\nThe occasional experiment that does not fit anywhere else.",
      },
      {
        label: "Origin",
        body: "An independent studio workspace for products, design, research, experiments, and the people around the work.",
      },
    ],
  },
  {
    id: "approach",
    filename: "approach.txt",
    eyebrow: "ORIGIN4 / METHOD",
    title: "Start close. Build with intent.",
    intro:
      "Every project gets its own shape. The method stays curious, clear, and close to the work.",
    sections: [
      {
        label: "01 — OBSERVE",
        body: "Stay close to the problem before naming a solution.\nListen for what people actually do, not what they say they want.\nLet the friction and the odd details stay visible — they often hold the real shape of the work.",
      },
      {
        label: "02 — DEFINE",
        body: "Draw the edges of the system before building inside it.\nName what matters, what does not, and what can wait.\nA clear frame makes the rest of the work feel less like guessing.",
      },
      {
        label: "03 — BUILD",
        body: "Turn the idea into something that runs — a screen, a service, a prototype, a workflow.\nKeep it useful early, even when it is not polished.\nLet the build teach you what the definition missed.",
      },
      {
        label: "04 — REFINE",
        body: "Remove what does not earn its place.\nTighten the flows, the copy, the structure.\nLeave behind something that feels considered — not just finished.",
      },
    ],
  },
  {
    id: "manifesto",
    filename: "manifesto.txt",
    eyebrow: "ORIGIN4 / NOTES",
    title: "A small manifesto.",
    intro: "The work should feel considered before it feels finished.",
    sections: [
      { label: "01", body: "Make the unfamiliar feel welcoming." },
      { label: "02", body: "Keep the human detail." },
      { label: "03", body: "Let the interface have a point of view." },
      { label: "04", body: "Build less. Mean more." },
    ],
  },
  {
    id: "mesh",
    filename: "mesh.txt",
    eyebrow: "MESH / CASE STUDY",
    title: "MESH",
    intro:
      "A live multi-agency workplace and business management demo — a configurable SaaS operating system used by 200+ active users.",
    sections: [
      {
        label: "What it is",
        body: "Mesh is a workplace and business management system — not a generic software project. It is a configurable multi-agency SaaS platform that brings sales, people operations, attendance, tasks, performance, and reporting into one company workspace. Agencies can adapt branding, permissions, and operational workflows to their own identity.",
      },
      {
        label: "Why it was built",
        body: "Agencies run on scattered tools — spreadsheets for deals, separate apps for attendance, ad-hoc task tracking, manual reporting. Mesh was built to unify day-to-day operations so founders, managers, and employees work from a single system with role-based access and operational visibility.",
      },
      {
        label: "Problem",
        body: "Operational fragmentation: deal tracking disconnected from task execution, attendance disconnected from performance scoring, leave approvals buried in chat, reports assembled manually. Mesh addresses this by structuring work around roles, permissions, and workflow states inside one workspace.",
      },
      {
        label: "System structure",
        body: "A company workspace with a dashboard, modular operations (tasks, leaves, work logs, attendance, holidays, performance/EPI), sales pipeline and deal tracking, user management, settings (brand, permissions, departments), and reporting (PDF/CSV). Customizable white-labeling for agency identity.",
      },
      {
        label: "User roles",
        body: "Founder / Super Admin (Founder) — full company control: users, settings, reports, approvals.\nAdmin / Manager (MANAGER) — day-to-day people ops when permissions enabled; cannot change global settings.\nEmployee (EMPLOYEE) — tasks, work logs, leave requests, attendance; no settings or user management.\nPermissions matrix in Settings controls what managers can assign, approve, view, or edit.",
      },
      {
        label: "Major capabilities",
        body: "Dashboard with task counts, attendance trends, EPI leaderboard, recent activity.\nTasks — create, assign, priorities (P1–P3), deadlines, proof links, CC, comments, Start/Complete.\nLeaves — request, approve/reject (permission-based).\nWork logs — log work, review, mark reviewed.\nAttendance — check-in/out, calendar codes (OP, OL, A, WFH, H), punctuality leaderboard.\nHolidays — single/bulk, mark Sundays.\nPerformance (EPI) — scoring from task completion, on-time delivery, attendance punctuality.\nReports — monthly Tasks, Attendance, Leave, Employee, Performance (PDF/CSV).\nSales pipeline, leads/deals, campaigns.\nUser management, employee profiles, notifications.",
      },
      {
        label: "Technical architecture",
        body: "REST APIs and relational data models.\nAuthentication and RBAC with role-based permissions.\nWorkflow states across operational modules.\nOperational reporting across configurable agency operations.\n7 core modules: sales pipelines, deal tracking, employees, attendance, leave, tasks, performance management.",
      },
      {
        label: "Key workflows",
        body: "Tasks: New Task → assign → Start → (optional proof) → Complete.\nLeaves: Request → approver → Approve/Reject.\nWork logs: Log Today → manager marks reviewed.\nAttendance: Check-in/out with calendar analytics.\nReports: pick month → download PDF/CSV.\nOnboarding: User Management → create Admin or Employee with department and initial password.",
      },
      {
        label: "Outcome",
        body: "A live demo workplace used by 200+ active users across configurable agency operations — unifying sales, people ops, and reporting in one system.",
      },
    ],
  },
  {
    id: "morph",
    filename: "morph.txt",
    eyebrow: "MORPH / CASE STUDY",
    title: "MORPH",
    intro:
      "A multi-restaurant digital menu SaaS — QR ordering, customer CRM, layout editing, and WhatsApp-powered communication.",
    sections: [
      {
        label: "What it is",
        body: "Morph is a configurable multi-restaurant SaaS platform covering digital menus, QR guest flows, customer onboarding, feedback and review workflows, and automated customer communication. Each outlet has its own menu, QR link, layout, and branding.",
      },
      {
        label: "Why",
        body: "Restaurants need more than a static PDF menu — they need branded digital experiences, guest check-in flows, customer visit tracking, and channels to collect feedback and run campaigns without manual follow-up.",
      },
      {
        label: "Guest flow",
        body: "Scan QR → Welcome (optional check-in) → Checked In (loyalty progress) → Menu → Item Detail.\nGuests browse categories, dishes with photos, tags (Bestseller, Chef's Pick, Popular, New, Featured, Jain), and per-dish layout overrides.",
      },
      {
        label: "Dashboard",
        body: "Dashboard, Customers, Import Customers, Menu, Layout Editor, QR & Entry Flow, Analytics, Settings.\nMenu builder: categories, dishes (name, description, price, photo, image scale 50–200%, tags/badges).\nBranding: logo, tagline, colors, background (solid/gradient/image), tag chip styles.\nLayout Editor: phone preview for Welcome, Checked In, Menu, Item Detail pages.\nCustomer CRM: visit tracking, tags, notes, bulk import.\nAnalytics: customer growth and outlet trends.",
      },
      {
        label: "Communication",
        body: "End-to-end WhatsApp Business / Meta API integration for campaign messaging, feedback notifications, and automated customer communication.\nFeedback and review workflows.\nGoogle Reviews integration.\nWebhooks, OTP, and campaign tooling.",
      },
      {
        label: "Technology",
        body: "Python / Django backend.\nRedis caching.\nDocker deployment.\nWhatsApp Business / Meta API.\nCanvas-style visual layout editor.\nWebhooks and OTP for guest flows.",
      },
      {
        label: "Launch workflow",
        body: "Outlets → Menu → Appearance → Layout Editor → QR download/test.\nRecommended path for restaurant staff onboarding from the client playbook.",
      },
      {
        label: "Outcome",
        body: "A live restaurant platform combining digital menus, visual customization, customer CRM, and WhatsApp-driven communication in one multi-outlet system.",
      },
    ],
  },
  {
    id: "hune",
    filename: "hune.txt",
    eyebrow: "HIUEN / CASE STUDY",
    title: "HIUEN",
    intro:
      "A live social travel app — meet, match, and travel together. Available on iOS and Android.",
    sections: [
      {
        label: "Product",
        body: "HIUEN is a social travel application for explorers who want connections, not just destinations. Plan trips, find like-minded travelers, match on lifestyle and travel style, create shared itineraries, join local plans, discover events, and stay engaged through daily threads.\nTrust features: verified profiles, group-based meetups, block and report.\n150+ users on the live platform.",
      },
      {
        label: "Why",
        body: "Travel is social — but planning often happens alone, in group chats, or through flaky coordination. HIUEN starts the adventure when you open the app: matching before the trip, not just during it.",
      },
      {
        label: "Capabilities",
        body: "Traveler profiles and Traveler DNA (lifestyle preferences).\nAI trip planner and public/private itineraries.\nMatching with compatibility scores and profile verification.\nGroup formation and itinerary merges.\nExplore feed, Nearby spontaneous plans, Threads (anonymous local posts).\nEvents, deals, and group chats.\nReal-time chat and interactions.",
      },
      {
        label: "Technology",
        body: "React Native / Expo mobile application.\nNode.js / Express.js backend.\nMongoDB schemas, REST APIs, asynchronous data flows, pagination.\nAWS EC2 / S3 deployment.\nAuthentication, profiles, discovery, matching, chat.",
      },
      {
        label: "Links",
        body: "App Store · Google Play · Instagram · Threads · Facebook · LinkedIn\nLive at hiuen.com",
      },
      {
        label: "Outcome",
        body: "A shipped social travel product on iOS and Android — from matching and trip planning to real-time chat and local discovery.",
      },
    ],
  },
  {
    id: "rig-veda",
    filename: "rig-veda.txt",
    eyebrow: "RIG VEDA / CASE STUDY",
    title: "RIG VEDA 3D EXPLORER",
    intro: "An immersive 3D visualization platform for exploring ancient Rig Veda texts.",
    sections: [
      { label: "What", body: "An immersive 3D visualization platform for exploring ancient Rig Veda texts — 10 Mandalas in interactive space." },
      { label: "Why", body: "Ancient texts deserve more than flat pages. Rig Veda Explorer makes the structure of the text navigable and searchable in three dimensions." },
      { label: "System", body: "3D navigation, AI-powered semantic search, multi-format text, audio narration, Sanskrit dictionary, deep linking, and responsive UI." },
      { label: "Navigation", body: "Explore 10 Mandalas as interactive 3D space." },
      { label: "Search", body: "AI-powered semantic search using OpenAI embeddings." },
      { label: "Text", body: "Sanskrit / Devanagari\nTransliteration\nEnglish translation" },
      { label: "Audio", body: "Hindi and English narration with word-by-word highlighting." },
      { label: "Tools", body: "Sanskrit dictionary\nDeep linking\nResponsive UI" },
      { label: "Role", body: "Design and development of the 3D explorer, search, and text experience." },
      { label: "Technology", body: "Interactive 3D web experience\nAI-powered semantic search (OpenAI embeddings)\nSanskrit / Devanagari, transliteration, English translation\nAudio narration (Hindi and English)" },
      { label: "Outcome", body: "A live experimental explorer at rigveda.origin4.co — combining 3D navigation, semantic search, and multi-format text with audio." },
    ],
  },
  {
    id: "ash-brownie",
    filename: "brwnie.txt",
    eyebrow: "BRWNIE / CASE STUDY",
    title: "BRWNIE",
    intro: "Case study content is configurable for this project.",
    sections: [
      { label: "What", body: "Content configurable." },
      { label: "Why", body: "Content configurable." },
      { label: "System", body: "Content configurable." },
      { label: "Role", body: "Details to be added." },
      { label: "Technology", body: "Details to be added." },
      { label: "Outcome", body: "Content configurable." },
    ],
  },
  {
    id: "plevid",
    filename: "plevid.txt",
    eyebrow: "PLEVID / CASE STUDY",
    title: "PLEVID",
    intro: "Case study content is configurable for this project.",
    sections: [
      { label: "What", body: "An immersive digital experience for a luxury lighting and lighting architecture brand." },
      { label: "Why", body: "Content configurable." },
      { label: "System", body: "Content configurable." },
      { label: "Role", body: "Details to be added." },
      { label: "Technology", body: "Details to be added." },
      { label: "Outcome", body: "Content configurable." },
    ],
  },
  {
    id: "map-my-sutta",
    filename: "map-my-sutta.txt",
    eyebrow: "MAP MY SUTTA / CASE STUDY",
    title: "MAP MY SUTTA",
    intro: "Case study content is configurable for this project.",
    sections: [
      { label: "What", body: "An open-source cigarette finder with community-contributed spots." },
      { label: "Why", body: "Content configurable." },
      { label: "System", body: "Spot Matrix, Activity Score, Weighted Scores, Last Confirmed, Spot Notes, and Spot Tags." },
      { label: "Role", body: "Details to be added." },
      { label: "Technology", body: "Details to be added." },
      { label: "Outcome", body: "Content configurable." },
    ],
  },
  {
    id: "gyg",
    filename: "gyg.txt",
    eyebrow: "GYG / CASE STUDY",
    title: "GYG / GROOM YOUR GRAM",
    intro: "Case study content is configurable for this project.",
    sections: [
      { label: "What", body: "A colorful brand website reflecting its brand identity." },
      { label: "Why", body: "Content configurable." },
      { label: "System", body: "Content configurable." },
      { label: "Role", body: "Details to be added." },
      { label: "Technology", body: "Details to be added." },
      { label: "Outcome", body: "Content configurable." },
    ],
  },
  {
    id: "babladi",
    filename: "babladi.txt",
    eyebrow: "BABLADI / CASE STUDY",
    title: "BABLADI",
    intro: "Project details are configurable.",
    sections: [
      { label: "What", body: "Content configurable." },
      { label: "Why", body: "Content configurable." },
      { label: "System", body: "Content configurable." },
      { label: "Role", body: "Details to be added." },
      { label: "Technology", body: "Details to be added." },
      { label: "Outcome", body: "Content configurable." },
    ],
  },
  {
    id: "smoke",
    filename: "smoke.txt",
    eyebrow: "SMOKE / CASE STUDY",
    title: "SMOKE",
    intro: "Project details are configurable.",
    sections: [
      { label: "What", body: "Content configurable." },
      { label: "Why", body: "Content configurable." },
      { label: "System", body: "Content configurable." },
      { label: "Role", body: "Details to be added." },
      { label: "Technology", body: "Details to be added." },
      { label: "Outcome", body: "Content configurable." },
    ],
  },
  {
    id: "experience",
    filename: "experience.txt",
    eyebrow: "MUGDHA / EXPERIENCE",
    title: "Work in systems and products.",
    intro: "A concise record of engineering, product, and technical work.",
    sections: [
      {
        label: "Zwilling Labs / IIT Bombay",
        body: "Full Stack Engineer · Feb 2026 – Present\n\nBackend development across enterprise deployments — Go/Rust services, REST APIs, PostgreSQL/TimescaleDB schemas, Docker/Kubernetes, CI/CD, and production observability. Owned the Hitachi deployment end-to-end (150+ machines, operator/supervisor/admin workflows). Mentored interns.",
      },
      {
        label: "Vervelo",
        body: "Software Engineer · Jan 2025 – Present\n\nBackend systems across client projects using Python/Django and Java/Spring Boot — healthcare REST APIs, Redis caching, authentication, RBAC, AWS EC2 deployment, and production troubleshooting.",
      },
      {
        label: "Thinkitive Technologies, Pune",
        body: "Web Developer · Feb 2024 – Dec 2024\n\nReact enterprise dashboards, REST API integration, reusable components, and frontend-backend data flows.",
      },
      {
        label: "Bharat Intern",
        body: "Full Stack Web Development Intern · Oct 2023 – Nov 2023\n\nFull-stack web development internship.",
      },
      {
        label: "Students' Council · Cultural Secretary",
        body: "Fr. CRCE · Jul 2023 – Jun 2024\n\nLed cultural initiatives and programming for the student council.",
      },
      {
        label: "GroomYourGram",
        body: "Influencer Marketing Intern · Jun 2023 – Aug 2023\n\nMumbai, Maharashtra · On-site influencer marketing work.",
      },
      {
        label: "Students' Council · SE Representative",
        body: "Fr. CRCE · Jul 2022 – Jun 2023\n\nSoftware Engineering department representative on the student council.",
      },
      {
        label: "Muskurahat Foundation",
        body: "Fundraising Intern · Dec 2022 – Jan 2023\n\nFundraising and public relations.",
      },
      {
        label: "Neergyan Institute",
        body: "Content Writer · May 2022 – Jun 2022\n\nContent writing and visual design with Canva.",
      },
    ],
  },
  {
    id: "contact",
    filename: "contact.txt",
    eyebrow: "MUGDHA / CONTACT",
    title: "Say hello.",
    intro: "For projects, research, or anything worth building.",
    sections: [
      { label: "Reach out", body: "LinkedIn, GitHub, or email — use the icons in Contact / About." },
    ],
  },
];

export function getDocument(documentId: string) {
  return documents.find((document) => document.id === documentId);
}
