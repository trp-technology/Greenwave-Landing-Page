import {
  isoCertificates,
  isoCertificatesIntro,
} from "@/content/iso-certificates";
import { IsoCertificateGallery } from "@/components/sections/IsoCertificateGallery";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";

const isoHighlights = [
  { value: "3", label: "ISO certifications" },
  { value: "9001 · 14001 · 45001", label: "Management standards" },
  { value: "2029", label: "Valid through" },
];

export function IsoCertificates() {
  return (
    <section id="iso" className="section-pad border-y border-border bg-white">
      <Container>
        <FadeIn>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-accent">
              ISO Compliance
            </p>
            <h2 className="display-section mt-4 font-bold text-brand">
              Internationally certified management systems
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.8] text-muted sm:text-lg">
              {isoCertificatesIntro}
            </p>
            <div className="engineering-rule mt-8 w-24" />
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <dl className="mt-14 grid grid-cols-1 gap-6 border-y border-border py-10 sm:grid-cols-3 sm:gap-10">
            {isoHighlights.map((item, index) => (
              <div
                key={item.label}
                className={
                  index > 0 ? "sm:border-l sm:border-border sm:pl-10" : ""
                }
              >
                <dt className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">
                  {item.value}
                </dt>
                <dd className="mt-2 text-xs font-medium leading-relaxed text-muted sm:text-sm">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        <FadeIn delay={0.1}>
          <IsoCertificateGallery certificates={isoCertificates} />
        </FadeIn>
      </Container>
    </section>
  );
}
