"use client";

import { ZoomIn } from "lucide-react";
import type { Project } from "@/content/taxonomy";
import { SiteImage } from "@/components/ui/SiteImage";
import { cn } from "@/lib/utils";

type ProjectShowcaseCardProps = {
  project: Project;
  featured?: boolean;
  compact?: boolean;
  onClick?: () => void;
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

export function ProjectShowcaseCard({
  project,
  featured = false,
  compact = false,
  onClick,
}: ProjectShowcaseCardProps) {
  const years = formatYears(project);
  const tags = project.services.slice(0, compact ? 2 : 4);

  const content = (
    <>
      <div
        className={cn(
          "relative w-full overflow-hidden",
          compact
            ? "aspect-[5/4]"
            : featured
              ? "aspect-[16/10] lg:aspect-[5/3]"
              : "aspect-[4/3]",
        )}
      >
        <SiteImage
          src={project.image}
          alt={`${project.name} — ${project.location}`}
          fill
          sizes={
            compact
              ? "(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 22vw"
              : featured
                ? "(max-width: 1024px) 100vw, 45vw"
                : "(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 22vw"
          }
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
        {onClick ? (
          <>
            <div
              className="absolute inset-0 bg-brand/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
            <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-brand opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100">
              <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </>
        ) : null}
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]",
            project.status === "Ongoing"
              ? "bg-accent text-white"
              : "bg-brand text-white",
          )}
        >
          {project.status}
        </span>
        <div
          className={cn(
            "absolute inset-x-0 bottom-0",
            compact ? "p-4" : "p-5 sm:p-6",
          )}
        >
          <p
            className={cn(
              "font-bold text-white",
              compact
                ? "text-xl tracking-tight"
                : featured
                  ? "stat-display"
                  : "text-2xl tracking-tight sm:text-3xl",
            )}
          >
            {project.value}
          </p>
          <h4
            className={cn(
              "mt-1 font-bold leading-snug text-white",
              compact ? "text-base" : featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
            )}
          >
            {project.name}
          </h4>
        </div>
      </div>

      <div className={cn(compact ? "space-y-2.5 p-4" : "space-y-3 p-5 sm:p-6")}>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          <span>
            {project.city}
            {project.state ? `, ${project.state}` : ""}
          </span>
          {years ? (
            <>
              <span aria-hidden="true" className="text-border">
                ·
              </span>
              <span>{years}</span>
            </>
          ) : null}
        </div>

        {project.epcPartner ? (
          <p className="text-sm text-muted/80">
            via {project.epcPartner}
          </p>
        ) : null}

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={`${project.id}-${tag}`}
                className="rounded-full border border-brand/15 bg-brand/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-brand"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {onClick ? (
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View project details
          </p>
        ) : null}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group flex w-full flex-col overflow-hidden rounded-xl border border-border/70 bg-white text-left shadow-[0_12px_40px_-28px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-[0_24px_60px_-24px_rgba(15,23,42,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        aria-label={`View ${project.name} project details`}
      >
        {content}
      </button>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border/80 bg-white shadow-[0_20px_50px_-32px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_32px_80px_-28px_rgba(15,23,42,0.28)]">
      {content}
    </article>
  );
}
