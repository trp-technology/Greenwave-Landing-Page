"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShieldCheck, X, ZoomIn } from "lucide-react";
import type { IsoCertificate } from "@/content/iso-certificates";

type IsoCertificateGalleryProps = {
  certificates: IsoCertificate[];
};

export function IsoCertificateGallery({
  certificates,
}: IsoCertificateGalleryProps) {
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
      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate, index) => (
          <button
            key={certificate.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group flex h-full flex-col overflow-hidden border border-border bg-white text-left shadow-[0_18px_48px_-28px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_28px_64px_-24px_rgba(15,23,42,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <div
              className="relative w-full overflow-hidden bg-[#f3f5f4] p-4 sm:p-5"
              style={{ aspectRatio: `${certificate.width} / ${certificate.height}` }}
            >
              <Image
                src={certificate.image}
                alt={certificate.alt}
                width={certificate.width}
                height={certificate.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

            <div className="flex flex-1 flex-col space-y-4 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  ISO Certified
                </span>
                <p className="text-right text-[11px] font-semibold text-muted">
                  Valid until {certificate.validUntil}
                </p>
              </div>

              <div>
                <p className="text-xl font-bold tracking-tight text-brand sm:text-2xl">
                  {certificate.standard}
                </p>
                <h3 className="mt-2 text-sm font-bold leading-snug text-foreground sm:text-base">
                  {certificate.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {certificate.scope}
                </p>
              </div>

              <div className="mt-auto border-t border-border pt-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                  {certificate.issuer}
                </p>
                <p className="mt-1 text-xs font-medium text-foreground/70">
                  Cert. {certificate.certificateNumber}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeCertificate ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCertificate.standard} — ${activeCertificate.title}`}
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
            className="grid w-full max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto flex w-full max-w-md items-center justify-center overflow-hidden border border-white/15 bg-[#f3f5f4] p-4 shadow-2xl">
              <Image
                src={activeCertificate.image}
                alt={activeCertificate.alt}
                width={activeCertificate.width}
                height={activeCertificate.height}
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="h-auto max-h-[min(78vh,820px)] w-auto max-w-full object-contain"
                priority
              />
            </div>

            <div className="text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/85">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                ISO Compliant
              </span>
              <p className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {activeCertificate.standard}
              </p>
              <h3 className="mt-3 text-xl font-bold leading-tight text-white/90">
                {activeCertificate.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                {activeCertificate.scope}
              </p>

              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
                    Issued by
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-white/85">
                    {activeCertificate.issuer}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
                    Certificate no.
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-white/85">
                    {activeCertificate.certificateNumber}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
                    Valid until
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-white/85">
                    {activeCertificate.validUntil}
                  </dd>
                </div>
              </dl>

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
