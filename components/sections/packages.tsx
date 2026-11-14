import { packages, packagesDraft, packagesNote } from "@/content/packages";
import { Reveal } from "@/components/shared/reveal";
import { MeetingButton } from "@/components/meeting/meeting-button";
import { showDrafts } from "@/lib/drafts";
import { cn } from "@/lib/utils";

/**
 * Monthly packages, shown without prices (each is quoted after a call). While
 * `packagesDraft` is true the inclusions are unconfirmed, so the
 * section renders only in local development and is left out of the live site.
 */
export function Packages() {
  if (packagesDraft && !showDrafts) return null;

  return (
    <section
      id="packages"
      aria-labelledby="packages-heading"
      className="relative isolate scroll-mt-24 bg-canvas"
    >
      <div className="shell shell-wide py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow justify-center">Packages</p>
          </Reveal>
          <Reveal delay={60} rise>
            <h2 id="packages-heading" className="display-lg mt-6">
              Pick a starting point.
            </h2>
          </Reveal>
          {packagesDraft && (
            <p className="mx-auto mt-6 inline-block rounded-full bg-amber-100 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-amber-800">
              Draft · not live
            </p>
          )}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-[1.75rem] border p-7 md:p-8",
                  p.featured
                    ? "border-emerald bg-ink text-white shadow-[0_36px_80px_-40px_rgba(11,110,79,0.6)]"
                    : "border-line bg-white",
                )}
              >
                {/* The badge sits in the title row, inside the card: placed
                    above the card's edge it was clipped by the reveal wrapper. */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
                  {p.featured && (
                    <span className="rounded-full bg-emerald px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-white">
                      Most popular
                    </span>
                  )}
                </div>
                <p className={cn("mt-2 text-sm", p.featured ? "text-white/70" : "text-muted")}>
                  {p.forWho}
                </p>

                <p className={cn("mt-7 font-mono text-xs uppercase tracking-[0.2em]", p.featured ? "text-[#6ee7b7]" : "text-emerald")}>
                  Monthly · Custom quote
                </p>

                <ul className={cn("mt-7 space-y-3 border-t pt-7 text-sm", p.featured ? "border-white/15" : "border-line")}>
                  {p.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden
                        className={cn("mt-0.5 font-semibold", p.featured ? "text-[#6ee7b7]" : "text-emerald")}
                      >
                        ✓
                      </span>
                      <span className={p.featured ? "text-white/85" : "text-ink-soft"}>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <MeetingButton
                    variant={p.featured ? undefined : "outline"}
                    className="w-full justify-center"
                  >
                    Get a quote
                  </MeetingButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-muted">
          {packagesNote}
        </p>
      </div>
    </section>
  );
}
