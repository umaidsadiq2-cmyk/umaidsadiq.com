import { caseStudies } from "@/content/case-studies";
import { Reveal } from "@/components/shared/reveal";
import { showDrafts } from "@/lib/drafts";

/**
 * Case studies: challenge, what was done, and the numbers. Draft entries
 * (placeholder figures) only render in local development; if none are
 * publishable on the live site, the whole section is left out.
 */
export function CaseStudies() {
  const items = caseStudies.filter((c) => showDrafts || !c.draft);
  if (items.length === 0) return null;

  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="relative isolate scroll-mt-24 bg-mist"
    >
      <div className="shell shell-wide py-24 md:py-32">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow">Case studies</p>
          </Reveal>
          <Reveal delay={60} rise>
            <h2 id="case-studies-heading" className="display-lg mt-6">
              The work, and what it changed.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 space-y-6">
          {items.map((c, i) => (
            <Reveal key={c.client} delay={i * 60}>
              <article className="relative grid gap-10 rounded-[1.75rem] border border-line bg-white p-7 md:grid-cols-[1.15fr_0.85fr] md:p-10">
                {c.draft && (
                  <span className="absolute right-5 top-5 rounded-full bg-amber-100 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-amber-800">
                    Draft · not live
                  </span>
                )}
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    {c.industry}
                  </p>
                  <h3 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-tight tracking-tight">
                    {c.client}
                  </h3>

                  <p className="eyebrow mt-8">The challenge</p>
                  <p className="mt-3 leading-relaxed text-ink-soft">{c.challenge}</p>

                  <p className="eyebrow mt-8">What I did</p>
                  <ul className="mt-3 space-y-2.5">
                    {c.work.map((w) => (
                      <li key={w} className="flex gap-3 leading-relaxed text-ink-soft">
                        <span
                          aria-hidden
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald"
                        />
                        {w}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-8 flex flex-wrap gap-2">
                    {c.services.map((s) => (
                      <li
                        key={s}
                        className="rounded-full bg-emerald-tint px-3 py-1 text-xs font-medium text-emerald"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col justify-center gap-4 rounded-[1.25rem] bg-ink p-7 text-white md:p-8">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                    Results
                  </p>
                  {c.results.map((r) => (
                    <div key={r.label} className="border-t border-white/10 pt-4 first:border-0 first:pt-0">
                      <p className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-none tracking-tight text-[#6ee7b7]">
                        {r.metric}
                      </p>
                      <p className="mt-2 text-sm text-white/75">{r.label}</p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
