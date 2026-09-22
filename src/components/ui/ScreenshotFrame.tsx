import Image from "next/image";
import { cn } from "@/lib/utils";

type ScreenshotFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function ScreenshotFrame({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
  priority = false,
}: ScreenshotFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-sm border border-border bg-white p-2",
        className,
      )}
    >
      <div className="overflow-hidden rounded-sm border border-border/80 bg-white">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 1024px) 100vw, 45vw"
          className={cn("h-auto w-full bg-white", imageClassName)}
        />
      </div>
    </div>
  );
}
