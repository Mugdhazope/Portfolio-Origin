export type NavigationId =
  | "home"
  | "projects"
  | "research"
  | "about"
  | "experience"
  | "approach"
  | "contact"
  | "resume";

export const navigationItems: Array<{
  id: NavigationId;
  label: string;
  description: string;
}> = [
  { id: "home", label: "Home", description: "Return to desktop" },
  { id: "projects", label: "Projects", description: "Browse selected work" },
  { id: "research", label: "Research", description: "Open technical research" },
  { id: "about", label: "About", description: "Meet Mugdha and Origin4" },
  { id: "experience", label: "Experience", description: "View work history" },
  { id: "approach", label: "Approach", description: "Practice and method" },
  { id: "contact", label: "Contact", description: "Start a conversation" },
  { id: "resume", label: "Resume", description: "Open resume viewer" },
];
