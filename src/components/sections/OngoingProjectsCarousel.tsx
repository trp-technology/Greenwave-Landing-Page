"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import type { Project } from "@/content/taxonomy";
import { getProjectScopeLabel } from "@/lib/projects";
import { SiteImage } from "@/components/ui/SiteImage";
import { cn } from "@/lib/utils";

type OngoingProjectsCarouselProps = {
  projects: Project[];
  onOpenProject: (project: Project, index: number) => void;
};

const slideTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 32,
  mass: 0.85,
};

function formatIndex(index: number, total: number) {
  return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}

export function OngoingProjectsCarousel({
  projects,
  onOpenProject,
}: OngoingProjectsCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<number | null>(null);
  const total = projects.length;
  const project = projects[active];

  const goTo = useCallback(
    (index: number, nextDirection?: 1 | -1) => {
      if (index === active) return;
      setDirection(
        nextDirection ??
          (index > active || (active === total - 1 && index === 0) ? 1 : -1),
      );
      setActive((index + total) % total);
    },
    [active, total],
  );

  const showPrevious = useCallback(() => {
    goTo((active - 1 + total) % total, -1);
  }, [active, goTo, total]);

  const showNext = useCallback(() => {
    goTo((active + 1) % total, 1);
  }, [active, goTo, total]);

  useEffect(() => {
    if (reduceMotion || total <= 1 || paused) return;

    timerRef.current = window.setInterval(showNext, 6000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [paused, reduceMotion, showNext, total]);

  const motionProps = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      }
    : {
        initial: { opacity: 0, x: direction * 48 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: direction * -48 },
        transition: slideTransition,
      };

  if (!project) return null;

  const progress = ((active + 1) / total) * 100;

  return (
    <div
      className="mt-10 overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-[0_24px_80px_-40px_rgba(15,23,42,0.18)]"
    >
      <div className="relative min-h-[420px] overflow-hidden lg:min-h-[460px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={project.id}
            custom={direction}
            {...motionProps}
            className="grid h-full lg:grid-cols-[1.15fr_0.85fr]"
          >
            <button
              type="button"
              onClick={() => onOpenProject(project, active)}
              className="group relative min-h-[260px] overflow-hidden text-left lg:min-h-[460px]"
              aria-label={`View ${project.name} project details`}
            >
              <SiteImage
                src={project.image}
                alt={`${project.name} — ${project.location}`}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-charcoal/10" />
              <div className="absolute inset-0 bg-brand/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <span className="absolute left-5 top-5 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                Ongoing
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:hidden">
                <p className="stat-display font-bold text-white">{project.value}</p>
                <h4 className="mt-2 text-2xl font-bold text-white">
                  {project.name}
                </h4>
                <p className="mt-2 text-sm text-white/75">{project.location}</p>
              </div>
            </button>

            <div className="flex flex-col justify-between bg-white p-6 sm:p-8 lg:p-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                  {formatIndex(active, total)}
                </p>
                <p className="mt-4 hidden text-3xl font-bold text-accent lg:block">
                  {project.value}
                </p>
                <h4 className="mt-3 hidden text-2xl font-bold text-brand sm:text-3xl lg:block">
                  {project.name}
                </h4>
                <p className="mt-3 hidden text-base text-muted lg:block">
                  {project.location}
                  {project.epcPartner ? ` · via ${project.epcPartner}` : ""}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 lg:mt-6">
                  {project.services.slice(0, 4).map((service) => (
                    <span
                      key={`${project.id}-${service}`}
                      className="rounded-full border border-brand/15 bg-brand/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-brand"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <p className="mt-5 line-clamp-3 text-sm leading-relaxed text-muted lg:mt-6">
                  {getProjectScopeLabel(project)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenProject(project, active)}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-brand/20 bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-dark hover:shadow-[0_12px_32px_-16px_rgba(26,71,49,0.45)]"
              >
                View project details
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="border-t border-border/80 bg-white px-4 py-4 sm:px-6">
        <div className="mb-4 h-1 overflow-hidden rounded-full bg-border/80">
          <motion.div
            className="h-full rounded-full bg-accent"
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 220, damping: 30 }}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={showPrevious}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-brand transition-colors hover:border-brand/30 hover:bg-surface"
              aria-label="Previous ongoing project"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-brand transition-colors hover:border-brand/30 hover:bg-surface"
              aria-label="Next ongoing project"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setPaused((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-brand/30 hover:text-brand"
              aria-label={paused ? "Resume autoplay" : "Pause autoplay"}
            >
              {paused ? (
                <Play className="h-4 w-4" />
              ) : (
                <Pause className="h-4 w-4" />
              )}
            </button>
          </div>

          <p className="hidden truncate text-sm font-medium text-brand sm:block">
            {project.name}
          </p>

          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
            {formatIndex(active, total)}
          </p>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {projects.map((item, index) => {
            const isCurrent = index === active;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-left text-xs font-semibold transition-all",
                  isCurrent
                    ? "border-brand bg-brand text-white"
                    : "border-border bg-white text-muted hover:border-brand/25 hover:text-brand",
                )}
                aria-current={isCurrent ? "true" : undefined}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        Showing ongoing project {active + 1} of {total}: {project.name}
      </span>
    </div>
  );
}
