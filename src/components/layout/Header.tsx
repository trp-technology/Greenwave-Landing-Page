"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { contact, navLinks } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const gutter =
  "px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solidHeader = scrolled || open;
  const overHero = !solidHeader;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solidHeader
          ? "border-b border-border bg-white/95 shadow-sm backdrop-blur-md"
          : "border-b border-white/10 bg-[#081611]/70 backdrop-blur-md",
      )}
    >
      <div
        className={cn(
          "flex w-full items-center justify-between gap-6 py-4 lg:py-5",
          gutter,
        )}
      >
        <Logo light={overHero} />

        <nav
          className="hidden items-center gap-8 xl:gap-9 lg:flex"
          aria-label="Main"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[13px] font-medium tracking-[0.04em] transition-colors duration-200",
                overHero
                  ? "text-white/90 hover:text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]"
                  : "text-muted hover:text-brand",
              )}
            >
              {link.label}
            </Link>
          ))}

          <Button
            href={`mailto:${contact.email}`}
            variant={overHero ? "ghost" : "primary"}
            showArrow={false}
            className={cn(
              "px-5 py-2.5 text-[13px]",
              overHero &&
                "border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/15",
            )}
          >
            Discuss a Project
          </Button>
        </nav>

        <button
          type="button"
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-md border lg:hidden",
            overHero
              ? "border-white/30 bg-white/10 text-white"
              : "border-border text-foreground",
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div
          className={cn(
            "border-t border-border bg-white lg:hidden",
            gutter,
            "pb-6 pt-2",
          )}
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-surface"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 px-3">
              <Button
                href={`mailto:${contact.email}`}
                variant="primary"
                showArrow={false}
                className="w-full"
              >
                Discuss a Project
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
