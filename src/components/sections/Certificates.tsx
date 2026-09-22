import { certificates, certificatesIntro } from "@/content/certificates";
import { CertificateGallery } from "@/components/sections/CertificateGallery";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";

const awardHighlights = [
  { value: "13+", label: "Awards & certificates" },
  { value: "3", label: "Issuing organisations" },
  { value: "2019–26", label: "Recognition span" },
];

export function Certificates() {
  return (
    <section id="awards" className="section-pad bg-surface">
      <Container>
        <FadeIn>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-accent">
              Awards & Recognition
            </p>
            <h2 className="display-section mt-4 font-bold text-brand">
              Certificates of award from industry-leading partners
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.8] text-muted sm:text-lg">
              {certificatesIntro}
            </p>
            <div className="engineering-rule mt-8 w-24" />
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <dl className="mt-14 grid grid-cols-3 gap-6 border-y border-border py-10 sm:gap-10">
            {awardHighlights.map((item, index) => (
              <div
                key={item.label}
                className={
                  index > 0 ? "border-l border-border pl-6 sm:pl-10" : ""
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
          <CertificateGallery certificates={certificates} />
        </FadeIn>
      </Container>
    </section>
  );
}
