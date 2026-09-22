"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import type { Certificate } from "@/content/certificates";
import { cn } from "@/lib/utils";

type CertificateGalleryProps = {
  certificates: Certificate[];
};

const categoryLabels: Record<Certificate["category"], string> = {
  safety: "Safety",
  execution: "Execution",
  recognition: "Recognition",
};

const kindLabels: Record<Certificate["kind"], string> = {
  certificate: "Certificate",
  trophy: "Trophy",
};

function isLandscape(certificate: Certificate) {
  return certificate.width > certificate.height;
}

export function CertificateGallery({ certificates }: CertificateGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrevious = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex(
      (activeIndex - 1 + certificates.length) % certificates.length,
    );
  }, [activeIndex, certificates.length]);

  const showNext = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % certificates.length);
  }, [activeIndex, certificates.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, showNext, showPrevious]);

  const activeCertificate =
    activeIndex !== null ? certificates[activeIndex] : null;

  return (
    <>
      <div className="mt-14 columns-1 gap-x-6 sm:columns-2 lg:columns-3 xl:columns-4">
        {certificates.map((certificate, index) => (
          <button
            key={certificate.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group mb-6 flex w-full break-inside-avoid flex-col overflow-hidden border border-border bg-white text-left shadow-[0_18px_48px_-28px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_28px_64px_-24px_rgba(15,23,42,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <div
              className="relative w-full overflow-hidden bg-[#f3f5f4] p-3 sm:p-4"
              style={{ aspectRatio: `${certificate.width} / ${certificate.height}` }}
            >
              <Image
                src={certificate.image}
                alt={certificate.alt}
                width={certificate.width}
                height={certificate.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-brand/70 via-brand/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
              <span
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100"
                aria-hidden="true"
              >
                <ZoomIn className="h-4 w-4" />
              </span>
            </div>

            <div className="flex flex-1 flex-col space-y-3 p-5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
                  {certificate.issuer}
                </p>
                <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]",
                      certificate.kind === "trophy"
                        ? "bg-brand text-white"
                        : "bg-surface text-muted",
                    )}
                  >
                    {kindLabels[certificate.kind]}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]",
                      certificate.category === "safety" &&
                        "bg-accent-light text-accent",
                      certificate.category === "execution" &&
                        "bg-brand-light text-brand",
                      certificate.category === "recognition" &&
                        "bg-surface text-muted",
                    )}
                  >
                    {categoryLabels[certificate.category]}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold leading-snug text-foreground">
                  {certificate.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {certificate.project}
                </p>
              </div>
              <p className="mt-auto text-xs font-semibold text-foreground/70">
                {certificate.year}
              </p>
            </div>
          </button>
        ))}
      </div>

      {activeCertificate ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCertificate.title} — ${activeCertificate.project}`}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
            aria-label="Close certificate viewer"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:inline-flex sm:left-6"
            aria-label="Previous certificate"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:inline-flex sm:right-6"
            aria-label="Next certificate"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className={cn(
                "mx-auto flex w-full items-center justify-center overflow-hidden border border-white/15 bg-[#f3f5f4] p-4 shadow-2xl",
                isLandscape(activeCertificate)
                  ? "max-h-[min(72vh,720px)]"
                  : "max-h-[min(78vh,820px)] max-w-md",
              )}
            >
              <Image
                src={activeCertificate.image}
                alt={activeCertificate.alt}
                width={activeCertificate.width}
                height={activeCertificate.height}
                sizes="(max-width: 1024px) 90vw, 55vw"
                className="h-auto max-h-[min(72vh,720px)] w-auto max-w-full object-contain"
                priority
              />
            </div>

            <div className="text-white">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">
                  {kindLabels[activeCertificate.kind]}
                </span>
                <span className="rounded-full bg-accent/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                  {categoryLabels[activeCertificate.category]}
                </span>
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                {activeCertificate.issuer}
              </p>
              <h3 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
                {activeCertificate.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                {activeCertificate.project}
              </p>
              <p className="mt-6 text-sm font-semibold text-white/60">
                {activeCertificate.year}
              </p>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-white/55">
                {activeCertificate.alt}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
