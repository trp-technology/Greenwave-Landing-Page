"use client";

import { useReducedMotion } from "framer-motion";
import type { ClientLogo } from "@/content/client-logos";
import { SiteImage } from "@/components/ui/SiteImage";
import { cn } from "@/lib/utils";

type ClientLogoMarqueeProps = {
  rows: readonly (readonly ClientLogo[])[];
};

function LogoTile({ logo }: { logo: ClientLogo }) {
  return (
    <div
      className="mx-2 flex h-[4.5rem] w-[8.5rem] shrink-0 items-center justify-center rounded-md border border-border/70 bg-white px-4 py-3 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.28)] sm:mx-2.5 sm:h-[5rem] sm:w-[9.5rem]"
      title={logo.name}
    >
      <div className="relative h-full w-full">
        <SiteImage
          src={logo.src}
          alt={logo.name}
          fill
          sizes="152px"
          className="object-contain object-center"
        />
      </div>
    </div>
  );
}

function MarqueeRow({
  logos,
  reverse = false,
  staticGrid = false,
}: {
  logos: readonly ClientLogo[];
  reverse?: boolean;
  staticGrid?: boolean;
}) {
  const track = staticGrid ? logos : [...logos, ...logos];

  return (
    <div className={cn("py-2", staticGrid ? "overflow-visible" : "logo-marquee-row overflow-hidden")}>
      <div
        className={cn(
          "flex items-center",
          staticGrid
            ? "flex-wrap justify-center gap-2 sm:gap-2.5"
            : cn("logo-marquee-track w-max", reverse && "logo-marquee-track-reverse"),
        )}
      >
        {track.map((logo, index) => (
          <LogoTile key={`${logo.src}-${index}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

export function ClientLogoMarquee({ rows }: ClientLogoMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const staticGrid = reduceMotion === true;

  return (
    <div
      className={cn("logo-marquee-shell", staticGrid ? "grid gap-3" : "space-y-3 sm:space-y-4")}
      aria-label="Client and partner logos"
    >
      {rows.map((row, index) => (
        <MarqueeRow
          key={index}
          logos={row}
          reverse={index % 2 === 1}
          staticGrid={staticGrid}
        />
      ))}
    </div>
  );
}
