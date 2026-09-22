import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "ghost";
  className?: string;
  external?: boolean;
  showArrow?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external = false,
  showArrow = true,
}: ButtonProps) {
  const styles = {
    primary:
      "bg-brand text-white hover:bg-brand-dark border border-transparent",
    secondary:
      "bg-white text-foreground border border-border hover:border-brand/40",
    accent:
      "bg-accent text-white hover:bg-accent/90 border border-transparent",
    ghost:
      "bg-transparent text-white border border-white/25 hover:border-white/50",
  };

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors duration-200",
    styles[variant],
    className,
  );

  const arrow = showArrow ? (
    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
  ) : null;

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
        {arrow}
      </a>
    );
  }

  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={classes}>
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {arrow}
    </Link>
  );
}
