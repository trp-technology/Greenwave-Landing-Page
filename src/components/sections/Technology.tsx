import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { TechFeatureCarousel } from "@/components/sections/technology/TechFeatureCarousel";
import { technologySection } from "@/content/technology-platform";

export function Technology() {
  return (
    <section
      id="technology"
      className="section-pad grid-pattern overflow-hidden bg-surface"
    >
      <Container>
        <FadeIn>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-accent">Technology</p>
            <h2 className="display-section mt-3 font-bold text-brand">
              {technologySection.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.85] text-muted sm:text-lg">
              {technologySection.description}
            </p>
          </div>
        </FadeIn>
      </Container>

      <FadeIn className="mt-10">
        <TechFeatureCarousel />
      </FadeIn>
    </section>
  );
}
