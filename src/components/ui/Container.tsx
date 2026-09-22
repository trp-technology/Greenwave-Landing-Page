import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
  id?: string;
  /** full = edge-to-edge with gutter padding; content = narrow text block */
  size?: "full" | "content";
};

const gutter =
  "px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24";

export function Container({
  children,
  className,
  as: Component = "div",
  id,
  size = "full",
}: ContainerProps) {
  return (
    <Component
      id={id}
      className={cn(
        "mx-auto w-full",
        size === "full" ? gutter : "max-w-3xl px-4 sm:px-6",
        className,
      )}
    >
      {children}
    </Component>
  );
}

/** Breaks out of a centered column to span the full viewport width */
export function FullBleed({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-screen max-w-[100vw] [margin-inline:calc(50%-50vw)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
