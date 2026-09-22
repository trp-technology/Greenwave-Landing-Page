import Link from "next/link";
import { contact, siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { FadeIn } from "@/components/motion/FadeIn";

const highlights = [
  "In-house engineering",
  "7-day mobilisation",
  "8-state presence",
];

export function CTA() {
  const currentYear = new Date().getFullYear();

  return (
    <section id="contact" className="relative overflow-hidden bg-brand">
      <div
        className="pointer-events-none absolute inset-0 dot-pattern opacity-[0.08]"
        aria-hidden="true"
      />
      <Container className="section-pad relative">
        <FadeIn>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="display-section font-bold text-white">
              Partner with Greenwave for turnkey industrial MEP execution
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-[1.85] text-white/80 sm:text-lg">
              From design and BIM through site mobilisation and handover —
              across India.
            </p>
            <div className="mt-12">
              <Button
                href={`mailto:${contact.email}`}
                variant="accent"
                showArrow={false}
                className="px-10 py-4 text-base"
              >
                Discuss a Project
              </Button>
            </div>

            <p className="mt-10 text-sm font-medium text-white/70">
              {highlights.join("  ·  ")}
            </p>
          </div>
        </FadeIn>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Logo light />
            <div className="text-sm text-white/70">
              <p className="font-semibold text-white">{siteConfig.name}</p>
              <p>{contact.address}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
            <Link href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>

          <p className="text-xs text-white/45">
            © {currentYear} Greenwave. All rights reserved.
          </p>
        </Container>
      </div>
    </section>
  );
}
