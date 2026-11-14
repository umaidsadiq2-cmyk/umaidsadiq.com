"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reviewsUrl, testimonials, type Testimonial } from "@/content/trust";
import { cn } from "@/lib/utils";

/** How long each review stays up before the next one, in ms. */
const DWELL = 8000;

function initials(name: string) {
  return name
    .replace(/&/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

/** The quote with its highlight line picked out in the accent colour. */
function Quote({ t }: { t: Testimonial }) {
  const i = t.quote.indexOf(t.highlight);
  if (i < 0) return <>{t.quote}</>;
  return (
    <>
      {t.quote.slice(0, i)}
      <mark className="bg-transparent text-[#6ee7b7] [background-image:linear-gradient(transparent_62%,rgba(110,231,183,0.18)_62%)]">
        {t.highlight}
      </mark>
      {t.quote.slice(i + t.highlight.length)}
    </>
  );
}

/**
 * Client reviews as a dark "stage": one recommendation at a time, large,
 * with the line that matters most highlighted, and a row of client chips
 * that doubles as navigation and progress indicator.
 *
 * Every quote stays in the DOM (stacked in one grid cell, the inactive ones
 * hidden and inert), so all five are server rendered and readable by search
 * engines. It advances on its own every DWELL ms, pauses while the pointer
 * or keyboard focus is inside, and never auto-advances under reduced motion.
 */
export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [cycle, setCycle] = useState(0); // restarts the progress bar
  const total = testimonials.length;
  const regionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const go = useCallback(
    (i: number) => {
      setActive(((i % total) + total) % total);
      setCycle((c) => c + 1);
    },
    [total],
  );

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setTimeout(() => go(active + 1), DWELL);
    return () => window.clearTimeout(id);
  }, [active, paused, reduced, go, cycle]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(active + 1);
    if (e.key === "ArrowLeft") go(active - 1);
  };

  return (
    <section
      ref={regionRef}
      id="reviews"
      aria-roledescription="carousel"
      aria-labelledby="reviews-heading"
      className="relative isolate scroll-mt-24 overflow-hidden bg-ink text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!regionRef.current?.contains(e.relatedTarget as Node)) setPaused(false);
      }}
      onKeyDown={onKey}
    >
      {/* Soft emerald glow and an oversized quote mark as the backdrop. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(11,110,79,0.55),rgba(11,110,79,0)_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-6 top-6 -z-10 select-none font-display text-[22rem] font-semibold leading-none text-white/[0.035] md:text-[30rem]"
      >
        &ldquo;
      </div>

      <div className="shell shell-wide py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
              Client reviews
            </p>
            <h2
              id="reviews-heading"
              className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.025em]"
            >
              Don&apos;t take my word.
              <br />
              <span className="text-[#6ee7b7]">Take theirs.</span>
            </h2>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-[#6ee7b7] hover:text-[#6ee7b7]"
            >
              Verify on Facebook
              <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </a>
          </div>
        </div>

        {/* Stage: every review shares one grid cell; only the active one shows. */}
        <div className="mt-14 grid md:mt-20">
          {testimonials.map((t, i) => {
            const on = i === active;
            return (
              <figure
                key={t.author}
                aria-hidden={!on}
                inert={!on}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${total}: ${t.author}`}
                className={cn(
                  "[grid-area:1/1] transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                  on
                    ? "translate-y-0 opacity-100 blur-0"
                    : "pointer-events-none translate-y-4 opacity-0 blur-[2px]",
                )}
              >
                <blockquote className="max-w-5xl font-display text-[clamp(1.35rem,2.6vw,2.25rem)] font-medium leading-[1.35] tracking-[-0.01em] text-white/90">
                  <Quote t={t} />
                </blockquote>

                <figcaption className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <span className="flex items-center gap-4">
                    <span
                      aria-hidden
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6ee7b7] font-display text-sm font-semibold text-ink"
                    >
                      {initials(t.author)}
                    </span>
                    <span>
                      <span className="block font-semibold">{t.author}</span>
                      <span className="block text-sm text-white/60">{t.role}</span>
                    </span>
                  </span>
                  <ul className="flex flex-wrap gap-2" aria-label="Services provided">
                    {t.services.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-white/15 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-white/70"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Client chips: navigation + a progress bar on the active one. */}
        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:gap-4">
          <div
            role="group"
            aria-label="Choose a review"
            className="-mx-1 flex min-w-0 flex-1 gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.author}
                  type="button"

                  aria-pressed={on}
                  onClick={() => go(i)}
                  className={cn(
                    "relative shrink-0 overflow-hidden rounded-full border px-4 py-2 text-left text-sm transition-colors",
                    on
                      ? "border-[#6ee7b7]/60 bg-white/[0.06] text-white"
                      : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/80",
                  )}
                >
                  <span className="relative z-10 whitespace-nowrap">{t.author}</span>
                  {on && !reduced && (
                    <span
                      key={cycle}
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#6ee7b7]"
                      style={{
                        animation: `reviews-progress ${DWELL}ms linear forwards`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Previous / next, with a counter. First on mobile so the controls
              are never pushed off screen by the chip row. */}
          <div className="order-first flex shrink-0 items-center gap-4 sm:order-none">
            <button
              type="button"
              aria-label="Previous review"
              onClick={() => go(active - 1)}
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/25 text-white transition-[border-color,background-color,color,transform] duration-300 hover:border-[#6ee7b7] hover:bg-[#6ee7b7] hover:text-ink active:scale-95"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
            </button>
            <p className="min-w-[4.5rem] text-center font-mono text-sm tabular-nums tracking-[0.15em] text-white/60" aria-live="polite">
              <span className="text-white">{String(active + 1).padStart(2, "0")}</span>
              {" / "}
              {String(total).padStart(2, "0")}
            </p>
            <button
              type="button"
              aria-label="Next review"
              onClick={() => go(active + 1)}
              className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#6ee7b7] text-ink transition-[background-color,transform] duration-300 hover:bg-white active:scale-95"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`@keyframes reviews-progress { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </section>
  );
}
