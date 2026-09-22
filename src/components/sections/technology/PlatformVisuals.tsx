import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  AttendanceMockup,
  DprMockup,
} from "@/components/sections/technology/TechMockups";

type VisualProps = {
  className?: string;
};

export function AppPlatformVisual({ className }: VisualProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[380px] sm:max-w-[420px]",
        className,
      )}
    >
      <div className="relative space-y-8">
        <div className="relative z-20">
          <AttendanceMockup />
        </div>
        <div className="relative z-10 -mt-4 px-3 sm:-mt-6 sm:px-6">
          <DprMockup className="shadow-[0_40px_100px_-40px_rgba(0,0,0,0.65)]" />
        </div>
      </div>
    </div>
  );
}

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
    className: "right-0 top-[16%] z-20 w-[80%]",
    depth: "shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)]",
  },
  {
    src: "/images/technology/erp-dpr.jpg",
    alt: "Greenwave material tracking and daily progress reporting",
    className: "left-[2%] top-[44%] z-10 w-[86%]",
    depth: "shadow-[0_36px_80px_-40px_rgba(0,0,0,0.55)]",
  },
];

export function WebPlatformVisual({ className }: VisualProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[460px] lg:max-w-none",
        className,
      )}
    >
      <div className="relative min-h-[300px] sm:min-h-[380px] lg:min-h-[420px]">
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
              sizes="(max-width: 1024px) 85vw, 40vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
