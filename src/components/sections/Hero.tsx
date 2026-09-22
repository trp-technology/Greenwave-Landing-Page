import { contact, stats } from "@/content/site";
import { SiteImage } from "@/components/ui/SiteImage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";

export function Hero() {
  return (
    <section className="relative min-h-[min(100svh,920px)] overflow-hidden bg-[#081611]">
      <div className="absolute -inset-px">
        <SiteImage
          src="/images/hero/hero.png"
          alt="Industrial worker at a large-scale refinery facility at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] scale-[1.03]"
        />
        <div className="hero-overlay-base absolute inset-0" aria-hidden="true" />
        <div className="hero-overlay-bottom absolute inset-0" aria-hidden="true" />
        <div className="hero-overlay-top absolute inset-0" aria-hidden="true" />
      </div>

      <Container className="relative flex min-h-[min(100svh,920px)] flex-col justify-center pb-28 pt-32 sm:pb-32 sm:pt-36 lg:pb-36 lg:pt-40">
        <div className="max-w-2xl">
          <FadeIn>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              <span
                className="h-px w-8 bg-accent"
                aria-hidden="true"
              />
              Industrial MEP & Engineering Execution
            </p>
            <h1 className="display-hero mt-7 font-bold text-white">
              Engineering execution
              <span className="mt-1 block text-white/95">
                at{" "}
                <span className="bg-gradient-to-r from-teal-200 to-accent bg-clip-text text-transparent">
                  industrial scale
                </span>
              </span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-[1.8] text-white/75 sm:text-lg">
              Delivering complex mechanical, electrical, and plumbing solutions
              for heavy industry.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                href={`mailto:${contact.email}`}
                variant="accent"
                showArrow={false}
                className="rounded-lg px-8 py-3.5 shadow-[0_8px_32px_-8px_rgba(13,148,136,0.55)]"
              >
                Discuss a Project
              </Button>
              <Button
                href="#projects"
                variant="ghost"
                showArrow={false}
                className="rounded-lg border-white/30 px-8 py-3.5 hover:bg-white/10"
              >
                Explore Our Projects
              </Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn
          delay={0.12}
          className="pointer-events-none absolute bottom-10 right-4 hidden md:block sm:right-8 lg:bottom-14 lg:right-12 xl:right-16 2xl:right-24"
        >
          <div className="hero-stat-card flex overflow-hidden rounded-sm">
            <div className="w-1 shrink-0 bg-accent" aria-hidden="true" />
            <div className="px-7 py-6">
              <p className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                {stats[0].value.replace("+", "")}
                <span className="text-teal-300">+</span>
              </p>
              <p className="mt-2 text-sm font-medium tracking-wide text-white/65">
                Skilled Workforce
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
