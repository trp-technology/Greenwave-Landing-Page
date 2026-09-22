"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { SiteImage } from "@/components/ui/SiteImage";
import type { Project } from "@/content/taxonomy";
import { cn } from "@/lib/utils";

type ProjectStackProps = {
  projects: Project[];
  getScopeLabel?: (project: Project) => string;
  onOpenProject?: (project: Project, index: number) => void;
};

type StackLayer = {
  x: number;
  y: number;
  rotate: number;
  rotateY: number;
  scale: number;
  opacity: number;
  zIndex: number;
  blur: number;
};

const STACK_LAYERS: StackLayer[] = [
  {
    x: 0,
    y: 0,
    rotate: 0,
    rotateY: 0,
    scale: 1,
    opacity: 1,
    zIndex: 30,
    blur: 0,
  },
  {
    x: -54,
    y: 32,
    rotate: -5,
    rotateY: 6,
    scale: 0.955,
    opacity: 0.94,
    zIndex: 20,
    blur: 0.6,
  },
  {
    x: -108,
    y: 64,
    rotate: -8,
    rotateY: 10,
    scale: 0.91,
    opacity: 0.86,
    zIndex: 10,
    blur: 1.2,
  },
];

const springTransition: Transition = {
  type: "spring",
  stiffness: 210,
  damping: 28,
  mass: 0.85,
};

function getLayer(index: number, active: number, total: number) {
  const position = (index - active + total) % total;
  return STACK_LAYERS[position] ?? STACK_LAYERS[STACK_LAYERS.length - 1];
}

export function ProjectStack({
  projects,
  getScopeLabel,
  onOpenProject,
}: ProjectStackProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = projects.length;
  const timerRef = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => setActive((index + total) % total),
    [total],
  );

  const advance = useCallback(() => {
    setActive((current) => (current + 1) % total);
  }, [total]);

  useEffect(() => {
    if (reduceMotion || total <= 1 || paused) return;

    timerRef.current = window.setInterval(advance, 5000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [advance, paused, reduceMotion, total]);

  const instantTransition = reduceMotion
    ? { duration: 0 }
    : springTransition;

  return (
    <div
      className="relative mx-auto h-[500px] w-full max-w-[340px] sm:h-[540px] sm:max-w-[360px] lg:mx-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="relative h-full w-full [perspective:1200px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {projects.map((project, index) => {
          const layer = getLayer(index, active, total);
          const isActive = index === active;

          return (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => {
                if (isActive && onOpenProject) {
                  onOpenProject(project, index);
                  return;
                }
                goTo(index);
              }}
              className={cn(
                "absolute left-1/2 top-0 w-[min(100%,320px)] -translate-x-1/2 overflow-hidden rounded-xl border bg-white text-left outline-none will-change-transform",
                isActive
                  ? "cursor-pointer border-border/80"
                  : "cursor-pointer border-border/60",
              )}
              style={{ transformStyle: "preserve-3d" }}
              initial={false}
              animate={{
                x: layer.x,
                y: layer.y,
                rotate: layer.rotate,
                rotateY: reduceMotion ? 0 : layer.rotateY,
                scale: layer.scale,
                opacity: layer.opacity,
                zIndex: layer.zIndex,
                filter: `blur(${layer.blur}px)`,
                boxShadow: isActive
                  ? "0 32px 80px -24px rgba(15, 23, 42, 0.38), 0 12px 32px -16px rgba(15, 23, 42, 0.18)"
                  : "0 20px 50px -28px rgba(15, 23, 42, 0.22)",
              }}
              transition={instantTransition}
              whileHover={
                reduceMotion || isActive
                  ? undefined
                  : {
                      scale: layer.scale + 0.025,
                      y: layer.y - 6,
                      transition: { duration: 0.25 },
                    }
              }
              whileTap={isActive ? undefined : { scale: layer.scale + 0.01 }}
              aria-label={
                isActive && onOpenProject
                  ? `Open ${project.name} project details`
                  : `View ${project.name} project`
              }
              aria-pressed={isActive}
            >
              <motion.div
                className="relative aspect-[4/3] w-full overflow-hidden"
                animate={{ scale: isActive ? 1 : 1.04 }}
                transition={instantTransition}
              >
                <SiteImage
                  src={project.image}
                  alt={`${project.name} — ${project.location}`}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
                <span
                  className={cn(
                    "absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide",
                    project.status === "Ongoing"
                      ? "bg-accent text-white"
                      : "bg-brand text-white",
                  )}
                >
                  {project.status}
                </span>
              </motion.div>

              <motion.div
                className="p-5"
                animate={{
                  opacity: isActive ? 1 : 0.72,
                  y: isActive ? 0 : 4,
                }}
                transition={instantTransition}
              >
                <h3 className="text-lg font-bold text-foreground">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{project.location}</p>
                <p className="mt-3 text-2xl font-bold text-accent">
                  {project.value}
                </p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
                  {getScopeLabel?.(project) ??
                    [...project.services, ...project.scopeServices].join(", ")}
                </p>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {projects.map((project, index) => {
          const isCurrent = index === active;

          return (
            <button
              key={`dot-${project.id}`}
              type="button"
              onClick={() => goTo(index)}
              className="relative flex h-2 items-center justify-center"
              aria-label={`Show ${project.name}`}
            >
              <motion.span
                layout
                className={cn(
                  "block h-2 rounded-full",
                  isCurrent ? "bg-accent" : "bg-border hover:bg-muted",
                )}
                animate={{
                  width: isCurrent ? 32 : 8,
                  opacity: isCurrent ? 1 : 0.65,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            </button>
          );
        })}
      </div>

      <span className="sr-only" aria-live="polite">
        Showing project {active + 1} of {total}: {projects[active]?.name}
      </span>
    </div>
  );
}
