"use client";

import { useCallback, useEffect, type MouseEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/content/taxonomy";
import { getProjectScopeLabel } from "@/lib/projects";
import { SiteImage } from "@/components/ui/SiteImage";
import { cn } from "@/lib/utils";

type ProjectDetailLightboxProps = {
  projects: Project[];
  activeIndex: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
  backLabel?: string;
};

function formatYears(project: Project) {
  if (project.startYear === "Ongoing" || project.status === "Ongoing") {
    return "Ongoing";
  }
  if (project.startYear && project.endYear) {
    return `${project.startYear}–${project.endYear}`;
  }
  if (project.startYear) return project.startYear;
  return null;
}

export function ProjectDetailLightbox({
  projects,
  activeIndex,
  onClose,
  onChangeIndex,
  backLabel = "Back",
}: ProjectDetailLightboxProps) {
  const project = projects[activeIndex];
  const total = projects.length;
  const years = project ? formatYears(project) : null;

  const showPrevious = useCallback(() => {
    onChangeIndex((activeIndex - 1 + total) % total);
  }, [activeIndex, onChangeIndex, total]);

  const showNext = useCallback(() => {
    onChangeIndex((activeIndex + 1) % total);
  }, [activeIndex, onChangeIndex, total]);

  const handleClose = useCallback(
    (event?: MouseEvent) => {
      event?.stopPropagation();
      onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!project) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, [onClose, project, showNext, showPrevious]);

  if (!project) return null;

  const allTags = [...project.services, ...project.industries];

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} — ${project.location}`}
      onClick={handleClose}
    >
      <button
        type="button"
        onClick={handleClose}
        className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20 sm:left-8 sm:top-8"
        aria-label={backLabel}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        {backLabel}
      </button>

      <button
        type="button"
        onClick={handleClose}
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
        aria-label="Close project viewer"
      >
        <X className="h-5 w-5" />
      </button>

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:inline-flex sm:left-6"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:inline-flex sm:right-6"
            aria-label="Next project"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      ) : null}

      <div
        className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative mx-auto aspect-[4/3] w-full max-h-[min(72vh,720px)] overflow-hidden rounded-lg border border-white/15 shadow-2xl">
          <SiteImage
            src={project.image}
            alt={`${project.name} — ${project.location}`}
            fill
            sizes="(max-width: 1024px) 90vw, 55vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
        </div>

        <div className="text-white">
          <div className="flex flex-wrap gap-2">
            <span
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]",
                project.status === "Ongoing"
                  ? "bg-accent/20 text-accent"
                  : "bg-white/10 text-white/80",
              )}
            >
              {project.status}
            </span>
            {years ? (
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">
                {years}
              </span>
            ) : null}
          </div>

          <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            {project.value}
          </p>
          <h3 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            {project.city}
            {project.state ? `, ${project.state}` : ""}
          </p>

          {project.epcPartner ? (
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              EPC partner: {project.epcPartner}
            </p>
          ) : null}

          {allTags.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <span
                  key={`${project.id}-${tag}`}
                  className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <p className="mt-8 max-w-md text-sm leading-relaxed text-white/55">
            {getProjectScopeLabel(project)}
          </p>

          {total > 1 ? (
            <p className="mt-8 text-sm font-semibold text-white/45">
              Project {activeIndex + 1} of {total}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
