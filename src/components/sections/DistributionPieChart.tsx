"use client";

import { useMemo, useState } from "react";
import type { DistributionSegment } from "@/content/industry-distribution";
import { cn } from "@/lib/utils";

type DistributionPieChartProps = {
  title: string;
  segments: DistributionSegment[];
  period: string;
};

const SIZE = 240;
const CX = SIZE / 2;
const CY = SIZE / 2;
const OUTER_RADIUS = 100;
const INNER_RADIUS = 62;

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}

function describeDonutArc(
  startAngle: number,
  endAngle: number,
  innerRadius: number,
  outerRadius: number,
) {
  const startOuter = polarToCartesian(CX, CY, outerRadius, startAngle);
  const endOuter = polarToCartesian(CX, CY, outerRadius, endAngle);
  const startInner = polarToCartesian(CX, CY, innerRadius, endAngle);
  const endInner = polarToCartesian(CX, CY, innerRadius, startAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
    `L ${startInner.x} ${startInner.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${endInner.x} ${endInner.y}`,
    "Z",
  ].join(" ");
}

function formatPercentage(value: number) {
  return Number.isInteger(value) ? `${value}%` : `${value.toFixed(1)}%`;
}

export function DistributionPieChart({
  title,
  segments,
  period,
}: DistributionPieChartProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const isDense = segments.length > 8;

  const arcs = useMemo(() => {
    let cursor = 0;

    return segments.map((segment) => {
      const startAngle = cursor * 3.6;
      cursor += segment.percentage;
      const endAngle = cursor * 3.6;

      return {
        ...segment,
        startAngle,
        endAngle,
        path: describeDonutArc(startAngle, endAngle, INNER_RADIUS, OUTER_RADIUS),
      };
    });
  }, [segments]);

  const activeSegment =
    arcs.find((segment) => segment.id === activeId) ?? null;

  const clearActive = () => setActiveId(null);
  const setActive = (id: string) => setActiveId(id);

  return (
    <div>
      <h3 className="text-lg font-bold text-foreground sm:text-xl">{title}</h3>

      <div className="mt-6 flex justify-center">
        <div className="relative w-full max-w-[240px]">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="h-auto w-full"
            role="img"
            aria-label={`${title} pie chart`}
          >
            {arcs.map((segment) => {
              const isActive = activeId === segment.id;
              const isDimmed = activeId !== null && !isActive;

              return (
                <path
                  key={segment.id}
                  d={segment.path}
                  fill={segment.color}
                  className={cn(
                    "cursor-pointer transition-all duration-200",
                    isDimmed && "opacity-35",
                    isActive && "opacity-100",
                  )}
                  style={{
                    transform: isActive ? "scale(1.03)" : "scale(1)",
                    transformOrigin: `${CX}px ${CY}px`,
                  }}
                  onMouseEnter={() => setActive(segment.id)}
                  onMouseLeave={clearActive}
                  onFocus={() => setActive(segment.id)}
                  onBlur={clearActive}
                  onClick={() =>
                    setActiveId((current) =>
                      current === segment.id ? null : segment.id,
                    )
                  }
                  tabIndex={0}
                  aria-label={`${segment.label}: ${formatPercentage(segment.percentage)}`}
                />
              );
            })}
          </svg>

          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="flex h-[124px] w-[124px] flex-col items-center justify-center rounded-full bg-white px-3 text-center shadow-[inset_0_0_0_1px_rgba(226,232,240,0.9)]">
              {activeSegment ? (
                <>
                  <p
                    className="text-xl font-bold tracking-tight sm:text-2xl"
                    style={{ color: activeSegment.color }}
                  >
                    {formatPercentage(activeSegment.percentage)}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[10px] font-semibold leading-snug text-foreground sm:text-xs">
                    {activeSegment.label}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                    {period}
                  </p>
                  <p className="mt-1 text-sm font-bold text-brand">Share</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <ul
        className={cn(
          "mt-6 grid gap-1.5",
          isDense ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1",
        )}
      >
        {arcs.map((segment) => {
          const isActive = activeId === segment.id;

          return (
            <li key={segment.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(segment.id)}
                onMouseLeave={clearActive}
                onFocus={() => setActive(segment.id)}
                onBlur={clearActive}
                onClick={() =>
                  setActiveId((current) =>
                    current === segment.id ? null : segment.id,
                  )
                }
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg border text-left transition-all duration-200",
                  isDense ? "px-2 py-1.5" : "gap-3 px-3 py-2.5",
                  isActive
                    ? "border-accent/30 bg-accent-light/60 shadow-sm"
                    : "border-transparent bg-transparent hover:border-border hover:bg-surface",
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 shrink-0 rounded-full transition-transform duration-200 sm:h-2.5 sm:w-2.5",
                    isActive && "scale-125",
                  )}
                  style={{ backgroundColor: segment.color }}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "min-w-0 flex-1 font-medium leading-snug text-foreground",
                    isDense ? "text-xs" : "text-sm",
                  )}
                >
                  {segment.label}
                </span>
                <span
                  className={cn(
                    "shrink-0 font-bold tabular-nums transition-colors duration-200",
                    isDense ? "text-xs" : "text-sm",
                    isActive ? "text-brand" : "text-muted",
                  )}
                >
                  {formatPercentage(segment.percentage)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
