"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { OngoingProjects } from "@/components/sections/OngoingProjects";
import { ProjectBrowseGrid } from "@/components/sections/ProjectBrowseGrid";
import { ProjectsModal } from "@/components/sections/ProjectsModal";
import type { ProjectBrowseCategory } from "@/lib/projects";
import {
  getIndustryBrowseCategories,
  getOngoingProjects,
  getProjectsForCategory,
  getServiceBrowseCategories,
} from "@/lib/projects";

export function Projects() {
  const ongoingProjects = useMemo(() => getOngoingProjects(), []);
  const serviceCategories = useMemo(() => getServiceBrowseCategories(), []);
  const industryCategories = useMemo(() => getIndustryBrowseCategories(), []);
  const [activeCategory, setActiveCategory] =
    useState<ProjectBrowseCategory | null>(null);

  const browseCategories = useMemo(
    () => [...serviceCategories, ...industryCategories],
    [serviceCategories, industryCategories],
  );
  const modalProjects = useMemo(
    () => (activeCategory ? getProjectsForCategory(activeCategory) : []),
    [activeCategory],
  );

  return (
    <section id="projects" className="section-pad overflow-hidden bg-white">
      <Container>
        <FadeIn>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-accent">Projects</p>
            <h2 className="display-section mt-4 font-bold text-brand">
              Landmark industrial execution
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.8] text-muted sm:text-lg">
              From India&apos;s largest lithium-ion battery factory to automotive
              R&D chambers and electronics manufacturing plants — browse by
              service, industry, city, and state.
            </p>
            <div className="engineering-rule mt-8 w-24" />
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <OngoingProjects projects={ongoingProjects} />
        </FadeIn>

        <FadeIn delay={0.12}>
          <ProjectBrowseGrid
            serviceCategories={serviceCategories}
            industryCategories={industryCategories}
            onSelect={setActiveCategory}
          />
        </FadeIn>
      </Container>

      <ProjectsModal
        key={
          activeCategory
            ? `${activeCategory.type}-${activeCategory.slug}`
            : "closed"
        }
        isOpen={activeCategory !== null}
        category={activeCategory}
        projects={modalProjects}
        onClose={() => setActiveCategory(null)}
      />
    </section>
  );
}
