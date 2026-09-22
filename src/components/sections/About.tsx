import { siteConfig, stats, timeline } from "@/content/site";
import { SiteImage } from "@/components/ui/SiteImage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";

export function About() {
  return (
    <section id="about" className="section-pad bg-white">
      <Container>
        <FadeIn>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-24">
            <div>
              <h2 className="display-section max-w-[22ch] font-bold text-foreground">
                An established engineering organisation built for industrial
                execution
              </h2>
            </div>
            <p className="text-base leading-[1.85] text-muted sm:text-lg">
              Established in Gurgaon in {siteConfig.established}, {siteConfig.name}{" "}
              has grown into a pan-India industrial MEP contractor — delivering
              detailed engineering and installation for manufacturing clients, EPC
              partners, and large-scale industrial campuses across{" "}
              {siteConfig.statesRegistered} states.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.06} className="mt-16">
          <div className="engineering-rule w-24" />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { label: "Established", value: String(siteConfig.established) },
              { label: "Skilled workforce", value: stats[0].value },
              { label: "States across India", value: stats[2].value },
            ].map((item) => (
              <div key={item.label} className="border-t border-border pt-6">
                <p className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                  {item.value}
                </p>
                <p className="mt-3 text-sm font-medium text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="mt-24 grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
          <FadeIn>
            <div className="overflow-hidden rounded-sm border border-border">
              <SiteImage
                src="/images/about/team.jpg"
                alt="Engineers and technicians at a large-scale industrial project site"
                width={2400}
                height={1602}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[3/2] w-full object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h3 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
              Building capability over time
            </h3>

            <ol className="mt-12 divide-y divide-border border-t border-border">
              {timeline.map((item) => (
                <li
                  key={item.year}
                  className="grid grid-cols-[5.5rem_1fr] gap-6 py-8"
                >
                  <span className="text-3xl font-bold tracking-tight text-accent lg:text-4xl">
                    {item.year}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-foreground sm:text-lg">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 bg-brand-light px-8 py-7">
              <p className="text-base font-semibold leading-[1.8] text-brand sm:text-lg">
                To establish Greenwave as the most trusted contracting company
                by ensuring timely completion of projects with utmost safety and
                the best quality.
              </p>
            </div>

            <div className="mt-10">
              <Button href="#capabilities" variant="primary">
                Our Capabilities
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
