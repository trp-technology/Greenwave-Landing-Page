"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MapPin, X } from "lucide-react";
import { createPortal } from "react-dom";
import type { Project } from "@/content/taxonomy";
import type { ProjectBrowseCategory } from "@/lib/projects";
import { filterProjects, getFilterOptions } from "@/lib/projects";
import { ProjectDetailLightbox } from "@/components/sections/ProjectDetailLightbox";
import { ProjectShowcaseCard } from "@/components/sections/ProjectShowcaseCard";
import { cn } from "@/lib/utils";

type ProjectsModalProps = {
  isOpen: boolean;
  category: ProjectBrowseCategory | null;
  projects: Project[];
  onClose: () => void;
};

export function ProjectsModal({
  isOpen,
  category,
  projects,
  onClose,
}: ProjectsModalProps) {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(
    null,
  );

  const filterOptions = useMemo(() => getFilterOptions(projects), [projects]);

  const filteredProjects = useMemo(
    () =>
      filterProjects(projects, {
        city: city || undefined,
        state: state || undefined,
      }),
    [projects, city, state],
  );

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleCloseDetail = useCallback(() => {
    setActiveProjectIndex(null);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (activeProjectIndex !== null) {
          setActiveProjectIndex(null);
          return;
        }
        handleClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProjectIndex, handleClose, isOpen]);

  if (!isOpen || !category) return null;

  const hasActiveFilters = Boolean(city || state);
  const detailOpen = activeProjectIndex !== null;

  const detailLightbox =
    detailOpen && typeof document !== "undefined"
      ? createPortal(
          <ProjectDetailLightbox
            projects={filteredProjects}
            activeIndex={activeProjectIndex}
            onClose={handleCloseDetail}
            onChangeIndex={setActiveProjectIndex}
            backLabel={`Back to ${category.title}`}
          />,
          document.body,
        )
      : null;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] flex items-end justify-center bg-charcoal/90 p-0 backdrop-blur-sm sm:items-center sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="projects-modal-title"
        onClick={handleClose}
      >
        <div
          className={cn(
            "flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-t-2xl border border-border/60 bg-white shadow-[0_40px_120px_-40px_rgba(15,23,42,0.55)] sm:rounded-2xl",
            detailOpen && "pointer-events-none opacity-40",
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="border-b border-border/80 bg-surface/50 px-5 py-5 sm:px-8 sm:py-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                  {category.type === "service" ? "Service" : "Industry"}
                </p>
                <h2
                  id="projects-modal-title"
                  className="mt-2 text-2xl font-bold text-brand sm:text-3xl"
                >
                  {category.title}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {filteredProjects.length} of {projects.length} projects
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full border border-border bg-white p-2 text-muted transition-colors hover:border-brand/30 hover:text-brand"
                aria-label="Close projects"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
              <label className="flex flex-1 flex-col gap-2 text-xs font-bold uppercase tracking-[0.12em] text-brand">
                City
                <div className="relative">
                  <MapPin
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                    aria-hidden="true"
                  />
                  <select
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    className="w-full appearance-none rounded-lg border border-border bg-white py-2.5 pl-10 pr-10 text-sm font-normal normal-case tracking-normal text-foreground outline-none transition-colors focus:border-brand/40"
                  >
                    <option value="">All cities</option>
                    {filterOptions.cities.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </label>

              <label className="flex flex-1 flex-col gap-2 text-xs font-bold uppercase tracking-[0.12em] text-brand">
                State
                <select
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                  className="w-full appearance-none rounded-lg border border-border bg-white px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-foreground outline-none transition-colors focus:border-brand/40"
                >
                  <option value="">All states</option>
                  {filterOptions.states.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={() => {
                    setCity("");
                    setState("");
                  }}
                  className="rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:border-brand/30"
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>

          <div className="overflow-y-auto bg-white px-5 py-6 sm:px-8">
            {filteredProjects.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((project, index) => (
                  <ProjectShowcaseCard
                    key={project.id}
                    project={project}
                    compact
                    onClick={() => setActiveProjectIndex(index)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
                <p className="text-lg font-semibold text-brand">
                  No projects match these filters
                </p>
                <p className="mt-2 text-sm text-muted">
                  Try clearing the city or state filter to see all projects in
                  this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {detailLightbox}
    </>
  );
}
