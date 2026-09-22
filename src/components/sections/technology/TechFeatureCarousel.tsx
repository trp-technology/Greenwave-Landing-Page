"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { techSpotlights } from "@/content/technology-spotlights";
import { FullBleed } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const slides = techSpotlights;
const AUTOPLAY_MS = 4000;

const slideTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 32,
  mass: 0.85,
};

export function TechFeatureCarousel() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<number | null>(null);

  const total = slides.length;
  const slide = slides[active];

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
    if (reduceMotion || total <= 1) return;

    timerRef.current = window.setInterval(showNext, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [reduceMotion, showNext, total]);

  const motionProps = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      }
    : {
        initial: { opacity: 0, x: direction * 60 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: direction * -60 },
        transition: slideTransition,
      };

  if (!slide) return null;

  return (
    <FullBleed>
      <div
        className="group relative w-full"
        aria-roledescription="carousel"
        aria-label="Greenwave platform capabilities"
      >
        <div className="relative aspect-[1536/804] w-full overflow-hidden bg-white">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              {...motionProps}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                className="object-cover object-center"
                sizes="100vw"
                priority={active === 0}
              />
            </motion.div>
          </AnimatePresence>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent"
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={showPrevious}
            className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/25 bg-black/25 p-3 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-black/40 group-hover:opacity-100 sm:left-6 sm:flex"
            aria-label="Previous slide"
          >
            <ArrowLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={showNext}
            className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/25 bg-black/25 p-3 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-black/40 group-hover:opacity-100 sm:right-6 sm:flex"
            aria-label="Next slide"
          >
            <ArrowRight className="size-5" />
          </button>

          <div className="absolute inset-x-0 bottom-5 z-10 flex items-center justify-center gap-2">
            {slides.map((item, index) => {
              const isCurrent = index === active;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(index)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    isCurrent
                      ? "size-2.5 bg-white shadow-sm"
                      : "size-2 bg-white/45 hover:bg-white/70",
                  )}
                  aria-label={`Go to ${item.label}`}
                  aria-current={isCurrent ? "true" : undefined}
                />
              );
            })}
          </div>
        </div>

        <span className="sr-only" aria-live="polite">
          Showing slide {active + 1} of {total}: {slide.label}
        </span>
      </div>
    </FullBleed>
  );
}
