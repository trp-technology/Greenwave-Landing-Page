"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { AppSpotlight } from "@/content/technology-spotlights";
import type { PlatformFeature } from "@/content/technology-platform";

type AppSpotlightProps = {
  spotlights: AppSpotlight[];
  features: PlatformFeature[];
  activeSpotlightId: string;
  onSpotlightChange: (id: string) => void;
};

export function AppSpotlightPanel({
  spotlights,
  features,
  activeSpotlightId,
  onSpotlightChange,
}: AppSpotlightProps) {
  const reduceMotion = useReducedMotion();
  const active =
    spotlights.find((s) => s.id === activeSpotlightId) ?? spotlights[0];
  const activeFeatures = features.filter((f) =>
    (active.featureTitles ?? []).includes(f.title),
  );

  return (
    <div className="space-y-8">
      <div
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="App capability areas"
      >
        {spotlights.map((spotlight) => {
          const isActive = spotlight.id === activeSpotlightId;

          return (
            <button
              key={spotlight.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSpotlightChange(spotlight.id)}
              className={cn(
                "shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200",
                isActive
                  ? "bg-white text-brand shadow-[0_8px_30px_-10px_rgba(0,0,0,0.4)]"
                  : "border border-white/15 bg-white/[0.06] text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              {spotlight.label}
            </button>
          );
        })}
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-16">
        <div className="lg:sticky lg:top-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                {active.headline}
              </h3>
              <ul className="mt-8 space-y-5">
                {activeFeatures.map((feature, index) => (
                  <li key={feature.title} className="flex gap-4">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-teal-300">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-white">{feature.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/65">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative">
          <div
            className="absolute -inset-3 rounded-[1.75rem] bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.12),transparent_70%)]"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_48px_120px_-40px_rgba(0,0,0,0.65)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={active.image}
                  alt={active.imageAlt}
                  width={1600}
                  height={900}
                  className="h-auto w-full"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority={active.id === "workforce"}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
