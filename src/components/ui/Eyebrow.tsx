import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "bar" | "pill" | "pill-dark";
};

export function Eyebrow({
  children,
  className,
  variant = "bar",
}: EyebrowProps) {
  if (variant === "pill") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
          className,
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        {children}
      </div>
    );
  }

  if (variant === "pill-dark") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80",
          className,
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        {children}
      </div>
    );
  }

  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent",
        className,
      )}
    >
      <span className="h-4 w-0.5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </p>
  );
}
