import { stats } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";

export function TrustMetrics() {
  return (
    <section
      id="about"
      className="border-b border-border bg-white py-20 dot-pattern lg:py-28"
    >
      <Container>
        <FadeIn>
          <h2 className="text-center text-3xl font-bold tracking-tight text-brand sm:text-4xl">
            Execution at scale
          </h2>
          <div className="engineering-rule mx-auto mt-6 w-20" />

          <dl className="mt-16 grid grid-cols-2 gap-y-14 sm:grid-cols-4 sm:gap-y-0">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={
                  index > 0 ? "sm:border-l sm:border-border sm:pl-10 lg:pl-16" : ""
                }
              >
                <dt className="stat-display font-bold text-brand">
                  {stat.value}
                </dt>
                <dd className="mt-4 max-w-[12rem] text-sm font-medium leading-relaxed text-muted sm:text-base">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </Container>
    </section>
  );
}
