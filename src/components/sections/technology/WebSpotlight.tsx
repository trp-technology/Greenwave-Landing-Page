"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PlatformFeature } from "@/content/technology-platform";

const webScreens = [
  {
    src: "/images/technology/erp-dashboard.jpg",
    alt: "Greenwave web dashboard showing project pipeline and procurement status",
    className: "left-0 top-0 z-30 w-[94%]",
    depth: "shadow-[0_48px_100px_-36px_rgba(0,0,0,0.7)]",
  },
  {
    src: "/images/technology/erp-projects.jpg",
    alt: "Greenwave project workspace with team and execution tracking",
    className: "right-0 top-[14%] z-20 w-[82%]",
    depth: "shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)]",
  },
  {
    src: "/images/technology/erp-dpr.jpg",
    alt: "Greenwave material tracking and daily progress reporting",
    className: "left-[2%] top-[42%] z-10 w-[88%]",
    depth: "shadow-[0_36px_80px_-40px_rgba(0,0,0,0.55)]",
  },
];

type WebSpotlightProps = {
  features: PlatformFeature[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function WebSpotlightPanel({
  features,
  activeIndex,
  onSelect,
}: WebSpotlightProps) {
  const reduceMotion = useReducedMotion();
  const active = features[activeIndex];

  return (
    <div className="grid items-start gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:gap-14">
      <div className="relative order-2 xl:order-1">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-teal-300/90">
          Project control from procurement to close-out
        </p>
        <div
          className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_60%_20%,rgba(26,71,49,0.5),transparent_65%)]"
          aria-hidden="true"
        />
        <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[460px]">
          {webScreens.map((screen) => (
            <div
              key={screen.src}
              className={cn(
                "absolute overflow-hidden rounded-xl border border-white/15 bg-white p-2",
                screen.depth,
                screen.className,
              )}
            >
              <Image
                src={screen.src}
                alt={screen.alt}
                width={1200}
                height={720}
                className="h-auto w-full rounded-lg"
                sizes="(max-width: 1024px) 90vw, 42vw"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="order-1 xl:order-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.title}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 border-b border-white/10 pb-8"
          >
            <span className="text-sm font-bold tabular-nums text-teal-300">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              {active.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white/70">
              {active.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="max-h-[min(60vh,520px)] overflow-y-auto pr-2 [scrollbar-color:rgba(13,148,136,0.5)_transparent] [scrollbar-width:thin]">
          <ol className="space-y-1">
            {features.map((feature, index) => {
              const isActive = index === activeIndex;

              return (
                <li key={feature.title}>
                  <button
                    type="button"
                    onMouseEnter={() => onSelect(index)}
                    onFocus={() => onSelect(index)}
                    onClick={() => onSelect(index)}
                    className={cn(
                      "w-full rounded-xl px-4 py-3.5 text-left transition-colors duration-200",
                      isActive
                        ? "bg-white/10"
                        : "hover:bg-white/[0.05]",
                    )}
                  >
                    <span
                      className={cn(
                        "text-sm font-bold",
                        isActive ? "text-teal-300" : "text-white/45",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "ml-3 text-sm font-semibold",
                        isActive ? "text-white" : "text-white/75",
                      )}
                    >
                      {feature.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
