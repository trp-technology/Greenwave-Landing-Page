import { projects } from "@/content/projects";
import type { Project } from "@/content/taxonomy";
import { INDUSTRY_TITLES, SERVICE_TITLES } from "@/content/taxonomy";

export type ProjectCategoryType = "service" | "industry";

export type ProjectBrowseCategory = {
  type: ProjectCategoryType;
  title: string;
  slug: string;
  count: number;
};

export type ProjectFilterOptions = {
  cities: string[];
  states: string[];
};

function slugForTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getOngoingProjects() {
  return projects
    .filter((project) => project.status === "Ongoing")
    .sort((a, b) => b.valueM - a.valueM);
}

export function getCompletedProjects() {
  return projects.filter((project) => project.status === "Completed");
}

export function getProjectsByService(
  serviceTitle: string,
  status?: Project["status"],
) {
  return projects.filter(
    (project) =>
      project.services.includes(serviceTitle) &&
      (status ? project.status === status : true),
  );
}

export function getProjectsByIndustry(
  industryTitle: string,
  status?: Project["status"],
) {
  return projects.filter(
    (project) =>
      project.industries.includes(industryTitle) &&
      (status ? project.status === status : true),
  );
}

export function getServiceBrowseCategories(): ProjectBrowseCategory[] {
  return SERVICE_TITLES.map((title) => ({
    type: "service" as const,
    title,
    slug: slugForTitle(title),
    count: getProjectsByService(title, "Completed").length,
  })).filter((category) => category.count > 0);
}

export function getIndustryBrowseCategories(): ProjectBrowseCategory[] {
  return INDUSTRY_TITLES.map((title) => ({
    type: "industry" as const,
    title,
    slug: slugForTitle(title),
    count: getProjectsByIndustry(title, "Completed").length,
  })).filter((category) => category.count > 0);
}

export function getFilterOptions(projectList: Project[]): ProjectFilterOptions {
  const cities = new Set<string>();
  const states = new Set<string>();

  for (const project of projectList) {
    if (project.city) cities.add(project.city);
    if (project.state) states.add(project.state);
  }

  return {
    cities: [...cities].sort((a, b) => a.localeCompare(b)),
    states: [...states].sort((a, b) => a.localeCompare(b)),
  };
}

export function filterProjects(
  projectList: Project[],
  filters: { city?: string; state?: string },
) {
  return projectList.filter((project) => {
    if (filters.city && project.city !== filters.city) return false;
    if (filters.state && project.state !== filters.state) return false;
    return true;
  });
}

export function getProjectScopeLabel(project: Project) {
  const labels = [...project.services, ...project.scopeServices];
  if (labels.length === 0) return "Industrial MEP execution";
  return labels.join(", ");
}

export function findCategoryBySlug(
  type: ProjectCategoryType,
  slug: string,
): ProjectBrowseCategory | undefined {
  const categories =
    type === "service"
      ? getServiceBrowseCategories()
      : getIndustryBrowseCategories();
  return categories.find((category) => category.slug === slug);
}

export function getProjectsForCategory(category: ProjectBrowseCategory) {
  return category.type === "service"
    ? getProjectsByService(category.title, "Completed")
    : getProjectsByIndustry(category.title, "Completed");
}
