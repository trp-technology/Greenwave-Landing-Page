import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  compact?: boolean;
  light?: boolean;
};

export function Logo({ className, compact = false, light = false }: LogoProps) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
        <Image
          src="/images/logo.jpg"
          alt="Greenwave Engineering logo"
          width={40}
          height={40}
          className="h-10 w-10 rounded-lg object-contain"
          priority
        />
      </span>
      {!compact ? (
        <span
          className={cn(
            "text-[13px] font-bold uppercase leading-none tracking-[0.14em]",
            light ? "text-white" : "text-brand",
          )}
        >
          Greenwave
          <span
            className={cn(
              "font-semibold",
              light ? "text-white/50" : "text-muted",
            )}
          >
            {" "}
            Engineering
          </span>
        </span>
      ) : null}
    </Link>
  );
}
