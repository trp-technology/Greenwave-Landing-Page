import Link from "next/link";
import { contact, navLinks, services, siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white py-16 lg:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] xl:gap-16">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Industrial MEP and engineering execution across India — HVAC,
              fire fighting, electrical, utility piping, and turnkey
              mechanical packages.
            </p>
            <div className="mt-6">
              <Button href={`mailto:${contact.email}`} variant="primary">
                Discuss a Project
              </Button>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Services
            </p>
            <ul className="mt-4 space-y-2.5">
              {services.slice(0, 6).map((service) => (
                <li key={service.title} className="text-sm text-muted">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Get in Touch
            </p>
            <ul className="mt-4 space-y-4">
              <li className="flex gap-3 text-sm text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  {contact.address}
                  <span className="mt-1 block text-xs text-muted/70">
                    {contact.addressNote}
                  </span>
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  {contact.email}
                  <span className="mt-1 block text-xs text-muted/70">
                    {contact.emailNote}
                  </span>
                </span>
              </li>
              <li className="flex gap-3 text-sm text-muted">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  {contact.phone}
                  <span className="mt-1 block text-xs text-muted/70">
                    {contact.phoneNote}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            Established {siteConfig.established} · Registered across{" "}
            {siteConfig.statesRegistered} states
          </p>
        </div>
      </Container>
    </footer>
  );
}
