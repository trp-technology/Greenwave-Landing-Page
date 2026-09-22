import {
  industrySegments,
  portfolioDistributionIntro,
  portfolioDistributionPeriod,
  serviceSegments,
} from "@/content/industry-distribution";
import { DistributionPieChart } from "@/components/sections/DistributionPieChart";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";

export function IndustryDistribution() {
  return (
    <section id="portfolio-distribution" className="section-pad bg-surface">
      <Container>
        <FadeIn>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-accent">Portfolio Mix</p>
            <h2 className="display-section mt-4 font-bold text-brand">
              Revenue distribution {portfolioDistributionPeriod}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.8] text-muted sm:text-lg">
              {portfolioDistributionIntro}
            </p>
            <div className="engineering-rule mt-8 w-24" />
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_24px_64px_-32px_rgba(15,23,42,0.18)] sm:p-8">
              <DistributionPieChart
                title="Breakdown by Services"
                segments={serviceSegments}
                period={portfolioDistributionPeriod}
              />
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_24px_64px_-32px_rgba(15,23,42,0.18)] sm:p-8">
              <DistributionPieChart
                title="Breakdown by Industry"
                segments={industrySegments}
                period={portfolioDistributionPeriod}
              />
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
