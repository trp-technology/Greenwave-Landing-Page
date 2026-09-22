import { contact, differentiators } from "@/content/site";
import { SiteImage } from "@/components/ui/SiteImage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";

export function WhyGreenwave() {
  return (
    <section id="capabilities" className="section-pad border-y border-border bg-white">
      <Container>
        <div className="grid gap-20 xl:grid-cols-[1fr_0.9fr] xl:gap-24">
          <FadeIn>
            <h2 className="display-section max-w-[22ch] font-bold text-foreground">
              The infrastructure behind reliable industrial delivery
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-[1.85] text-muted sm:text-lg">
              In-house engineering, a 1,700+ skilled workforce, pan-India vendor
              networks, and technology-enabled project control — integrated as a
              single execution platform.
            </p>

            <div className="mt-16 divide-y divide-border border-y border-border">
              {differentiators.map((item) => (
                <div key={item.title} className="py-8">
                  <h3 className="text-lg font-bold text-foreground sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.85] text-muted sm:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Button href={`mailto:${contact.email}`} variant="primary">
                Discuss a Project
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-8">
            <div className="overflow-hidden rounded-sm border border-border">
              <SiteImage
                src="/images/capabilities/execution.jpg"
                alt="MEP piping and industrial installation at a large project site"
                width={2400}
                height={1600}
                sizes="(max-width: 1280px) 100vw, 40vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
              <div>
                <p className="text-5xl font-bold tracking-tight text-foreground">
                  7 <span className="text-accent">Days</span>
                </p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-muted">
                  Site mobilisation capability across India
                </p>
              </div>
              <div>
                <p className="text-5xl font-bold tracking-tight text-foreground">
                  2,000<span className="text-accent">+</span>
                </p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-muted">
                  Vendors across India for industrial procurement
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
