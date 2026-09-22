"use client";

import { useState } from "react";
import type { Project } from "@/content/taxonomy";
import { ProjectDetailLightbox } from "@/components/sections/ProjectDetailLightbox";
import { OngoingProjectsCarousel } from "@/components/sections/OngoingProjectsCarousel";

type OngoingProjectsProps = {
  projects: Project[];
};

export function OngoingProjects({ projects }: OngoingProjectsProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(
    null,
  );

  if (projects.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
            Ongoing execution
          </p>
          <h3 className="mt-3 text-2xl font-bold text-brand sm:text-3xl">
            Active project portfolio
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {projects.length} live engagements across the industries and
            service scopes recorded in the FY25–26 project register.
          </p>
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
          {projects.length} ongoing
        </p>
      </div>

      <OngoingProjectsCarousel
        projects={projects}
        onOpenProject={(_, index) => setActiveProjectIndex(index)}
      />

      {activeProjectIndex !== null ? (
        <ProjectDetailLightbox
          projects={projects}
          activeIndex={activeProjectIndex}
          onClose={() => setActiveProjectIndex(null)}
          onChangeIndex={setActiveProjectIndex}
          backLabel="Back to ongoing projects"
        />
      ) : null}
    </div>
  );
}
