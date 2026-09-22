import type { Project } from "@/content/taxonomy";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProjectShowcaseCard } from "@/components/sections/ProjectShowcaseCard";

type CompletedProjectsProps = {
  projects: Project[];
};

export function CompletedProjects({ projects }: CompletedProjectsProps) {
  return (
    <div
      id="completed-projects"
      className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-12"
    >
      <div
        className="pointer-events-none absolute inset-0 dot-pattern opacity-40"
        aria-hidden="true"
      />

      <div className="relative">
        <FadeIn>
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Completed landmark
          </h3>
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {projects.map((project, index) => (
            <FadeIn
              key={project.id}
              delay={0.04 + index * 0.03}
            >
              <ProjectShowcaseCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
