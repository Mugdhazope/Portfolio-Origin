export type ProjectDocument = {
  id: string;
  projectId: string;
  filename: string;
  title: string;
  description: string;
  documentId?: string;
  assetUrl?: string;
  available: boolean;
};

export const projectDocuments: ProjectDocument[] = [
  {
    id: "mesh-overview",
    projectId: "mesh",
    filename: "overview.txt",
    title: "Overview",
    description: "What MESH is and the operational functions it brings together.",
    documentId: "mesh",
    available: true,
  },
  {
    id: "mesh-admin-guide",
    projectId: "mesh",
    filename: "Admin view (user guide).pdf",
    title: "Admin guide",
    description: "Manager and admin workflows — tasks, leaves, attendance, reports.",
    assetUrl: "/assets/playbooks/mesh/Admin view (user guide).pdf",
    available: true,
  },
  {
    id: "mesh-employee-guide",
    projectId: "mesh",
    filename: "Employee View (user guide).pdf",
    title: "Employee guide",
    description: "Employee workflows — tasks, work logs, leave requests, attendance.",
    assetUrl: "/assets/playbooks/mesh/Employee View (user guide).pdf",
    available: true,
  },
  {
    id: "mesh-super-admin-guide",
    projectId: "mesh",
    filename: "Super admin view (user guide).pdf",
    title: "Super admin guide",
    description: "Founder / super admin workflows — settings, permissions, user management.",
    assetUrl: "/assets/playbooks/mesh/Super admin view (user guide).pdf",
    available: true,
  },
  {
    id: "morph-overview",
    projectId: "morph",
    filename: "overview.txt",
    title: "Overview",
    description: "The restaurant platform, menu system and communication layer.",
    documentId: "morph",
    available: true,
  },
  {
    id: "morph-playbook",
    projectId: "morph",
    filename: "morph-playbook-2.pdf",
    title: "Client playbook",
    description: "Digital menu dashboard, guest QR flow, and layout editor guide.",
    assetUrl: "/assets/playbooks/morph-playbook-2.pdf",
    available: true,
  },
  {
    id: "hune-overview",
    projectId: "hune",
    filename: "overview.txt",
    title: "Overview",
    description: "HIUEN product overview.",
    documentId: "hune",
    available: true,
  },
  {
    id: "rig-veda-overview",
    projectId: "rig-veda",
    filename: "overview.txt",
    title: "Overview",
    description: "The 3D explorer, text, audio and search experience.",
    documentId: "rig-veda",
    available: true,
  },
];

export function getProjectDocuments(projectId: string) {
  return projectDocuments.filter((document) => document.projectId === projectId);
}
