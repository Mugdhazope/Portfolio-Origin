export type CollaboratorType =
  | "person"
  | "agency"
  | "organization"
  | "researcher"
  | "client";

export type Collaborator = {
  id: string;
  name: string;
  type: CollaboratorType;
  role: string;
  description: string;
  projects: string[];
  image?: string;
  websiteUrl?: string;
  linkedinUrl?: string;
};

export const collaborators: Collaborator[] = [];

export function getCollaborator(collaboratorId: string) {
  return collaborators.find((collaborator) => collaborator.id === collaboratorId);
}
