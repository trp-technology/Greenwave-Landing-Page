import Image from "next/image";
import { cn } from "@/lib/utils";

type SiteImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  fill?: boolean;
  objectPosition?: string;
};

export function SiteImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  priority = false,
  loading,
  fill = false,
  objectPosition,
}: SiteImageProps) {
  const style = objectPosition ? { objectPosition } : undefined;

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : loading ?? "lazy"}
        className={cn("object-cover", className)}
        style={style}
      />
    );
  }

  if (!width || !height) {
    throw new Error("SiteImage requires width and height when fill is false");
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : loading ?? "lazy"}
      className={className}
      style={style}
    />
  );
}
