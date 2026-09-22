import { clientsIntro, partners } from "@/content/site";
import { clientLogoRows } from "@/content/client-logos";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { ClientLogoMarquee } from "@/components/sections/ClientLogoMarquee";

const partnerColumns = [
  partners.slice(0, 4),
  partners.slice(4, 8),
  partners.slice(8),
];

export function Clients() {
  return (
    <section id="clients" className="section-pad border-y border-border bg-white">
      <Container>
        <FadeIn>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-accent">Clients & Partners</p>
            <h2 className="display-section mt-4 font-bold text-brand">
              Trusted by leading industrial and Japanese EPC organisations
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.8] text-muted sm:text-lg">
              {clientsIntro}
            </p>
            <div className="engineering-rule mt-8 w-24" />
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="relative left-1/2 mt-14 w-screen max-w-[100vw] -translate-x-1/2 sm:mt-16">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-20" />
            <ClientLogoMarquee rows={clientLogoRows} />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-20 border-t border-border pt-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Partner Ecosystem
            </p>
            <div className="mt-8 grid gap-x-12 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {partnerColumns.map((column, columnIndex) => (
                <ul key={columnIndex} className="space-y-3.5">
                  {column.map((partner) => (
                    <li
                      key={partner.name}
                      className="text-sm font-semibold leading-relaxed text-foreground/80 sm:text-[15px]"
                    >
                      {partner.name}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
