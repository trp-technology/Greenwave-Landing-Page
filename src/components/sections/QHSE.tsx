import { qhsePoints } from "@/content/site";
import { SiteImage } from "@/components/ui/SiteImage";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";

export function QHSE() {
  return (
    <section id="qhse" className="section-pad bg-surface">
      <Container>
        <FadeIn>
          <h2 className="display-section max-w-[24ch] font-bold text-foreground">
            Safety, quality, and execution discipline as operating principles
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-[1.85] text-muted sm:text-lg">
            QHSE is embedded in how Greenwave executes — from workforce training
            and site safety leadership to statutory compliance and recognised
            execution excellence.
          </p>
        </FadeIn>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_420px] xl:gap-20">
          <FadeIn className="divide-y divide-border border-y border-border bg-white">
            {qhsePoints.map((point) => (
              <article key={point.title} className="px-8 py-9 lg:px-10 lg:py-10">
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                  {point.title}
                </h3>
                <p className="mt-4 text-base leading-[1.85] text-muted">
                  {point.description}
                </p>
              </article>
            ))}
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="overflow-hidden border border-border bg-white">
              <div className="relative aspect-[4/3] w-full">
                <SiteImage
                  src="/images/qhse/awards.jpg"
                  alt="Greenwave Engineering QHSE awards and recognition"
                  fill
                  sizes="420px"
                />
              </div>
              <div className="p-8 lg:p-10">
                <h3 className="text-2xl font-bold leading-snug text-foreground sm:text-3xl">
                  Best MEP Contractor Pan-India
                </h3>
                <p className="mt-4 text-sm leading-[1.85] text-muted sm:text-base">
                  Awarded by Takenaka — recognising Greenwave&apos;s commitment
                  to quality, safety, and execution excellence across industrial
                  projects nationwide.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
