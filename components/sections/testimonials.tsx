import { reviewsUrl, testimonials } from "@/content/trust";
import { Reveal } from "@/components/shared/reveal";

/** First letter of each of the first two words, for the monogram badge. */
function initials(name: string) {
  return name
    .replace(/&/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

/**
 * Client recommendations. Sits between the services and the work, so a
 * visitor hears from real clients right after reading what is on offer.
 *
 * A masonry of quote cards (CSS columns, so cards of different lengths pack
 * without gaps), all server rendered. The link out to the Facebook reviews
 * lets a sceptical visitor check every quote at its source.
 */
export function Testimonials() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative isolate scroll-mt-24 bg-canvas"
    >
      <div className="shell shell-wide py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">Client reviews</p>
            </Reveal>
            <Reveal delay={60} rise>
              <h2 id="reviews-heading" className="display-lg mt-6">
                What clients say.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-emerald"
            >
              Read all reviews on Facebook
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>
        </div>

        <div className="mt-14 gap-6 [column-fill:_balance] md:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={(i % 3) * 60}>
              <figure className="mb-6 break-inside-avoid rounded-[1.5rem] border border-line bg-white p-7 transition-[border-color,box-shadow] duration-500 hover:border-emerald/40 hover:shadow-[0_24px_60px_-36px_rgba(11,110,79,0.45)] md:p-8">
                <span
                  aria-hidden
                  className="block font-display text-5xl leading-none text-emerald/25"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-2 text-[0.975rem] leading-relaxed text-ink-soft">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-tint font-display text-sm font-semibold text-emerald"
                  >
                    {initials(t.author)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-ink">
                      {t.author}
                    </span>
                    {t.role && (
                      <span className="block text-xs text-muted">{t.role}</span>
                    )}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
