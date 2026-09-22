"use client";

import {
  Battery,
  Beaker,
  Building2,
  Car,
  Cpu,
  Droplets,
  Factory,
  Flame,
  FlaskConical,
  Gauge,
  Microchip,
  Smartphone,
  Snowflake,
  Wind,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { ProjectBrowseCategory } from "@/lib/projects";
import { cn } from "@/lib/utils";

type ProjectBrowseGridProps = {
  serviceCategories: ProjectBrowseCategory[];
  industryCategories: ProjectBrowseCategory[];
  onSelect: (category: ProjectBrowseCategory) => void;
};

const serviceIcons: Record<string, LucideIcon> = {
  "Air conditioning": Wind,
  Ducting: Wind,
  Insulation: Wind,
  Ventilation: Wind,
  "Chilled water piping": Wind,
  "Fire fighting": Flame,
  "Utility piping": Wrench,
  "PEX piping": Droplets,
  "Steam piping": Gauge,
  Refrigeration: Snowflake,
  Electrical: Zap,
  "Gas piping": Flame,
  "Chemical piping": Wrench,
  "Dust collection": Wrench,
  Plumbing: Droplets,
  "Civil and interioirs": Building2,
  "DG Chimey": Factory,
  "Machine setup & hookup": Wrench,
  "Turnkey AWC lab": FlaskConical,
};

const industryIcons: Record<string, LucideIcon> = {
  "R&D": FlaskConical,
  Automotive: Car,
  "Air conditioning": Cpu,
  "Lithium ion battery (Dry room)": Battery,
  office: Building2,
  "Clean room": Microchip,
  FMCG: Factory,
  Food: Factory,
  Pharmaceutical: Beaker,
  "Mobile phones": Smartphone,
  Other: Factory,
};

function CountBadge({ count }: { count: number }) {
  return (
    <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand">
      {count} {count === 1 ? "project" : "projects"}
    </span>
  );
}

function BrowseCard({
  category,
  onSelect,
}: {
  category: ProjectBrowseCategory;
  onSelect: (category: ProjectBrowseCategory) => void;
}) {
  const Icon =
    category.type === "service"
      ? (serviceIcons[category.title] ?? Wrench)
      : (industryIcons[category.title] ?? Factory);

  return (
    <button
      type="button"
      onClick={() => onSelect(category)}
      className="group flex min-h-[160px] flex-col rounded-md border border-border bg-white p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-brand/25 hover:shadow-[0_12px_40px_-24px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
    >
      <div className="flex items-start justify-between gap-3">
        <Icon
          className={cn("h-7 w-7 text-brand")}
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <CountBadge count={category.count} />
      </div>
      <h4 className="mt-4 text-base font-bold text-brand">{category.title}</h4>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
        Completed projects tagged with {category.title} in the FY25–26 register.
      </p>
    </button>
  );
}

function BrowseSection({
  eyebrow,
  title,
  description,
  categories,
  onSelect,
}: {
  eyebrow: string;
  title: string;
  description: string;
  categories: ProjectBrowseCategory[];
  onSelect: (category: ProjectBrowseCategory) => void;
}) {
  if (categories.length === 0) return null;

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
        {eyebrow}
      </p>
      <h3 className="mt-3 text-2xl font-bold text-brand sm:text-3xl">{title}</h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        {description}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <BrowseCard
            key={`${category.type}-${category.slug}`}
            category={category}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export function ProjectBrowseGrid({
  serviceCategories,
  industryCategories,
  onSelect,
}: ProjectBrowseGridProps) {
  return (
    <div className="mt-20 space-y-16">
      <BrowseSection
        eyebrow="By service"
        title="Completed projects by type of service"
        description="Each card matches a service column from the project register — Air conditioning, Ducting, Fire fighting, Utility piping, and the rest."
        categories={serviceCategories}
        onSelect={onSelect}
      />

      <BrowseSection
        eyebrow="By industry"
        title="Completed projects by industry"
        description="Each card matches an industry column from the register — R&D, Automotive, Lithium ion battery (Dry room), Clean room, and more."
        categories={industryCategories}
        onSelect={onSelect}
      />
    </div>
  );
}
